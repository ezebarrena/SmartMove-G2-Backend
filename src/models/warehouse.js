const mongoose = require('mongoose');


const { Schema } = mongoose;

const WarehouseSchema = new Schema({
    warehouseLocation: String,
});

const Warehouse = mongoose.model('Warehouse',WarehouseSchema);


module.exports = Warehouse;