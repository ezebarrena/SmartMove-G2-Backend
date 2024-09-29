const { Router} = require("express")
const transportController = require("../controllers/transport.controller")

const router = Router()

//crear transporte
router.post("/transport/", transportController.uploadTransport);

//obtener transporte
router.get("/transport/:id", transportController.getTransportById);

module.exports = router