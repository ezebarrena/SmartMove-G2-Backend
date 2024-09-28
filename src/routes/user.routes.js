const { Router} = require("express")
const userController = require("../controllers/user.controller")

const router = Router()

router.post("/user", userController.createUser);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router