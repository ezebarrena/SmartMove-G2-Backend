const { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } = require("@aws-sdk/client-sqs");
const { credentials } = require("./credentials");
const winston = require("winston");
const userService = require('../services/user.service');
const assetService = require('../services/asset.service');

const client = new SQSClient({
  region: "us-east-1", // Cambia por tu región
  credentials,
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "sqs-app.log" }), // Archivo de logs
  ],
});
// Definir el Queue URL como constante global
const QUEUE_URL = "https://sqs.us-east-1.amazonaws.com/205930646901/logistica"; // Reemplázalo con tu Queue URL real


async function processMessage(message) {
  try {
    const parsedMessage = JSON.parse(message.Body);
    console.log(parsedMessage);
    const detailType = parsedMessage['detail-type'];
    const { detail } = parsedMessage;

    console.log(detailType);
    

    if(detailType === 'UsuarioCreado' || detailType === 'UsuarioModificado') {
      console.log('Procesando mensaje de usuario');
      const user = {
        cuit: detail.userId,
        username: detail.username,
        email: detail.email,
        is_superuser: false, // Ajustar según tus datos
        is_staff: false,
        is_admin: detail.rol_logistica === 'auditor', // Ejemplo
      };
      if(detailType === 'UsuarioCreado') {
        await userService.createUser(user);
      } else if(detailType === 'UsuarioModificado') {
        await userService.updateUser(user.cuit, user);
      }
    } else if(detailType === 'PublicacionCreada') {
      console.log('Procesando mensaje de inmueble');
      const asset = {
        _id: detail.id,
        beds: detail.beds,
        bathrooms: detail.bathrooms,
        district: detail.district,
        rooms: detail.rooms,
        title: detail.title,
        description: detail.description,
        latitude: detail.latitude,
        longitude: detail.longitude,
        owner_id: detail.user_id,
        address: detail.address,
        zipcode: detail.zipcode,
        dayAvailability: [1,2,3,4,5],
        hoursAvailability: {
          startHour: 9,
          endHour: 18
        }
      };
      console.log(asset);
      const newAsset = await assetService.postAsset(asset);
      console.log(newAsset);
      
    }
  } catch(err) {
    console.log(err);
  }
}

// Recibir mensajes de la cola
async function receiveMessages() {
  const input = {
    QueueUrl: QUEUE_URL, // Usar la constante global
    MaxNumberOfMessages: 10, 
    VisibilityTimeout: 20, 
    WaitTimeSeconds: 20, 
  };

  try {
    const command = new ReceiveMessageCommand(input);
    const response = await client.send(command);

    if (response.Messages) {
      logger.info(`Mensajes recibidos (${response.Messages.length})`);
      return response.Messages;
    } else {
      logger.info("No hay mensajes en la cola.");
      return [];
    }
  } catch (error) {
    logger.error("Error recibiendo los mensajes:", error);
    throw error;
  }
}

// Eliminar mensaje de la cola
async function deleteMessage(receiptHandle) {
  const input = {
    QueueUrl: QUEUE_URL, // Usar la constante global
    ReceiptHandle: receiptHandle,
  };

  try {
    const command = new DeleteMessageCommand(input);
    await client.send(command);
    logger.info("Mensaje eliminado de la cola.");
  } catch (error) {
    logger.error("Error eliminando el mensaje:", error);
    throw error;
  }
}

// Ciclo de polling para procesar mensajes continuamente
async function pollMessages() {
  while (true) {
    try {
      const messages = await receiveMessages();
      if (messages.length > 0) {
        await Promise.all(
          messages.map(async (message) => {
            try {
              logger.info(`Procesando mensaje: ${message.Body}`);
              // Aquí puedes incluir tu lógica de negocio para procesar el mensaje
              await processMessage(message);
              await deleteMessage(message.ReceiptHandle); // Eliminar mensaje procesado
            } catch (error) {
              logger.error("Error procesando mensaje:", error);
            }
          })
        );
      }
    } catch (error) {
      logger.error("Error en el ciclo de polling:", error);
    }

    // Espera 5 segundos antes de la próxima iteración
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}

// Inicia el polling
pollMessages().catch((error) => {
  logger.error("Error iniciando el polling:", error);
});


module.exports = {pollMessages};