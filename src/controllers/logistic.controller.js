const Logistic = require("../models/logistic")
const logisticService = require("../services/logistic.service")

let instance = null

class LogisticController {
    static getInstance() {
        if(!instance){
            return new LogisticController()
        }
        return instance
        
    }

    async createLogistic(req, res){
        try {
            const newLogistic = await logisticService.createLogistic(req.body)
            return res.status(201).json({
                message: "Created!",
                Logistic: newLogistic,
                status: 201
            });
        } catch(err) {
            console.error(err);
            return res.status(500).json({
                method: "createLogistic",
                status: 500
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