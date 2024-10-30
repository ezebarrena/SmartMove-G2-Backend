let instance = null
require('dotenv').config()
const transportService = require("../services/transport.service")

class TransportController {
    static getInstance() {
        if (!instance){
            return new TransportController()
        }
        return instance
    }
    async uploadTransport(req, res) {
        try {
            let newTransport = await transportService.uploadTransport(req.body)
            return res.status(201).json({
                message: "Created!",
                Transport: newTransport,
                status: 201
            });
        }     
        catch(err){
            console.error(err);
            return res.status(500).json({
                method: "uploadTransport",
                status: 500
            });
        }
    }

    async getTransportById(req, res) {
        try {
            const id = req.params.id;
            const transport = await transportService.getTransportById(id);
            if (!transport) {
                return res.status(404).json({
                    message: "Transport not found",
                    status: 404
                });
            }
            return res.status(200).json({
                message: "Transport found!",
                Transport: transport,
                status: 200
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "getTransportById",
                status: 500,
                error: err.message
            });
        }
    }

    async deleteTransport(req, res) {
        try {
            const id = req.params.id;
            const deletedTransport = await transportService.deleteTransport(id);
            if (!deletedTransport) {
                return res.status(404).json({
                    message: "Transport not found",
                    status: 404
                });
            }
            return res.status(200).json({
                message: "Transport deleted successfully!",
                status: 200
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "deleteTransport",
                status: 500,
                error: err.message
            });
        }
    }

    async updateTransport(req, res) {
        try {
            const id = req.params.id;
            const updatedTransport = await transportService.updateTransport(id, req.body);
            if (!updatedTransport) {
                return res.status(404).json({
                    message: "Transport not found",
                    status: 404
                });
            }
            return res.status(200).json({
                message: "Transport updated successfully!",
                Transport: updatedTransport,
                status: 200
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "updateTransport",
                status: 500,
                error: err.message
            });
        }
    }
}

module.exports = TransportController.getInstance()