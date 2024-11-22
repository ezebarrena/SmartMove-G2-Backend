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

      // Crear usuario
      await axios.post(`http://${backendIp}:8080/user`, user);
      console.log("Usuario creado:", user);

    } else if (detailType === "UsuarioModificado") {
      const user = {
        id: detail.id,  // Usamos el id del usuario para actualizar
        cuit: detail.cuit,
        username: detail.username,
        password: detail.password,
        name: detail.name,
        surname: detail.surname,
        email: detail.email,
        is_superuser: true,
        is_staff: true,
      };

      // Actualizar usuario
      await axios.put(`http://${backendIp}:8080/user/${detail.id}`, user);  // Ahora usamos el id para la ruta
      console.log("Usuario modificado:", user);

    } else if (detailType === "UsuarioEliminado") {
      // Eliminar usuario usando el id
      await axios.delete(`http://${backendIp}:8080/user/${detail.id}`);
      console.log("Usuario eliminado:", detail.id);

    } else {
      console.log(`Evento no reconocido: ${detailType}`);
    }

    console.log(`Procesado correctamente: ${detailType}`);
  } catch (error) {
    console.error("Error al procesar el mensaje:", error);
  }
};

// Handler para AWS Lambda
const handler = async (event, context) => {
  try {
    // SQS Batch: Procesar cada mensaje del evento
    for (const record of event.Records) {
      await processMessage(record);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Mensajes procesados correctamente" }),
    };
  } catch (error) {
    console.error("Error en el handler:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error procesando mensajes" }),
    };
  }
};

module.exports = { handler };