const mongoose = require('mongoose');


const { Schema } = mongoose;

const UserSchema = new Schema({
    cuit: String,        
    username: String,      
    password: String,      
    name: String,          
    lastName: String,     
    email: String,         
    is_superuser: Boolean,
    is_staff: Boolean,     
    favorites: [{ type: mongoose.Schema.ObjectId, ref: 'Asset' }],
    is_admin: Boolean,
});

const User = mongoose.model('User',UserSchema);


module.exports = User;