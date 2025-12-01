const mongoose = require("mongoose")
const Slider = mongoose.Schema({
    title : String,
    subTitle : String,
    imageUrl : String,   // Cloudinary URL
    class : String,
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("slider",Slider)

