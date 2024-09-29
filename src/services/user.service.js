const UserModel = require("../models/user");

class UserService {

    async createUser(userData) {
        try {
            const user = new UserModel(userData);
            await user.save();
            return user;
        } catch (error) {
            throw new Error(`Error al crear el usuario: ${error.message}`);
        }
    }

    async updateUser(id, data) {
        try {
            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
            return updatedUser;           
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    async deleteUser(userId) {
        try {
            const user = await UserModel.findByIdAndDelete(userId);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            return user;
        } catch (error) {
            throw new Error(`Error al eliminar el usuario: ${error.message}`);
        }
    }

    async findUserById(id) {
        try {
            const user = await UserModel.findById(id);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            return user;
        } catch (error) {
            throw new Error(`Error al buscar el usuario: ${error.message}`);
        }
    }
}

module.exports = new UserService();
