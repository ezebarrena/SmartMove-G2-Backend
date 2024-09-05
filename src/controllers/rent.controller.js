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
                Mobiliario: newFurniture,
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
}