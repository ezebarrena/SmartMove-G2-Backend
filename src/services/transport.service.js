const TransportModel = require('../models/transport')

class TransportService {
    async uploadTransport (transport) {
        try {
            await TransportModel.create(transport)
        }
        catch (err) {
            console.error(err)
            throw new Error ("Error uploading transport")
        }
    }

    async getTransportById(id) {
        try {
            const transport = await TransportModel.findById(id);
            return transport;
        } catch (err) {
            console.error(err);
            throw new Error("Error fetching transport by ID");
        }
    }
}

module.exports = new TransportService();