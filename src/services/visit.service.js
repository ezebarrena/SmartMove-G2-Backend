const VisitModel = require("../models/visit");
const sendMessageEmail = require ('../utils/mailInvite')
const UserModel = require("../models/user");
const mongoose = require('mongoose');

class VisitService {
    
    async createVisit (visit) {
        try {
            //TODO: get Mail del usuario a traves de su ID
            let user = await UserModel.findOne({"_id": new mongoose.Types.ObjectId(visit.userId)})

            await VisitModel.create(visit)
            await sendVisitInvitationEmail(user.email)
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
}

module.exports = new VisitService();