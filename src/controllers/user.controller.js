let instance = null;
require('dotenv').config()
const userService = require("../services/user.service");

class UserController {

    static getInstance() {
        if (!instance){
            return new UserController()
        }
        return instance
    }

    async createUser(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const user = await userService.updateUser(req.user.cuit, req.body);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await userService.deleteUser(req.user.cuit);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findUserById(req, res) {
        try {
            const user = await userService.findUserById(req.user.cuit);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = UserController.getInstance();