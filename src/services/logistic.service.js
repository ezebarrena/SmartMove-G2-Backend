const LogisticModel = require('../models/logistic')

class LogisticService {
    async createLogistic(logistic) {
        try {
            await LogisticModel.create(logistic)
        }catch (err) {
            console.error(err);
            throw new Error ("Error creating Logistic")
        }
    }
    async deleteLogistic(logisticId) {
        
    }
    async updateLogistic(logisticId, logistic) {
        
    }

}

module.exports = new LogisticService()