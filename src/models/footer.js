const mongoose = require("mongoose")

const Footer = mongoose.Schema({
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    copyrightText: { type: String, default: "© 2025 AgroFarma. All rights reserved." },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("footer",Footer)