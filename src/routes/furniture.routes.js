const { Router} = require("express")
const furnitureController = require("../controllers/furniture.controller")

const router = Router()

//crear furniture
router.post("/furniture/", furnitureController.createFurniture);

//actualizar furniture
router.put("/furniture/:id", furnitureController.updateFurniture);

//eliminar furniture
router.delete("/furniture/:id", furnitureController.deleteFurniture);

//obtener todos los mobiliarios para un usuario en especifico
router.get("/furniture/user", furnitureController.getFurnitureByUser);

//obtener un mobiliario especifico pasandole un id
router.get("/furniture/:id", furnitureController.getFurnitureById);

module.exports = router