const { Router} = require("express")
const userController = require("../controllers/user.controller")

const router = Router()

//crear usuario
router.post("/user", userController.createUser);

//actualizar usuario
router.put("/user/:id", userController.updateUser);

//eliminar usuario
router.delete("/user/:id", userController.deleteUser);

//obtener usuario por id
router.get("/user/:id", userController.findUserById);

module.exports = router