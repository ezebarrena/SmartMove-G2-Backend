const { Router} = require("express")
const furnitureController = require("../controllers/furniture.controller")

const router = Router()


router.post("/furniture/", furnitureController.uploadFurniture)


module.exports = router