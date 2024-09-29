const {Router} = require("express")
const rentController = require("../controllers/rent.controller")

const router = Router()

//crear rent
router.post('/rent', rentController.uploadRent);

//eliminar rent
router.delete('/rent/:rentId', rentController.cancelRent);

module.exports = router