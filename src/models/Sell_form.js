const mongoose = require("mongoose")

const Sell_form = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    owner_name: {type: String, required: true},
    owner_contact: {type: String, required: true},
    email: {type: String, required: true},
    country: {type:String, required: true},
    state: {type:String, required: true},
    location: {type:String, required: true},
    crop_name: {type:String, required: true},
    crop_variety:{type:String, required: true},
    quantity: {type:Number, required: true},
    price: {type:Number, required: true},
    condition: {type:String, required: true},
    harvest_date: {type:Date, required: true},
    image: {type:String},
    description:{type:String},
    negotiable: {type:Boolean, default:false},
    // created_At: {type:Date, default:Date.now},

}, { timestamps: true }); 

// module.exports = mongoose.model("Sell_form", Sell_form)
module.exports = mongoose.model("Sell_form", Sell_form, "sell_forms");
