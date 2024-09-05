const { Router} = require("express")
const furnitureController = require("../controllers/furniture.controller")

const router = Router()

router.post("/user", userController.createUser);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router