const { Router } = require ("express")
const warehouseController = require("../controllers/warehouse.controller")
const router = Router()

//crear un warehouse
router.post("/warehouses", warehouseController.postWarehouse)

//traer warehouses
router.get("/warehouses", warehouseController.getWarehouse)

//traer un warehouse
router.post("/idwarehouses", warehouseController.getWarehouseById)

//eliminar un warehouse
router.delete("/warehouses", warehouseController.deleteWarehouse)

module.exports = router