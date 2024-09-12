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
}

module.exports = new TransportService();