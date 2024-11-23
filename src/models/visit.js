const mongoose = require('mongoose');


const { Schema } = mongoose;

const VisitSchema = new Schema({
    duration: Number,
    date: Date,
    state: String, //al crear la visita state: pendiente, luego el propietario la confirma o la cancela, el inquilino tambien puede cancelarla
    userId: String,
    assetId:{type: mongoose.Schema.ObjectId, ref:'asset'}, //verificar referencia del inmueble
    visitDate:Date,
    isAudit: Boolean,
});

const Visit = mongoose.model('Visit',VisitSchema);


module.exports = Visit;