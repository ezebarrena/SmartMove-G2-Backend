const { Router } = require ("express")
const warehouseController = require("../controllers/warehouse.controller")
const router = Router()

//crear warehouse
router.post("/warehouses", warehouseController.postWarehouse);

//obtener warehouses
router.get("/warehouses", warehouseController.getWarehouse);

//obtener warehouse por id
router.get("/warehouses/:id", warehouseController.getWarehouseById);

//eliminar warehouse
router.delete("/warehouses/:id", warehouseController.deleteWarehouse);

module.exports = router