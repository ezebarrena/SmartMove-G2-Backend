const { Router} = require("express")
const userController = require("../controllers/user.controller")
const verifyToken = require('../controllers/verifyToken.controller');

const router = Router();

// Crear usuario (ruta pública)
router.post("/user", userController.createUser);

// Actualizar usuario (ruta protegida)
router.put("/user/:id", verifyToken, userController.updateUser);

// Eliminar usuario (ruta protegida)
router.delete("/user/:id", verifyToken, userController.deleteUser);

// Obtener usuario por ID (ruta protegida)
router.get("/user/:id", verifyToken, userController.findUserById);

module.exports = router;