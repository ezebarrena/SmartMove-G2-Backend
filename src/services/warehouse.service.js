const { default: mongoose } = require('mongoose');
const WarehouseModel = require('../models/warehouse');

class WarehouseService{

    //da de alta un almacen
    async postWarehouse(warehouse) {
        try {

            await WarehouseModel.create(warehouse);
            return warehouse;

        } catch (err) {
            console.error(err);
            throw new Error("Error in postWarehouse Service");
        }
    }

    //da de baja un almacen
    async deleteWarehouse(warehouse) {
        try {

            await WarehouseModel.deleteOne({ _id: warehouse });
            return warehouse;

        } catch (err) {
            console.error(err);
            throw new Error("Error in deleteWarehouse Service");
        }
    }

    //retorna todos los warehouse
    async getWarehouses() {
        try {
            const warehouse = await WarehouseModel.find({});
            return warehouse;
        } catch (err) {
            console.error(err);
            throw new Error("Error in getWarehouses Service");
        }
    }

    //retorna el almacen por su id
    async getWarehouseById(id) {
        try {

            if (id !== "") {

                const warehouse = await WarehouseModel.find({ "_id": new mongoose.Types.ObjectId(id) });
                console.log(warehouse)
                return warehouse;
            } else {
                const warehouse = await WarehouseModel.find({ "_id": new mongoose.Types.ObjectId(id) });
                return warehouse;
            }

        } catch (err) {
            console.error(err);
            throw new Error("Error in getWarehouseById Service");
        }
    }

    //elimina un almacen por su id
    async deleteWarehouse(warehouse) {
        try {

            await WarehouseModel.deleteOne({ _id: warehouse });
            return warehouse;

        } catch (err) {
            console.error(err);
            throw new Error("Error in deleteWarehouse Service");
        }
    }



}

module.exports = new WarehouseService();