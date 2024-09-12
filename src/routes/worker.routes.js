const { Router } = require ("express")
const workerController = require("../controllers/worker.controller")
const router = Router()

//dar de alta un trabajador
router.post("/workers", workerController.postWorker)

//traer trabajadores
router.get("/workers", workerController.getWorker)

//traer un trabajador en especifico por id
router.post("/idworkers", workerController.getWorkerById)

//eliminar un trabajador
router.delete("/workers", workerController.deleteWorker)

module.exports = router