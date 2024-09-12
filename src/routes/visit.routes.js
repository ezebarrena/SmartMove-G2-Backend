const { Router} = require("express")
const visitController = require("../controllers/visit.controller")

const router = Router()

router.post("/visit/", visitController.createVisit)
router.put('/visit/:id', visitController.updateVisit);
router.delete('/visit/:id', visitController.deleteVisit);

module.exports = router