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

    async createFurniture(req, res) {
        try {
            let newFurniture = await furnitureService.createFurniture(req.body)
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

    async updateFurniture(req, res) {
        try {
            const id = req.params.id;
            const updates = req.body;
            const updatedFurniture = await furnitureService.updateFurniture(id, updates);
            return res.status(200).json({
                message: "Updated!",
                Mobiliario: updatedFurniture,
                status: 200
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "updateFurniture",
                status: 500,
                error: err.message
            });
        }
    }

    async deleteFurniture(req, res) {
        try {
            const id = req.params.id;
            const deletedFurniture = await furnitureService.deleteFurniture(id);
            return res.status(200).json({
                message: "Deleted!",
                Mobiliario: deletedFurniture,
                status: 200
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "deleteFurniture",
                status: 500,
                error: err.message
            });
        }
    }
}

module.exports = FurnitureController.getInstance();