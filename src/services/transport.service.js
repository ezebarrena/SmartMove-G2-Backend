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

    async deleteTransport(id) {
        try {
            const deletedTransport = await TransportModel.findByIdAndDelete(id);
            if (!deletedTransport) {
                throw new Error("Transport not found");
            }
            return deletedTransport; 
        } catch (err) {
            console.error(err);
            throw new Error("Error deleting transport");
        }
    }

    async updateTransport(id, transportData) {
        try {
            const updatedTransport = await TransportModel.findByIdAndUpdate(id, transportData, { new: true });
            return updatedTransport;
        } catch (err) {
            console.error(err);
            throw new Error("Error updating transport");
        }
    }
}

module.exports = new TransportService();