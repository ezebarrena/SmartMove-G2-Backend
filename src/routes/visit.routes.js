const { Router} = require("express")
const visitController = require("../controllers/visit.controller")

const router = Router()

//traer todas las visitas
router.get("/visit/", visitController.getVisits);

//crear visita
router.post("/visit/", visitController.createVisit);

//actualizar visita
router.put('/visit/:id', visitController.updateVisit);

//eliminar visita
router.delete('/visit/:id', visitController.deleteVisit);

//obtener visitas para un usuario por id
router.get('/visit/asset/:assetId/user', visitController.getVisitsByUserId);

//obtener visitas para un asset por id
router.get('/visit/asset/:assetId', visitController.getVisitByAssetId)

module.exports = router