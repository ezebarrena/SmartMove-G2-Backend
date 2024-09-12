const AssetModel = require('../models/asset');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
class AssetService {

    //trae todo los inmuebles
    async getAssets() {
        try {
            const assets = await AssetModel.find({});
            return assets;

        } catch (err) {
            console.error(err);
            throw new Error("Error in getAssets Service");
        }
    }


    //busca inmueble por id
    async getAssetById(id) {
        try {

            if (id !== "") {
                const assets = await AssetModel.find({ "_id": new mongoose.Types.ObjectId(id) });
                console.log(assets)
                return assets;

            } else {
                const assets = await AssetModel.find({ "_id": new mongoose.Types.ObjectId(id) });
                return assets;
            }

        } catch (err) {
            console.error(err);
            throw new Error("Error in getAssetById Service");
        }
    }

    //publica un inmueble
    async postAsset(asset) {
        try {
            await AssetModel.create(asset);
            return asset;

        } catch (err) {
            console.error(err);
            throw new Error("Error in postAsset Service");
        }
    }

    //elimina un inmueble
    async deleteAsset(asset) {
        try {
            await AssetModel.deleteOne({ _id: asset });
            return asset;

        } catch (err) {
            console.error(err);
            throw new Error("Error in deleteAsset Service");
        }
    }
    
}

module.exports = new AssetService();