const axios = require('axios');
const AWS = require('aws-sdk');

const sqs = new AWS.SQS({
  region: 'us-east-1',
  accessKeyId: process.env.EDA_AK,
  secretAccessKey: process.env.EDA_SK
});

const backendIp = process.env.BACK_IP;
const sqsUrl = process.env.SQS_URL;

const processMessage = async (record) => {
  try {
    const message = JSON.parse(record.body);
    const detailType = message['detail-type'];
    const detail = JSON.parse(message.detail);
    
    // Headers básicos
    const headers = {
      'Content-Type': 'application/json'
    };

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
      await axios.post(`http://${backendIp}:8080/user`, user, { headers });
      console.log("Usuario creado:", user);

    } else if (detailType === "UsuarioModificado") {
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

      // Actualizar usuario utilizando el cuit
      await axios.put(`http://${backendIp}:8080/user/${detail.cuit}`, user, { headers });
      console.log("Usuario modificado:", user);

    } else if (detailType === "UsuarioEliminado") {
      // Eliminar usuario utilizando el cuit
      await axios.delete(`http://${backendIp}:8080/user/${detail.cuit}`, { headers });
      console.log("Usuario eliminado:", detail.cuit);

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
      await axios.post(`http://${backendIp}:8080/assets`, asset, { headers });
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
      await axios.put(`http://${backendIp}:8080/asset/${detail.id}`, asset, { headers });
      console.log("Inmueble modificado:", asset);

    } else if (detailType === "PublicacionEliminada") {
      // Eliminar inmueble utilizando el ID
      await axios.delete(`http://${backendIp}:8080/asset/${detail.id}`, { headers });
      console.log("Inmueble eliminado:", detail.id);

    } else {
      console.log(`Evento no reconocido: ${detailType}`);
    }

  } catch (error) {
    console.error("Error al procesar el mensaje:", error);
  }
};

const handler = async (event, context) => {
  try {
    // Procesar cada mensaje del evento
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