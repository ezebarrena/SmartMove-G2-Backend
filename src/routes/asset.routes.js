const { Router } = require ("express")
const assetController = require("../controllers/asset.controller")

const router = Router()

//crear inmueble
router.post("/assets", assetController.postAsset);

//obtener assets
router.get("/assets", assetController.getAsset);

//actualizar inmueble
router.put("/asset/:id", assetController.updateAssetById);

//eliminar inmueble
router.delete("/asset/:id" , assetController.deleteAsset);

//obtener un asset por id
router.get("/asset/:id", assetController.getAssetById);

module.exports = router;