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
 
    async cancelRent (rentId) {
        try {
            const deletedRent = await RentModel.findByIdAndDelete({_id: rentId})
            if (!deletedRent) {
                throw new Error('No se encontró la renta con el ID proporcionado');
            }
            

        }catch (err) {
            console.error(err);
            throw new Error ("Error canceling rent")
        }
    }

}

module.exports = new RentService()