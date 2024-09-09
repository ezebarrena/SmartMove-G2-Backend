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
}

module.exports = TransportController.getInstance()