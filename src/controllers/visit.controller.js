let instance = null;
require('dotenv').config()
const visitService = require("../services/visit.service")
const userService = require("../services/user.service");

class VisitController {

    static getInstance() {
        if (!instance){
            return new VisitController()
        }
        return instance
    }

    async getVisits(req, res) {
        try {
            const visits = await visitService.getAllVisits();
            return res.status(200).json({
                message: "Visits retrieved!",
                visits: visits,
                status: 200
            });
        }catch (error) {
            console.error('Error al trear las visitas:', error);
            return {
                success: false,
                message: 'Error al recuperar las visitas',
                error: error.message
            };
        }
    };

    async createVisit(req, res) {
        try {
            const userId = req.user.cuit;            
            const user = await userService.findUserById(userId); 
            const visitData = req.body;
            visitData.state = user.is_admin ? "Confirmada" : "Pendiente" //al crear la visita, siempre se crea en estado Pendiente salvo que el user sea auditor
            visitData.userId = user._id;
            visitData.isAudit = user.is_admin;
            
            let newVisit = await visitService.createVisit(visitData)
            return res.status(201).json({
                message: "Visit Created!",
                Visit: newVisit,
                status: 201
            });
        }
        catch (error) {
            console.error('Error al crear la visita:', error);
            return {
                success: false,
                message: 'Error al crear la visita',
                error: error.message
            };
        }
    }

    async updateVisit(req, res) {
        try {
            const visitId = req.params.id;
            const visitData = req.body;
            const updatedVisit = await visitService.updateVisit(visitId, visitData);
    
            if (updatedVisit) {
                return res.status(200).json({
                    message: "Visit Updated!",
                    Visit: updatedVisit,
                    status: 200
                });
            } else {
                return res.status(404).json({
                    message: "Visit not found",
                    status: 404
                });
            }
        } catch (error) {
            console.error('Error al actualizar la visita:', error);
            return res.status(500).json({
                success: false,
                message: 'Error al actualizar la visita',
                error: error.message
            });
        }
    }

    async deleteVisit(req, res) {
        try {
            const visitId = req.params.id;
            const deletedVisit = await visitService.deleteVisit(visitId);
    
            if (deletedVisit) {
                return res.status(200).json({
                    message: "Visit Deleted!",
                    Visit: deletedVisit,
                    status: 200
                });
            } else {
                return res.status(404).json({
                    message: "Visit not found",
                    status: 404
                });
            }
        }
        catch (error) {
            console.error('Error al eliminar la visita:', error);
            return res.status(500).json({
                success: false,
                message: 'Error al eliminar la visita',
                error: error.message
            });
        }
    }

    async getVisitsByUserId(req, res) {
       try {
        const assetId = req.params.assetId;
        const userId = req.user.cuit;
        const user = await userService.findUserById(userId);                
        const visits = await visitService.getVisitByUserId(user._id, assetId);
        return res.status(200).json({
            message: "Visit found!",
            data: visits,
            status: 200,
        });
       } catch(err) {
            console.error(err);
            return res.status(500).json({
                method: "getVisitByUserId",
                status: 500,
                error: err.message
            });
       }
    }

    async getVisitByAssetId (req, res) {
        try {
            const assetId = req.params.assetId;
            const visits = await visitService.getVisitByAssetId(assetId);
            return res.status(200).json({
                message: "Visits found!",
                Visits: visits,
                status: 200
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "getVisitByAssetId",
                status: 500,
                error: err.message
            });
        }
    }
}

module.exports = VisitController.getInstance();