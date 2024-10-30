const { Router} = require("express")
const transportController = require("../controllers/transport.controller")

const router = Router()

//crear transporte
router.post("/transport/", transportController.uploadTransport);

//obtener transporte
router.get("/transport/:id", transportController.getTransportById);

//eliminar transporte
router.delete("/transport/:id", transportController.deleteTransport);

//actualizar transporte
router.put("/transport/:id", transportController.updateTransport);

module.exports = router