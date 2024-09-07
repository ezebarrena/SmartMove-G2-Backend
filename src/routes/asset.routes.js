const { Router } = require ("express")
const assetController = require("../controllers/asset.controller")
const visitsController = require("../controllers/visits.controller")

const router = Router()

//Crear inmueble
router.post("/assets", assetController.postAsset)

//me trae assets
router.get("/assets", assetController.getAsset)

//Eliminar un inmueble
router.delete("/assets", assetController.deleteAsset)

//me trae un asset
router.post("/idAssets", assetController.getAssetById)


module.exports = router;