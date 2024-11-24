const mongoose = require('mongoose');

const { Schema } = mongoose;

const AssetSchema = new Schema({
    _id: Number,          
    beds: Number,        
    bathrooms: Number,   
    district: String,    
    rooms: Number,       
    title: String,       
    description: String, 
    latitude: Number,    
    longitude: Number,   
    address: String,     
    zipcode: String,     
    price: Number,       
    type: String,        
    active: Boolean,     
    favorite: Boolean,   
    disable: Boolean,    
    surface_covered: Number, 
    surface_total: Number,  
    owner_id: Number,   
    created_at: { type: Date, default: Date.now }, 
    favorites: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    dayAvailability: [Number],                              // 1: Lunes, 2: Martes, 3: Miercoles, 4: Jueves, 5:Viernes
    hoursAvailability: { 
            startHour: Number, 
            endHour: Number
        }
});



const Asset = mongoose.model('Asset',AssetSchema);

module.exports = Asset;