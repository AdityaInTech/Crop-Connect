require('dotenv').config(); 
const express = require("express")
const hbs = require("hbs")
const path = require("path")
const multer = require('multer')
const fs = require('fs')
const cors = require('cors');

const app = express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require('./routes/main');
const Detail = require('./models/Detail');
// const newFile = require('./models/newFile');
// const Slider = require("./models/Slider");
const Slider = require("./models/Slider");
const Service = require("./models/Service");
const Footer = require("./models/footer");

// Middleware to load footer in allpages
app.use(async (req, res, next) => {
  try {
    const footer = await Footer.findOne().lean();
    res.locals.footer = footer || {};
    res.locals.year = new Date().getFullYear();
  } catch (err) {
    console.error("Error loading footer:", err);
    res.locals.footer = {};
    res.locals.year = new Date().getFullYear();
  }
  next();
});

const session = require('express-session');
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));


app.use(express.json()) 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use('/static', express.static('public'))
// app.use('/static', express.static(path.join(__dirname, '..','public')))
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
// app.use('', routes)

// -------------------- MULTER SETUP --------------------
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // folder where images will be saved
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + path.extname(file.originalname));
//     }
// });
// const upload = multer({ storage: storage });

// Make upload available to routes
// app.use((req, res, next) => {
//     req.upload = upload;
//     next();
// });

app.use('', routes)

hbs.registerHelper('inc', v => Number(v) + 1)
hbs.registerHelper('lower', v => (v || '').toString().toLowerCase())
hbs.registerHelper('eq', (a, b) => a === b);
// Register custom helper
hbs.registerHelper('statusIsSuccess', function (status) {
  return status === "success";
});
hbs.registerHelper('formatDate', function(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
});
hbs.registerHelper('year', () => new Date().getFullYear());


app.set('view engine', 'hbs')
app.set('views', 'views')
hbs.registerPartials('views/partials')
// app.set('view engine', 'hbs')
// app.set("views", path.join(__dirname,'..', 'views'))
// hbs.registerPartials(path.join(__dirname,'..', 'views', 'partials'))


mongoose.connect(process.env.MONGO_URI)
    .then(() => {console.log("✅ Database connected successfully")
        // Detail.create({
        //     brandName:"Technical Solution",
        //    brandIconUrl:"/static/images/image2.png",
        //     links:[
        //         {
        //             label:"Home",
        //             url:"/"
        //         },
        //         {
        //             label:"Services",
        //             url:"/services"
        //         },
        //         {
        //             label:"Buy",
        //             url:"/buy"
        //         },
        //         {
        //             label:"Sell",
        //             url:"/sell"
        //         },
        //         {
        //             label:"Contact Us",
        //             url:"/contact-us"
        //         },
        //         {
        //             label:"Profile",
        //             url:"/profile"
        //         },
        //     ]
        // })

        // Slider.create([
        //     {
        //         title:"Learn Java",
        //         subTitle:"Java is popular language",
        //         imageUrl:"/static/images/image2.png",
        //         // class:"Active"
        //     },
        //     {
        //         title:"Learn Java",
        //         subTitle:"Java is popular language",
        //         imageUrl:"/static/images/image2.png",
        //         // class:"Active"
        //     },
        //     {
        //         title:"Learn Java",
        //         subTitle:"Java is popular language",
        //         imageUrl:"/static/images/image2.png",
        //     }
        // ])

        // Service.create([
        //     {
        //         icon:'/static/images/image2.png',
        //         title:'Provide Best Courses',
        //         description:'We provide courses for student'
        //     },
        //     {
        //         icon:'/static/images/image2.png',
        //         title:'Provide Best Courses',
        //         description:'We provide courses for student'
        //     },
        //     {
        //         icon:'/static/images/image2.png',
        //         title:'Provide Best Courses',
        //         description:'We provide courses for student'
        //     },
        //     {
        //         icon:'/static/images/image2.png',
        //         title:'Provide Best Courses',
        //         description:'We provide courses for student'
        //     },
        //     {
        //         icon:'/static/images/image2.png',
        //         title:'Provide Best Courses',
        //         description:'We provide courses for student'
        //     },
        //     {
        //         icon:'/static/images/image2.png',
        //         title:'Provide Best Courses',
        //         description:'We provide courses for student'
        //     }
        // ])

        // Footer.create([
        //     {
        //         title:"Learn Java",
        //         tagline: "Empowering farmers and buyers through a smart digital marketplace for agriculture.",
        //         copyrightText:"© 2025 AgroFarma. All rights reserved.",
        //     }
        // ])
        
    })
    .catch((err) => console.error("❌ Database connection error:", err));



// app.listen(process.env.Port | 5556, () => {
//     console.log("server started")
// })
const port = process.env.PORT || 5556;
app.listen(port, () => {
    console.log(`server started on ${port}`)
})

// module.exports = { upload };