const FurnitureModel = require('../models/furniture');

const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

class FurnitureService {
    async createFurniture (furniture) {
        try {
            await FurnitureModel.create(furniture)
        }
        catch (err) {
            console.error(err);
            throw new Error ("Error uploading furniture")
        }
    }

    async updateFurniture(id, updates) {
        try {
            const result = await FurnitureModel.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
            if (!result) {
                throw new Error("Furniture not found");
            }
            return result;
        } catch (err) {
            console.error(err);
            throw new Error("Error updating furniture");
        }
    }

    async deleteFurniture(id) {
        try {
            const result = await FurnitureModel.findByIdAndDelete(id);
            if (!result) {
                throw new Error("Furniture not found");
            }
            return result;
        } catch (err) {
            console.error(err);
            throw new Error("Error deleting furniture");
        }
    }

    async getFurnitureByUser(userId) {
        try {
            const furnitureList = await FurnitureModel.find({ user: ObjectId(userId) });
            return furnitureList;
        } catch (err) {
            console.error(err);
            throw new Error("Error fetching furniture for the user");
        }
    }

    async getFurnitureById(id) {
        try {
            const furniture = await FurnitureModel.findById(id);
            return furniture;
        } catch (err) {
            console.error(err);
            throw new Error("Error fetching furniture by ID");
        }
    }
}

module.exports = new FurnitureService();