let instance = null;
require('dotenv').config();
const WarehouseService = require("../services/warehouse.service");

class WarehouseController {
    static getInstance() {
        if(!instance) {
            return new WarehouseController();
        }
        return instance;
    }

    async getWarehouse(req, res) {
        try {
          const warehouse = await WarehouseService.getWarehouses();
          return res.status(200).json({
            message: "all warehouses bringed",
            warehouse: warehouse,
            status: 200,
          });
        } catch (err) {
          console.error(err);
          return res.status(500).json({
            method: "getWarehouse",
            message: "Server error",
          });
        }
    }

    async getWarehouseById(req, res) {
        try {
          const WarehouseID = req.body._id;
          const warehouse = await WarehouseService.getWarehouseById(WarehouseID);
          return res.status(200).json({
            message: "Warehouse by Id bringed",
            warehouse: warehouse,
            status: 200,
          });
        } catch (err) {
          console.error(err);
          return res.status(500).json({
            method: "getWarehouseById",
            message: "Server error",
          });
        }
    }

    async postWarehouse(req, res) {
        try {
          let newWarehouse = await WarehouseService.postWarehouse(req.body);
    
          return res.status(200).json({
            message: "Warehouse published correctly!",
            warehouse: newWarehouse,
            status: 201
          });
        } catch (err) {
          console.error(err);
          return res.status(409).json({
            method: "postWarehouse",
            message: err,
            status: 500
          });
        }
    }

    async deleteWarehouse(req, res) {
        const WarehouseID = req.body.id; //object id? posible cambio
    
        try {
          await WarehouseService.deleteWarehouse(WarehouseID);
    
          return res.status(200).json({
            message: "Warehouse deleted correclty",
            status: 200,
          });
        } catch (err) {
          console.error(err);
          return res.status(500).json({
            method: "deleteWarehouse",
            message: "Server error",
            status: 500,
          });
        }
      }


}
module.exports = WarehouseController.getInstance();