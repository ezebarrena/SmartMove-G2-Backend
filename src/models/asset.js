const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const { Schema } = mongoose;

const AssetSchema = new mongoose.Schema({
    type:String,
    description:String,
    //streetName:String,
    //streetNumber:Number,
    location:String,
    userId:{ type: mongoose.Schema.ObjectId, ref:'user'},
});

const Asset = mongoose.model('Asset',AssetSchema);

module.exports = Asset;