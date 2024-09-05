const {Router} = require("express")
const rentController = require("../controllers/rent.controller")

const router = Router()

router.post('/{assetId}/rent') //VER COMO ARMAMOS LA RUTA ACA

module.exports = router