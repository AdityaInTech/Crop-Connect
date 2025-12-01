const mongoose = require("mongoose");
const Contact_form = mongoose.Schema({
    name: { type: String},
    email: { type: String },
    message: { type: String},
})

module.exports=mongoose.model("Contact_form", Contact_form);
