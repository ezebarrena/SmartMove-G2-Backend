const { Router} = require("express")
const furnitureController = require("../controllers/furniture.controller")

const router = Router()


router.post("/furniture/", furnitureController.createFurniture)
router.put("/furniture/:id", furnitureController.updateFurniture);
router.delete("/furniture/:id", furnitureController.deleteFurniture);
//TODO: Get de todos los mobiliarios para un usuario en especifico
//TODO: Get de un mobiliario en especifico por id


module.exports = router