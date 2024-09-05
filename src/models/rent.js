const mongoose = require('mongoose')

const {Schema} = mongoose

const RentSchema = new Schema({
    idAsset: {type: mongoose.Schema.ObjectId, ref:'Asset'},
    idUser: {type: mongoose.Schema.ObjectId, ref:'User'},
    startDate: Date,
    finishDate: Date
})

const Rent = mongoose.model('Rent', RentSchema)