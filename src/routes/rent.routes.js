const {Router} = require("express")
const rentController = require("../controllers/rent.controller")

const router = Router()

//crear rent
router.post('/rent', rentController.uploadRent);

//editar rent
router.put('/rent/:rentId', rentController.editRent);

//obtener rent por id
router.get('/rent/:rentId', rentController.findRentById);

//obtener todos los rents
router.get('/rents', rentController.findAllRents);

//eliminar rent
router.delete('/rent/:rentId', rentController.cancelRent);

module.exports = router