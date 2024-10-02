const mongoose = require('mongoose');

const { Schema } = mongoose;

const AssetSchema = new Schema({
    type:String,
    description:String,
    streetName:String,
    streetNumber:Number,
    location:String,
    userId:{ type: mongoose.Schema.ObjectId, ref:'user'},
    dayAvailability: [Number],                              // 1: Lunes, 2: Martes, 3: Miercoles, 4: Jueves, 5:Viernes
    hoursAvailability: { 
            startHour: Number, 
            endHour: Number
        }

});

const Asset = mongoose.model('Asset',AssetSchema);

module.exports = Asset;