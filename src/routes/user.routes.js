const { Router} = require("express")
const userController = require("../controllers/user.controller")

const router = Router()

//crear usuario
router.post("/user", userController.createUser);

//actualizar usuario
router.put("/user", userController.updateUser);

//eliminar usuario
router.delete("/user", userController.deleteUser);

//obtener usuario por id
router.get("/user", userController.findUserById);

module.exports = router