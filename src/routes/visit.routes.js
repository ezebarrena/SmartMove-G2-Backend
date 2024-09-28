const { Router} = require("express")
const visitController = require("../controllers/visit.controller")

const router = Router()

router.post("/visit/", visitController.createVisit)
router.put('/visit/:id', visitController.updateVisit);
router.delete('/visit/:id', visitController.deleteVisit);
//TODO: Metodo get para obtener visitas por id de usuario a traves de parametro
router.get('/visit/:userId', visitController.getUserVisits);


module.exports = router