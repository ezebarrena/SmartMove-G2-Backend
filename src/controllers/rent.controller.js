const rentService = require("../services/rent.service");

let instance = null

class RentController {
    static getInstance() {
        if (!instance){
            return new RentController();
        }
        return instance
    }

    async uploadRent(req,res) {
        try {
            let newRent = await rentService.uploadRent(req.body)
            return res.status(201).json({
                message: "Created!",
                Alquiler: newRent,
                status: 201
            });
        }     
        catch(err){
            console.error(err);
            return res.status(500).json({
                method: "uploadRent",
                status: 500
            });
        }
    }

    async editRent(req, res) {
        const rentId = req.params.rentId;
        const updates = req.body;

        try {
            const updatedRent = await rentService.editRent(rentId, updates);
            return res.status(200).json({
                message: "Updated!",
                alquiler: updatedRent,
                status: 200
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error editing rent",
                status: 500
            });
        }
    }

    async findRentById(req, res) {
        const rentId = req.params.rentId;

        try {
            const rent = await rentService.findRentById(rentId);
            return res.status(200).json({
                message: "Found!",
                alquiler: rent,
                status: 200
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error finding rent",
                status: 500
            });
        }
    }

    async findAllRents(req, res) {
        try {
            const rents = await rentService.findAllRents();
            return res.status(200).json({
                message: "All rents retrieved!",
                alquileres: rents,
                status: 200
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error retrieving rents",
                status: 500
            });
        }
    }

    async cancelRent(req, res) {
        const rentId = req.params.rentId

        try {
            await rentService.cancelRent(rentId)
            
            return res.status(201).json({
                message: "Canceled!",
                status: 201
            });

        } catch(err){
            console.error(err);

            return res.status(500).json({
                message: "Error canceling",
                status: 500
            });
        }
    }
}

module.exports = new RentController()