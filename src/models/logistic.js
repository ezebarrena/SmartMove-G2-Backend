const mongoose = require('mongoose');


const { Schema } = mongoose;

const LogisticSchema = new Schema({
    originStreet:String,
    destinationStreet: String,
    cost: String,
    totalWeight: Number,
    creationDate: Date, //FECHA CREACION
    logisticDate: Date, //FECHA DE LA MUDANZA
    furnitureDate: Date, // FECHA RETIRO MOBILIARIO
    type: Number, //0: los muebles van de una casa a otra, 1: muebles pasan por un deposito
    furnitures: [{ type: mongoose.Schema.ObjectId, ref:'furniture'}],
    workersId: [{ type: mongoose.Schema.ObjectId, ref:'worker'}],
    userId: {type: mongoose.Schema.ObjectId, ref:'user'},
    state: String, //al crear la mudanza state: pendiente, cuando se paga la mudanza se cambia a Confirmada 
});

const Logistic = mongoose.model('Logistic',LogisticSchema);


module.exports = Logistic;