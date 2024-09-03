const mongoose = require('mongoose');


const { Schema } = mongoose;

const VisitSchema = new Schema({
    userId:{type: mongoose.Schema.ObjectId, ref:'user'},
    assetId:{type: mongoose.Schema.ObjectId, ref:'asset'}, //verificar referneica del inmueble
    visitDate:Date,
});

const Visit = mongoose.model('Visit',VisitSchema);


module.exports = Visit;