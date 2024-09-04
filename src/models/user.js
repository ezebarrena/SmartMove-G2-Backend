const mongoose = require('mongoose');


const { Schema } = mongoose;

const UserSchema = new Schema({
    name:String,
    lastName:String,
    email:String,
    favorites:[{ type: mongoose.Schema.ObjectId, ref:'Asset'}],
    
});

const User = mongoose.model('User',UserSchema);


module.exports = User;