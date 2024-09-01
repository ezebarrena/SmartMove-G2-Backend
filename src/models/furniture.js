const mongoose = require('mongoose');


const { Schema } = mongoose;

const FurnitureSchema = new Schema({
    furnitureId:String,
    name:String,
    weight: String,
    description:String,
    dimensions:String,
    category:String,
    state:Integer,
    userId:{ type: mongoose.Schema.ObjectId, ref:'user'},
    warehouseId:{ type: mongoose.Schema.ObjectId, ref:'warehouse'},
    
});

const Furniture = mongoose.model('Furniture',FurnitureSchema);


module.exports = Furniture;