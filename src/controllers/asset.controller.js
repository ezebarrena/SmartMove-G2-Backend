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
      const AssetID = req.body._id;
      const asset = await AssetService.getAssetById(AssetID);
      return res.status(200).json({
        message: "asset by Id bringed",
        asset: asset,
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
    const assetId = req.body.id; //object id? posible cambio

    try {
      await AssetService.deleteAsset(assetId);

      return res.status(200).json({
        message: "Asset deleted correclty",
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