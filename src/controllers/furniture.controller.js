let instance = null;
require('dotenv').config()
const furnitureService = require("../services/furniture.service")

class FurnitureController {

    static getInstance() {
        if (!instance){
            return new FurnitureController()
        }
        return instance
    }

    async uploadFurniture(req, res) {
        try {
            let newFurniture = await furnitureService.uploadFurniture(req.body)
            return res.status(201).json({
                message: "Created!",
                Mobiliario: newFurniture,
                status: 201
            });
        }     
        catch(err){
            console.error(err);
            return res.status(500).json({
                method: "uploadFurniture",
                status: 500
            });
        }
    }
}

module.exports = FurnitureController.getInstance();