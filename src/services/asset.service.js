const AssetModel = require('../models/asset');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

class AssetService {

    //trae todos los inmuebles
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

              if (!id) {
                  throw new Error("ID must not be empty");
              }
              const assets = await AssetModel.findById(id);
      
              return assets; 
          } catch (err) {
              console.error(err);
              throw new Error("Error in getAssetById Service");
          }
      }

    async updateAssetById(assetId, assetData) {
        try {
          const updatedAsset = await AssetModel.findByIdAndUpdate(assetId, assetData, {
            new: true,
            runValidators: true
          });
          if (!updatedAsset) {
            throw new Error("Asset not found");
        }
    
          return updatedAsset;
        } catch (err) {
          console.error(err);
          throw new Error("Error updating asset");
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
        async deleteAsset(assetId) {
            try {
              const result = await AssetModel.findByIdAndDelete(assetId); // Eliminar el activo por ID
              return result; // Retornar el resultado de la eliminación
            } catch (err) {
              console.error(err);
              throw new Error("Error deleting asset");
            }
          }     
    
}

module.exports = new AssetService();