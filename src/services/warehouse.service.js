const { default: mongoose } = require('mongoose');
const WarehouseModel = require('../models/warehouse');

class WarehouseService{

    //da de alta un almacen
    async postWarehouse(warehouse) {
        try {

            await AssetModel.create(warehouse);
            return warehouse;

        } catch (err) {
            console.error(err);
            throw new Error("Error in postWarehouse Service");
        }
    }

    //retorna el almacen por su id
    async getWarehouseById(id) {
        try {

            if (id !== "") {

                const warehouse = await AssetModel.find({ "_id": new mongoose.Types.ObjectId(id) });
                console.log(warehouse)
                return warehouse;
            } else {
                const warehouse = await AssetModel.find({ "_id": new mongoose.Types.ObjectId(id) });
                return warehouse;
            }

        } catch (err) {
            console.error(err);
            throw new Error("Error in getWarehouseById Service");
        }
    }



}

module.exports = new WarehouseService();