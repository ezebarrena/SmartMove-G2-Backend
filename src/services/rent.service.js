const RentModel = require('../models/rent')

class RentService {
    async uploadRent (rent) {
        try {
            await RentModel.create(rent)
        }catch (err) {
            console.error(err);
            throw new Error ("Error uploading rent")
        }
    }

}

module.exports = new RentService()