const { Router} = require("express")
const furnitureController = require("../controllers/furniture.controller")

const router = Router()


router.post("/furniture/", furnitureController.createFurniture)
router.put("/furniture/:id", furnitureController.updateFurniture);
router.delete("/furniture/:id", furnitureController.deleteFurniture);


module.exports = router