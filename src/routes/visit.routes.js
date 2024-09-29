const { Router} = require("express")
const visitController = require("../controllers/visit.controller")

const router = Router()

//crear visita
router.post("/visit/", visitController.createVisit);

//actualizar visita
router.put('/visit/:id', visitController.updateVisit);

//eliminar visita
router.delete('/visit/:id', visitController.deleteVisit);

//obtener visitas para un usuario por id
router.get('/visit/:userId', visitController.getUserVisits);

module.exports = router