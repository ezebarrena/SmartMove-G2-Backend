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