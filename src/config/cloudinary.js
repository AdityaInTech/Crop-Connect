const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

// 1️⃣ Configure Cloudinary with credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// 2️⃣ Set up storage engine for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'farmer_project',       // Optional: folder name in your Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file types
    transformation: [{ width: 800, crop: 'limit' }] // Optional resizing
  },
});

// 3️⃣ Create upload middleware
const upload = multer({ storage: storage });

// 4️⃣ Export upload and cloudinary (optional if needed elsewhere)
module.exports = { upload, cloudinary };
