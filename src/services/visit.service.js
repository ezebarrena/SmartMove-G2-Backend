const VisitModel = require("../models/visit");
const sendVisitInvitationEmail = require ('../utils/mailInvite')
const UserModel = require("../models/user");
const AssetModel = require("../models/asset");
const mongoose = require('mongoose');

class VisitService {
    
    async createVisit (visit) {
        try {
            let user = await UserModel.findOne({"_id": new mongoose.Types.ObjectId(visit.userId)})
            let asset = await AssetModel.findOne({"_id": new mongoose.Types.ObjectId(visit.assetId)})

            const newVisit = await VisitModel.create(visit)

            await sendVisitInvitationEmail(user.email, newVisit.visitDate, asset)

            return newVisit
        }
        catch (err) {
            console.error(err);
            throw new Error ("Error uploading visit")
        }
        
    }

    async updateVisit(visitId, visitData) {
        try {
            if (!visitId || !visitData) {
                throw new Error('visitId and visitData are required');
            }
    
            const updatedVisit = await VisitModel.findByIdAndUpdate(visitId,visitData,
                { new: true, runValidators: true } 
            );

            if (!updatedVisit) {
                return null;
            }
    
            return updatedVisit;

        } catch (error) {
            console.error('Error al actualizar la visita en el servicio:', error);
            throw error;
        }
    }
    
    async deleteVisit(visitId) {
        try {
            const result = await VisitModel.findByIdAndDelete(visitId);

            if (!result) 
                throw new Error("Visita no encontrada");
            
            return { 
                success: true, 
                message: "Visita eliminada con éxito"
            };
        } catch (err) {
            console.error(err);
            throw new Error("Error al eliminar la visita");
        }
    }

    async getVisitsByUserId(userId) {
        try {
            const visits = await VisitModel.find({ userId: new mongoose.Types.ObjectId(userId) });
            return visits;
        } catch (err) {
            console.error(err);
            throw new Error("Error fetching visits by Asset ID");
        }
    }

    async getVisitByAssetId(assetId) {
        try {
            const visits = await VisitModel.find({ assetId: new mongoose.Types.ObjectId(assetId) });
            return visits;
        } catch (err) {
            console.error(err);
            throw new Error("Error fetching visits by Asset ID");
        }
    }

    async getVisitByUserId(userId) {
        try {
            const visits = await VisitModel.find({ userId: new mongoose.Types.ObjectId(userId) });
            return visits;
        } catch (err) {
            console.error(err);
            throw new Error("Error fetching visits by Asset ID");
        }
    }

}

module.exports = new VisitService();