const mongoose = require('mongoose');


const { Schema } = mongoose;

const VisitSchema = new Schema({
    visitId:String,
    userId:{type: mongoose.Schema.ObjectId, ref:'user'},
    assetId:{type: mongoose.Schema.ObjectId, ref:'asset'}, //verificar referneica del inmueble
    startDate:Date,
    endDate:Date,

});

const Visit = mongoose.model('Visit',VisitSchema);


module.exports = Visit;