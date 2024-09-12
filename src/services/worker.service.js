const { default: mongoose } = require('mongoose');
const WorkerModel = require('../models/worker');

class WorkerService{

    //da de alta un trabajador
    async postWorker(worker) {
        try {

            await WorkerModel.create(worker);
            return worker;

        } catch (err) {
            console.error(err);
            throw new Error("Error in postWorker Service");
        }
    }

    //da de baja un trabajador
    async deleteWorker(worker) {
        try {

            await WorkerModel.deleteOne({ _id: worker });
            return worker;

        } catch (err) {
            console.error(err);
            throw new Error("Error in deleteWorker Service");
        }
    }

    //retorna todos los trabajadores
    async getWorkers() {
        try {
            const worker = await WorkerModel.find({});
            return worker;
        } catch (err) {
            console.error(err);
            throw new Error("Error in getWorkers Service");
        }
    }

    //retorna un trabajador por su id
    async getWorkerById(id) {
        try {

            if (id !== "") {

                const worker = await WorkerModel.find({ "_id": new mongoose.Types.ObjectId(id) });
                console.log(worker)
                return worker;
            } else {
                const worker = await WorkerModel.find({ "_id": new mongoose.Types.ObjectId(id) });
                return worker;
            }

        } catch (err) {
            console.error(err);
            throw new Error("Error in getWorkerById Service");
        }
    }

    //elimina un trabajador por su id
    async deleteWorker(worker) {
        try {

            await WorkerModel.deleteOne({ _id: worker });
            return worker;

        } catch (err) {
            console.error(err);
            throw new Error("Error in deleteWorker Service");
        }
    }



}

module.exports = new WorkerService();