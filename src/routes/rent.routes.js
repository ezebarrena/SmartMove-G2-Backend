const {Router} = require("express")
const rentController = require("../controllers/rent.controller")

const router = Router()

router.post('/rent', rentController.uploadRent)
router.delete('/rent/:rentId', rentController.cancelRent)
module.exports = router