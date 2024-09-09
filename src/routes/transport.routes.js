const { Router} = require("express")
const transportController = require("../controllers/transport.controller")

const router = Router()


router.post("/transport/", transportController.uploadTransport)

module.exports = router