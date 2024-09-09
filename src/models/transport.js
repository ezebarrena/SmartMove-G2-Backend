const mongoose = require('mongoose')

const {Schema} = mongoose

const TransportSchema = new Schema({
    sizeLimit: Number,
    weightLimit: Number,
    fee: Number
})

const Transport = mongoose.model('Transport', TransportSchema)

module.exports = Transport