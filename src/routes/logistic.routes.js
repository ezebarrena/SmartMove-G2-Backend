const { Router } = require("express");
const logisticController = require("../controllers/logistic.controller");

const router = Router();

//crear logistica
router.post("/logistic/", logisticController.createLogistic);

//actualizar logistica
router.put("/logistic/:id", logisticController.updateLogistic);

//eliminar logistica
router.delete("/logistic/:id", logisticController.deleteLogistic);

//obtener logistica por id
router.get("/logistic/:id", logisticController.getLogisticById);

//obtener logistica por id de usuario
router.get("/logistic/user/:userId", logisticController.getLogisticsByUserId);

module.exports = router;