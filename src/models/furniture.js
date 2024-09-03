const mongoose = require('mongoose');


const { Schema } = mongoose;

const FurnitureSchema = new Schema({
    name:String,
    weight: Number,
    description:String,
    dimensions:Number,
    category:String,
    state:Number,
    userId:{ type: mongoose.Schema.ObjectId, ref:'user'},
    warehouseId:{ type: mongoose.Schema.ObjectId, ref:'warehouse'},
    
});

const Furniture = mongoose.model('Furniture',FurnitureSchema);


module.exports = Furniture;