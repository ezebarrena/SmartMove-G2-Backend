let instance = null;
require('dotenv').config();
const WorkerService = require("../services/worker.service");

class WorkerController {
    static getInstance() {
        if(!instance) {
            return new WorkerController();
        }
        return instance;
    }

    async getWorker(req, res) {
        try {
          const worker = await WorkerService.getWorkers();
          return res.status(200).json({
            message: "all warehouses bringed",
            worker: worker,
            status: 200,
          });
        } catch (err) {
          console.error(err);
          return res.status(500).json({
            method: "getWorker",
            message: "Server error",
          });
        }
    }

    async getWorkerById(req, res) {
        try {
          const WorkerID = req.body._id;
          const worker = await WorkerService.getWorkerById(WorkerID);
          return res.status(200).json({
            message: "Worker by Id bringed",
            worker: worker,
            status: 200,
          });
        } catch (err) {
          console.error(err);
          return res.status(500).json({
            method: "getWorkerById",
            message: "Server error",
          });
        }
    }

    async postWorker(req, res) {
        try {
          let newWorker = await WorkerService.postWorker(req.body);
    
          return res.status(200).json({
            message: "Worker published correctly!",
            worker: newWorker,
            status: 201
          });
        } catch (err) {
          console.error(err);
          return res.status(409).json({
            method: "postWorker",
            message: err,
            status: 500
          });
        }
    }

    async deleteWorker(req, res) {
        const WorkerID = req.body.id; 
    
        try {
          await WorkerService.deleteWorker(WorkerID);
    
          return res.status(200).json({
            message: "Worker deleted correclty",
            status: 200,
          });
        } catch (err) {
          console.error(err);
          return res.status(500).json({
            method: "deleteWorker",
            message: "Server error",
            status: 500,
          });
        }
      }


}
module.exports = WorkerController.getInstance();