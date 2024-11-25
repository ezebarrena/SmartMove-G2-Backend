const AWS = require('aws-sdk');

const eventBridge = new AWS.EventBridge({
  region: 'us-east-1',
  accessKeyId: process.env.EDA_AK,
  secretAccessKey: process.env.EDA_SK
});

// Función para publicar el evento de MudanzaSolicitada
const publicarMudanzaSolicitada = async (idMudanza, fechaSolicitud, fechaRealizacion, costo, barrioOrigen, barrioDestino, latOrigen, lonOrigen, latDestino, lonDestino, idUsuarioSolicita, idUsuarioMudanza) => {
  const eventDetail = {
    idMudanza,
    fechaSolicitud,
    fechaRealizacion,
    costo,
    barrioOrigen,
    barrioDestino,
    latOrigen,
    lonOrigen,
    latDestino,
    lonDestino,
    idUsuarioSolicita,
    idUsuarioMudanza
  };



  const params = {
    Entries: [
      {
        Source: 'SmartMove',
        DetailType: 'MudanzaSolicitada',
        Detail: JSON.stringify(eventDetail),
        EventBusName: 'event-bus'
      }
    ]
  };

  try {
    const result = await eventBridge.putEvents(params).promise();
    console.log('Evento MudanzaSolicitada enviado correctamente:', result);
    // Llamamos al siguiente evento ContratoMudanzaCompletada después de que MudanzaSolicitada se haya enviado
    await publicarContratoMudanzaCompletada(idMudanza, fechaSolicitud, fechaRealizacion, costo, barrioOrigen, barrioDestino, latOrigen, lonOrigen, latDestino, lonDestino, idUsuarioSolicita, idUsuarioMudanza);
  } catch (error) {
    console.error('Error al enviar el evento MudanzaSolicitada:', error);
  }
};

// Función para publicar el evento de ContratoMudanzaCompletada
const publicarContratoMudanzaCompletada = async (idMudanza, fechaSolicitud, fechaRealizacion, costo, barrioOrigen, barrioDestino, latOrigen, lonOrigen, latDestino, lonDestino, idUsuarioSolicita, idUsuarioMudanza) => {
  const eventDetail = {
    idMudanza,
    fechaSolicitud,
    fechaRealizacion,
    costo,
    barrioOrigen,
    barrioDestino,
    latOrigen,
    lonOrigen,
    latDestino,
    lonDestino,
    idUsuarioSolicita,
    idUsuarioMudanza
  };

  const params = {
    Entries: [
      {
        Source: 'SmartMove',
        DetailType: 'ContratoMudanzaCompletada',
        Detail: JSON.stringify(eventDetail),
        EventBusName: 'event-bus'
      }
    ]
  };

  try {
    const result = await eventBridge.putEvents(params).promise();
    console.log('Evento ContratoMudanzaCompletada enviado correctamente:', result);
  } catch (error) {
    console.error('Error al enviar el evento ContratoMudanzaCompletada:', error);
  }
};

module.exports = {
  publicarMudanzaSolicitada,
  publicarContratoMudanzaCompletada
};