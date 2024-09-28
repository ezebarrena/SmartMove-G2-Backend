const mongoose = require('mongoose');


const { Schema } = mongoose;

const LogisticSchema = new Schema({
    originStreet:String,
    destinationStreet: String,
    cost: String,
    totalWeight: int,
    date: Date,
    type: Number, //0: los muebles van de una casa a otra, 1: muebles pasan por un deposito
    furnitures: [{ type: mongoose.Schema.ObjectId, ref:'furniture'}],
    workersId: [{type: int}] 
});

const Logistic = mongoose.model('Logistic',LogisticSchema);


module.exports = Logistic;