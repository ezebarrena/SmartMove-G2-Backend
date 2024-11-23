const AWS = require("aws-sdk");
const axios = require("axios");

// Configuración de AWS SQS
const sqs = new AWS.SQS({
  accessKeyId: process.env.EDA_AK,
  secretAccessKey: process.env.EDA_SK,
  region: "us-east-1",
});

const sqsUrl = process.env.SQS_URL; // URL de la cola SQS
const backendIp = process.env.BACKEND_IP; // IP del backend

// Procesar un mensaje individual (Usuarios e Inmuebles)
const processMessage = async (message) => {
  try {
    const data = JSON.parse(message.Body);
    const { "detail-type": detailType, detail } = data;

    // Procesar eventos de usuarios
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
        cuit: detail.cuit, // Usamos el cuit del usuario para actualizar
        username: detail.username,
        password: detail.password,
        name: detail.name,
        surname: detail.surname,
        email: detail.email,
        is_superuser: true,
        is_staff: true,
      };

      // Actualizar usuario utilizando el cuit
      await axios.put(`http://${backendIp}:8080/user/${detail.cuit}`, user);
      console.log("Usuario modificado:", user);

    } else if (detailType === "UsuarioEliminado") {
      // Eliminar usuario usando el cuit
      await axios.delete(`http://${backendIp}:8080/user/${detail.cuit}`);
      console.log("Usuario eliminado:", detail.cuit);

    // Procesar eventos de inmuebles
    } else if (detailType === "PublicacionCreada") {
      const asset = {
        id: detail.id,
        beds: detail.beds,
        bathrooms: detail.bathrooms,
        district: detail.district,
        rooms: detail.rooms,
        title: detail.title,
        description: detail.description,
        latitude: detail.latitude,
        longitude: detail.longitude,
        address: detail.address,
        zipcode: detail.zipcode,
        price: detail.price,
        type: detail.type,
        active: detail.active,
        favorite: detail.favorite,
        disable: detail.disable,
        surface_covered: detail.surface_covered,
        surface_total: detail.surface_total,
        owner_id: detail.owner_id,
      };

      // Crear inmueble
      await axios.post(`http://${backendIp}:8080/assets`, asset);
      console.log("Inmueble creado:", asset);

    } else if (detailType === "PublicacionActualizada") {
      const asset = {
        id: detail.id,
        beds: detail.beds,
        bathrooms: detail.bathrooms,
        district: detail.district,
        rooms: detail.rooms,
        title: detail.title,
        description: detail.description,
        latitude: detail.latitude,
        longitude: detail.longitude,
        address: detail.address,
        zipcode: detail.zipcode,
        price: detail.price,
        type: detail.type,
        active: detail.active,
        favorite: detail.favorite,
        disable: detail.disable,
        surface_covered: detail.surface_covered,
        surface_total: detail.surface_total,
        owner_id: detail.owner_id,
      };

      // Actualizar inmueble utilizando el ID
      await axios.put(`http://${backendIp}:8080/asset/${detail.id}`, asset);
      console.log("Inmueble modificado:", asset);

    } else if (detailType === "PublicacionEliminada") {
      // Eliminar inmueble utilizando el ID
      await axios.delete(`http://${backendIp}:8080/asset/${detail.id}`);
      console.log("Inmueble eliminado:", detail.id);

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