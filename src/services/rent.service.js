const RentModel = require('../models/rent')

class RentService {

    async uploadRent(rent) {
        try {
            const newRent = await RentModel.create(rent);
            return newRent;
        } catch (err) {
            console.error(err);
            throw new Error("Error uploading rent");
        }
    }
    
    async editRent(rentId, updates) {
        try {
            const updatedRent = await RentModel.findByIdAndUpdate(rentId, updates, { new: true });
            if (!updatedRent) {
                throw new Error('No se encontró la renta con el ID proporcionado');
            }
            return updatedRent; 
        } catch (err) {
            console.error(err);
            throw new Error("Error editing rent");
        }
    }

     async findRentById(rentId) {
        try {
            const rent = await RentModel.findById(rentId).populate('idAsset idUser');
            if (!rent) {
                throw new Error('No se encontró la renta con el ID proporcionado');
            }
            return rent;
        } catch (err) {
            console.error(err);
            throw new Error("Error finding rent by ID");
        }
    }

    async findAllRents() {
        try {
            const rents = await RentModel.find().populate('idAsset idUser');
            return rents;
        } catch (err) {
            console.error(err);
            throw new Error("Error finding all rents");
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