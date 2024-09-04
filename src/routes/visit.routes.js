const { Router} = require("express")
const visitController = require("../controllers/visit.controller")

const router = Router()

router.post("/visit/", visitController.createVisit)
router.put('/visits/:id', visitController.updateVisit);
router.delete('/visits/:id', visitController.deleteVisit);

module.exports = router