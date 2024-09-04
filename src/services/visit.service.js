const VisitModel = require('../models/visit');

class VisitService {
    async createVisit (visit) {
        try {
            await VisitModel.create(visit)
        }
        catch (err) {
            console.error(err);
            throw new Error ("Error uploading furniture")
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