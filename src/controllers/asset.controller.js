let instance = null;
require('dotenv').config();
const AssetService = require("../services/asset.service");
require('dotenv').config();


class AssetController {

  static getInstance() {
    if (!instance) {
      return new AssetController();
    }
    return instance;
  }

  async getAsset(req, res) {
    try {
      const asset = await AssetService.getAssets();
      return res.status(200).json({
        message: "all assets bringed",
        asset: asset,
        status: 200,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getAsset",
        message: "Server error",
      });
    }
  }

    //trae inmueble por ID
    async getAssetById(req, res) {
      try {
        const AssetID = req.params.id;

          if (!AssetID) {
              return res.status(400).json({
                  message: "Asset ID is required.",
                  status: 400,
              });
          }
  
          const asset = await AssetService.getAssetById(AssetID);
  
          if (!asset || asset.length === 0) {
              return res.status(404).json({
                  message: "Asset not found.",
                  status: 404,
              });
          }
  
          return res.status(200).json({
              message: "Asset found.",
              asset: asset[0],
              status: 200,
          });
      } catch (err) {
          console.error(err);
          return res.status(500).json({
              method: "getAssetById",
              message: "Server error",
          });
      }
  }

  async updateAssetById(req, res) {
    const assetId = req.params.id;
    const assetData = req.body;
  
    try {
      const updatedAsset = await AssetService.updateAssetById(assetId, assetData);
      
      if (!updatedAsset) {
        return res.status(404).json({
          message: "Asset not found",
          status: 404,
        });
      }
  
      return res.status(200).json({
        message: "Asset updated successfully",
        asset: updatedAsset,
        status: 200,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "updateAssetById",
        message: "Server error",
        status: 500,
      });
    }
  }

  //publica inmueble
  async postAsset(req, res) {
    try {
      let newAsset = await AssetService.postAsset(req.body);

      return res.status(200).json({
        message: "Asset published correctly!",
        asset: newAsset,
        status: 201
      });
    } catch (err) {
      console.error(err);
      return res.status(409).json({
        method: "postAsset",
        message: err,
        status: 500
      });
    }
  }

  //elimina inmueble
  async deleteAsset(req, res) {
    const assetId = req.params.id;
  
    try {
      const result = await AssetService.deleteAsset(assetId);
  
      if (!result) {
        return res.status(404).json({
          message: "Asset not found",
          status: 404,
        });
      }
  
      return res.status(200).json({
        message: "Asset deleted correctly",
        status: 200,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "deleteAsset",
        message: "Server error",
        status: 500,
      });
    }
  }

}
module.exports = AssetController.getInstance();