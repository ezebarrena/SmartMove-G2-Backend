const mongoose = require('mongoose');


const { Schema } = mongoose;

const WorkerSchema = new Schema({
    name:String,
    email:String,
    work:String, 

});

const Worker = mongoose.model('Worker', WorkerSchema);


module.exports = Worker;