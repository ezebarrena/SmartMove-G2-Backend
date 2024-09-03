const mongoose = require('mongoose');


const { Schema } = mongoose;

const WarehouseSchema = new Schema({
    dwarehouseLocation: String,
    
});

const Warehouse = mongoose.model('Warehouse',WarehouseSchema);


module.exports = Warehouse;