const mongoose = require('mongoose');


const { Schema } = mongoose;

const UserSchema = new Schema({
    originStreet:String,
    destinationStreet: String,
    cost: String,
    totalWeight: int,
    date: Date,
    furnitures: [{ type: mongoose.Schema.ObjectId, ref:'furniture'}],
    workersId: [{type: int}] 
});

const User = mongoose.model('User',UserSchema);


module.exports = User;