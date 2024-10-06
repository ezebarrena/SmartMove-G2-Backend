const LogisticModel = require('../models/logistic')
const FurnitureModel = require('../models/furniture')
const mongoose = require('mongoose');


class LogisticService {

    async createLogistic(logistic) {
        try {
            const newlogistic = await LogisticModel.create(logistic)
            return newlogistic;
        }catch (err) {
            console.error(err);
            throw new Error ("Error creating Logistic")
        }
    }

    async updateLogistic(logisticId, updates) {
        try {
            const updatedLogistic = await LogisticModel.findByIdAndUpdate(logisticId, updates, { new: true, runValidators: true });
            if (!updatedLogistic) {
                throw new Error("Logistic not found");
            }
            return updatedLogistic;
        } catch (err) {
            console.error(err);
            throw new Error("Error updating logistic");
        }
    }

    async deleteLogistic(logisticId) {
        try {

            const deletedLogistic = await LogisticModel.findById(new mongoose.Types.ObjectId(logisticId));
            const furnitures = deletedLogistic.furnitures

            await LogisticModel.deleteOne(new mongoose.Types.ObjectId(logisticId))

            for (const furniture of furnitures) {

                // Eliminar el documento por su ObjectId
                const result = await FurnitureModel.findByIdAndDelete(furniture);
                if (result) {
                  console.log(`Documento con _id ${furniture} eliminado`);
                } else {
                  console.log(`No se encontró el documento con _id ${furniture}`);
                }
              }
              console.log('Todos los documentos han sido eliminados');
            
        
            if (!deletedLogistic) {
                throw new Error("Logistic not found");
            }

            return deletedLogistic;
        } catch (err) {
            console.error(err);
            throw new Error("Error deleting logistic");
        }
    }

    async getLogisticById(logisticId) {
        try {
            const logistic = await LogisticModel.findById(logisticId);
            return logistic;
        } catch (err) {
            console.error(err);
            throw new Error("Error fetching logistic by ID");
        }
    }

    async getLogisticsByUserId(userId) {
        try {
            const logistics = await LogisticModel.find({ userId: userId });
            return logistics;
        } catch (err) {
            console.error(err);
            throw new Error("Error fetching logistics by user ID");
        }
    }
}

module.exports = new LogisticService()