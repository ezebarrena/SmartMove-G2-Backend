const AWS = require("aws-sdk");
const axios = require("axios");

// Configuración de AWS SQS
const sqs = new AWS.SQS({
  accessKeyId: process.env.EDA_AK,
  secretAccessKey: process.env.EDA_SK,
  region: "us-east-1",
});

const sqsUrl = process.env.SQS_URL; // URL de la cola SQS
const backendIp = process.env.BACKEND_IP; // IP o URL del backend

// Procesar un mensaje individual (Usuarios e Inmuebles)
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
      await axios.post(`http://${backendIp}:8080/user`, user);  // Ruta de usuario creada

    } else if (detailType === "UsuarioModificado") {
      const tokenResponse = await axios.post(`http://${backendIp}:8080/user/login/`, {
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
      await axios.put(`http://${backendIp}:8080/user/${detail.cuit}`, user, {  // Ruta de usuario actualizada
        headers: { Authorization: `Bearer ${token}` },
      });

    } else if (detailType === "UsuarioEliminado") {
      const tokenResponse = await axios.post(`http://${backendIp}:8080/user/login/`, {
        cuit_or_email: detail.cuit,
        password: detail.password,
      });

      const token = tokenResponse.data.access;

      // Enviar solicitud para eliminar usuario
      await axios.delete(`http://${backendIp}:8080/user/${detail.cuit}`, {  // Ruta de usuario eliminada
        headers: { Authorization: `Bearer ${token}` },
      });

    // Procesar eventos de inmuebles
    } else if (detailType === "PublicacionCreada") {
      const asset = {
        title: detail.title,
        description: detail.description,
        price: detail.price,
        location: detail.location,
        area: detail.area,
        owner: detail.owner, // Suponiendo que este dato es parte del detalle
      };

      // Enviar solicitud al backend para crear inmueble
      await axios.post(`http://${backendIp}:8080/assets`, asset);  // Ruta para crear inmueble

    } else if (detailType === "PublicacionActualizada") {
      const asset = {
        title: detail.title,
        description: detail.description,
        price: detail.price,
        location: detail.location,
        area: detail.area,
        owner: detail.owner, // Suponiendo que este dato es parte del detalle
      };

      // Enviar solicitud para actualizar inmueble
      await axios.put(`http://${backendIp}:8080/asset/${detail.id}`, asset);  // Ruta para actualizar inmueble

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