const logisticService = require("../services/logistic.service")

let instance = null

class LogisticController {
    static getInstance() {
        if(!instance){
            return new LogisticController()
        }
        return instance
        
    }

    async createLogistic(req, res){
        try {
            let newLogistic = await logisticService.createLogistic(req.body)
            return res.status(201).json({
                message: "Created!",
                Alquiler: newLogistic,
                status: 201
            });
        } catch(err) {
            console.error(err);
            return res.status(500).json({
                method: "createLogistic",
                status: 500
            });
        }
    }

    //UPDATE QUE CAMBIA EL ESTADO
    async finishLogistic(req, res) {

    }


}

module.exports = LogisticController.getInstance()