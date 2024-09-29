const { Router } = require ("express")
const workerController = require("../controllers/worker.controller")
const router = Router()

//crear trabajador
router.post("/workers", workerController.postWorker);

//obtener trabajadores
router.get("/workers", workerController.getWorker);

//obtener un trabajador por id
router.post("/idworkers", workerController.getWorkerById);

//eliminar trabajador
router.delete("/workers", workerController.deleteWorker);

module.exports = router