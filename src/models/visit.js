const mongoose = require('mongoose');


const { Schema } = mongoose;

const VisitSchema = new Schema({
    duration: Number,
    date: Date,
    userId:{type: mongoose.Schema.ObjectId, ref:'user'},
    assetId:{type: mongoose.Schema.ObjectId, ref:'asset'}, //verificar referencia del inmueble
    visitDate:Date,
});

const Visit = mongoose.model('Visit',VisitSchema);


module.exports = Visit;