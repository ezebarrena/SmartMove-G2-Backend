const { Router } = require ("express")
const assetController = require("../controllers/asset.controller")

const router = Router()

//crear inmueble
router.post("/assets", assetController.postAsset);

//obtener assets
router.get("/assets", assetController.getAsset);

//eliminar inmueble
router.delete("/assets", assetController.deleteAsset);

//obtener un asset por id
router.post("/idAssets", assetController.getAssetById);

module.exports = router;