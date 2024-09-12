const FurnitureModel = require('../models/furniture');

const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

class FurnitureService {
    async uploadFurniture (furniture) {
        try {
            await FurnitureModel.create(furniture)
        }
        catch (err) {
            console.error(err);
            throw new Error ("Error uploading furniture")
        }
    }
}

module.exports = new FurnitureService();