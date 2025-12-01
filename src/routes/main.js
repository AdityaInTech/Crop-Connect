const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt');
const User = require("../models/User")
const { upload } = require('../config/cloudinary');
const Detail = require("../models/Detail")
const Slider = require("../models/Slider")
const Service = require("../models/Service")
const Sell_form = require("../models/Sell_form")
const Contact_form = require("../models/Contact_form")
const Footer= require("../models/footer")

// Import upload from app.js
// const { upload } = require("../app");

const routes = express.Router()

// Middleware to protect routes 
function isLoggedIn(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
}
// Middleware to load footer in all routes
// routes.use(async (req, res, next) => {
//   try {
//     const footer = await Footer.findOne().lean();
//     const currentYear = new Date().getFullYear();
//     res.locals.footer = footer;
//     res.locals.year = currentYear;
//   } catch (err) {
//     console.error("Error loading footer:", err);
//     res.locals.footer = null;
//     res.locals.year = new Date().getFullYear();
//   }
//   next();
// });


// Signup Page
routes.get('/signup', (req, res) => {
  res.render('signup');
});

// Signup Form Handling
routes.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('signup', { error: 'Email already registered. Please login instead.' });
    }
    const user = new User({ name, email, password });
    await user.save();
    res.render('login', { success: 'Account created successfully! Please log in.' });
  } catch (err) {
    console.error('Signup error:', err);
    res.render('signup', { error: 'Something went wrong. Please try again later.' });
  }
});


// Login Page
routes.get('/login', (req, res) => {
  res.render('login');
});

// Login Form Handling
routes.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('login', { error: 'No account found with this email.' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render('login', { error: 'Incorrect password. Please try again.' });
    }

    req.session.userId = user._id;
    req.session.userName = user.name;
    res.redirect('/');
  } catch (err) {
    console.error('Login error:', err);
    res.render('login', { error: 'An unexpected error occurred. Please try again later.' });
  }
});


// ===== Logout =====
routes.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// ===== Profile =====
routes.get('/profile', isLoggedIn, async (req, res) => {
    try {
        const details = await Detail.findOne({ "_id": "690503e434a5c0252366dacb" })
        const user = await User.findById(req.session.userId);
        const history = await Sell_form.find({ userId: req.session.userId }).lean(); // fetch user's sell history
        // const footer = await Footer.findOne().lean();
        // const currentYear = new Date().getFullYear();
        res.render('profile', { 
          details,
          user, 
          history,
          // footer:footer,
          // year: currentYear 
        });
    } catch (err) {
        res.send('Error: ' + err.message);
    }
});

// Delete a sell entry from profile
routes.get("/delete-sell/:id", isLoggedIn, async (req, res) => {
    try {
        const result = await Sell_form.deleteOne({ _id: req.params.id, userId: req.session.userId });
        if (result.deletedCount === 0) {
            return res.send("You cannot delete this entry or it does not exist.");
        }
        res.redirect("/profile"); // redirect back to profile after delete
    } catch (err) {
        res.send("Error deleting entry: " + err.message);
    }
});


routes.get("/", async (req, res) => {
    const details = await Detail.findOne({ "_id": "690503e434a5c0252366dacb" })
    const slides = await Slider.find().sort({ _id: -1 }).limit(6).lean()
    // console.log(details)
    // console.log(slides.length)
    const services = await Service.find();
    // const footer = await Footer.findOne().lean();
    const currentYear = new Date().getFullYear();
    const user = req.session.userId ? await User.findById(req.session.userId) : null;
    // console.log("Footer data:", footer);
    res.render('index', {
        details: details,
        slides: slides,
        services: services,
        user:user,
        // footer:footer,
        year: currentYear
    })
})

routes.get("/buy", async (req, res) => {
    try {
        if (!req.session.userId) {
           return res.redirect("/login"); // force login if not logged in
        }
        const details = await Detail.findOne({ "_id": "690503e434a5c0252366dacb" });

        // Fetch all sell entries, sorted by newest first
        // const crops = await Sell_form.find().sort({ created_At: -1 }).lean();
        const crops = (await Sell_form.find().lean()).reverse();

        console.log("Crops fetched:", crops.length); // check if data is coming
        // const footer = await Footer.findOne().lean();
        // const currentYear = new Date().getFullYear();

        res.render("buy", { 
          // ...res.locals,
          details, 
          crops, 
          // footer:footer,
          // year: currentYear
        });
        // res.render('buy', { details: details, crops: crops });

    } catch (error) {
        console.error("Error loading buy page:", error);
        res.status(500).send("Error loading buy page");
    }
});


routes.get("/sell", async (req, res) => {
    if (!req.session.userId) {
      return res.redirect("/login"); // force login if not logged in
    }
    const details = await Detail.findOne({ "_id": "690503e434a5c0252366dacb" })
    const status = req.query.status || null;
    // const footer = await Footer.findOne().lean();
    // const currentYear = new Date().getFullYear();
    res.render('sell', {
        details: details,
        status: status,
        // footer:footer,
        // year: currentYear
    })
})

routes.get("/contact-us", async (req, res) => {
    const details = await Detail.findOne({ "_id": "690503e434a5c0252366dacb" })

    res.render('contact-us', {
        details: details
    })
})

routes.post("/process-sell-form", upload.single("image"), async (req, res) => {
    console.log("Form Submitted")
    try {
        if (!req.session.userId) {
          return res.redirect("/login");
        }
        // Use Multer to handle single image file
        // req.upload.single('image')(req, res, async function(err) {
        // if(err){
        //     console.log("Multer error:", err)
        //     return res.redirect("/sell")
        // }

        // const formData = req.body;
        // if(req.file){
        //     formData.image = '/uploads/' + req.file.filename; // save path in DB
        // }
        const formData = req.body || {};
        formData.negotiable = req.body.negotiable ? true : false; // Handle checkbox
        //  Attach user ID
        formData.userId = req.session.userId; //  link to logged-in user
         //  If an image is uploaded via Cloudinary, save its URL in DB
        if (req.file) {
            formData.image = req.file.path; // Cloudinary URL
        }
        const data = await Sell_form.create(formData);
        console.log(data)
        //  Automatically add image to Slider (Cloudinary URL)
        if (req.file) {
          await Slider.create({
            title: formData.crop_name || "Farmer Product",
            subTitle: `${formData.owner_name || 'User'} posted a new crop!`,
            imageUrl: req.file.path,
            uploadedBy: req.session.userId
          });
          console.log("Image added to slider");
        }
        res.redirect("/sell?status=success");
        // })
    }
    catch (error) {
        console.log(error)
        res.redirect("/sell?status=error");
    }
})

routes.post("/process-contact-form", async (req, res) => {
    console.log("Contact Form Submitted")
    try {
        const formData = req.body || {};
        const data = await Contact_form.create(formData);
        console.log(data)
        res.redirect("/contact-us?status=success");
    }
    catch (error) {
        console.log(error)
        res.redirect("/contact-us?status=error");
    }
})

// To remove slider entries when a user deletes their Sell post
routes.get("/delete-sell/:id", isLoggedIn, async (req, res) => {
  try {
    const entry = await Sell_form.findOne({ _id: req.params.id, userId: req.session.userId });
    if (entry) {
      await Slider.deleteOne({ imageUrl: entry.image }); // Remove corresponding slider
      await Sell_form.deleteOne({ _id: req.params.id });
    }
    res.redirect("/profile");
  } catch (err) {
    res.send("Error deleting entry: " + err.message);
  }
});


module.exports = routes;