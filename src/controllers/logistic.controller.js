const Logistic = require("../models/logistic")
const logisticService = require("../services/logistic.service")
const { publicarMudanzaSolicitada } = require("../services/event.service")
const { publicarContratoMudanzaCompletada } = require("../services/event.service")


let instance = null

class LogisticController {
    static getInstance() {
        if(!instance){
            return new LogisticController()
        }
        return instance
        
    }

    async createLogistic(req, res) {
        try {
            // Obtener los datos de la solicitud de mudanza desde el body de la petición
            const {
                idMudanza,
                creationDate,
                logisticDate,
                furnitureDate,
                originDistrict,
                destinationDistrict,
                originStreet,
                destinationStreet,
                cost,
                furnitures,
                totalWeight,
                latOrigen,
                lonOrigen,
                latDestino,
                lonDestino,
                idUsuarioSolicita,
                idUsuarioMudanza,
                userId,
                type
            } = req.body;
    
    
            // Mapear los datos del evento a los campos del modelo de logística
            const logisticData = {
                idMudanza: idMudanza,
                originStreet: originStreet, // Mapeamos barrioOrigen a originStreet
                totalWeight: totalWeight,
                originDistrict: originDistrict,
                destinationDistrict: destinationDistrict,
                destinationStreet: destinationStreet, // Mapeamos barrioDestino a destinationStreet
                cost: cost,// Usamos el valor fijo para costo
                creationDate: creationDate, // Mapeamos fecha de solicitud a creationDate
                logisticDate: logisticDate, // Mapeamos fecha de realización a logisticDate
                type: type,
                //userId: userId, // Mapeamos el ID del usuario que solicita
                userId: user.cuit,
                // Si tienes datos adicionales como muebles o trabajadores, agrégales valores predeterminados
                furnitures: furnitures, // Aquí deberías mapear los muebles si están disponibles
                workersId: [], // Aquí deberías mapear los trabajadores si están disponibles
                state: 'Pendiente',
                latOrigen: '-34.55843636557728',
                lonOrigen: '-58.464772727458836',
                latDestino: '-34.55843636555126',
                lonDestino: '-58.464772727445825',
                idUsuarioSolicita: idUsuarioSolicita,
                idUsuarioMudanza: '20111111112',
            };
    
            // Crear la logística (solicitud de mudanza)
            const newLogistic = await Logistic.create(logisticData);
    
            // Llamar al servicio para crear la solicitud de mudanza
            await logisticService.createLogistic(newLogistic);
    
            // Enviar el evento MudanzaSolicitada
            await publicarMudanzaSolicitada(logisticData);
    
            // Llamar al evento ContratoMudanzaCompletada
            await publicarContratoMudanzaCompletada(logisticData);
    
            return res.status(201).json({
                message: "Created, Events Sent!",
                Logistic: newLogistic,
                status: 201
            });
    
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "createLogistic",
                status: 500,
                error: err.message
            });
        }
    }

    async updateLogistic(req, res) {
        try {
            const id = req.params.id;
            const updates = req.body;
            const updatedLogistic = await logisticService.updateLogistic(id, updates);
            return res.status(200).json({
                message: "Updated!",
                Logistic: updatedLogistic,
                status: 200
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "updateLogistic",
                status: 500,
                error: err.message
            });
        }
    }

    async deleteLogistic(req, res) {
        try {
            const id = req.params.id;
            const deletedLogistic = await logisticService.deleteLogistic(id);
            return res.status(200).json({
                message: "Deleted!",
                Logistic: deletedLogistic,
                status: 200
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "deleteLogistic",
                status: 500,
                error: err.message
            });
        }
    }

    async getLogisticById(req, res) {
        try {
            const id = req.params.id;
            const logistic = await logisticService.getLogisticById(id);
            if (!logistic) {
                return res.status(404).json({
                    message: "Logistic not found",
                    status: 404
                });
            }
            return res.status(200).json({
                message: "Logistic found!",
                Logistic: logistic,
                status: 200
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "getLogisticById",
                status: 500,
                error: err.message
            });
        }
    }

    async getLogisticsByUserId(req, res) {
        try {
            const userId = req.params.userId;
            const logistics = await logisticService.getLogisticsByUserId(userId);

            if (logistics.length === 0) {
                return res.status(404).json({
                    message: "No logistics found for this user.",
                    status: 404
                });
            }

            return res.status(200).json({
                message: "Logistics found!",
                Logistics: logistics,
                status: 200
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "getLogisticsByUserId",
                status: 500,
                error: err.message
            });
        }
    }
}

module.exports = LogisticController.getInstance()