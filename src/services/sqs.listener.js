const AWS = require("aws-sdk");
const axios = require("axios");

// Configuración de AWS SQS
const sqs = new AWS.SQS({
  accessKeyId: process.env.EDA_AK,
  secretAccessKey: process.env.EDA_SK,
  region: "us-east-1",
});

const sqsUrl = process.env.SQS_URL; // URL de la cola SQS
const backendIp = process.env.s; // IP del backend

// Procesar un mensaje individual
const processMessage = async (message) => {
  try {
    const data = JSON.parse(message.Body);

    const { "detail-type": detailType, detail } = data;

    // Procesar diferentes tipos de eventos
    if (detailType === "UsuarioCreado") {
      const user = {
        cuit: detail.cuit,
        username: detail.username,
        password: detail.password,
        name: detail.name,
        surname: detail.surname,
        email: detail.email,
        is_superuser: true,
        is_staff: true,
      };

      // Enviar solicitud al backend para crear usuario
      await axios.post(`http://${backendIp}:8080/api/register/`, user);

    } else if (detailType === "UsuarioModificado") {
      const tokenResponse = await axios.post(`http://${backendIp}:8080/api/login/`, {
        cuit_or_email: detail.cuit,
        password: detail.password,
      });

      const token = tokenResponse.data.access;

      const user = {
        cuit: detail.cuit,
        username: detail.username,
        password: detail.password,
        name: detail.name,
        surname: detail.surname,
        email: detail.email,
        is_superuser: true,
        is_staff: true,
      };

      // Enviar solicitud para modificar usuario
      await axios.patch(`http://${backendIp}:8080/api/users/${detail.cuit}/`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });

    } else if (detailType === "UsuarioEliminado") {
      const tokenResponse = await axios.post(`http://${backendIp}:8080/api/login/`, {
        cuit_or_email: detail.cuit,
        password: detail.password,
      });

      const token = tokenResponse.data.access;

      // Enviar solicitud para eliminar usuario
      await axios.delete(`http://${backendIp}:8080/api/users/${detail.cuit}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

    } else {
      console.log(`Evento no reconocido: ${detailType}`);
    }

    console.log(`Procesado correctamente: ${detailType}`);
  } catch (error) {
    console.error("Error al procesar el mensaje:", error);
  }
};


// Leer y procesar mensajes de SQS
const pollMessages = async () => {
  try {
    const response = await sqs
      .receiveMessage({
        QueueUrl: sqsUrl,
        MaxNumberOfMessages: 10,
        VisibilityTimeout: 60,
        WaitTimeSeconds: 1,
      })
      .promise();

    if (response.Messages) {
      for (const message of response.Messages) {
        await processMessage(message);

        // Eliminar mensaje de la cola una vez procesado
        await sqs
          .deleteMessage({
            QueueUrl: sqsUrl,
            ReceiptHandle: message.ReceiptHandle,
          })
          .promise();

        console.log("Mensaje eliminado de la cola.");
      }
    } else {
      console.log("No hay mensajes en la cola.");
    }
  } catch (error) {
    console.error("Error al leer mensajes de SQS:", error);
  }
};

// Ejecutar continuamente para escuchar la cola
const startListener = () => {
  setInterval(pollMessages, 5000); // Verificar mensajes cada 5 segundos
};

module.exports = { startListener };