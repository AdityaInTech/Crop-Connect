# Crop-Connect
Crop Connect is a simple marketplace where farmers list crops with images and details, and buyers easily browse and connect. Built using Node.js, Express, MongoDB, HBS, and Cloudinary.

## Overview
Crop Connect bridges the gap between sellers and buyers by offering a clean interface to list crops with detailed information.
Sellers can upload images, specify pricing, add descriptions, and mark whether pricing is negotiable.

## This project demonstrate

~Backend API development
~Image upload with Cloudinary
~Template-based rendering
~Database modeling & CRUD operations
~Session handling
~Clean UI using CSS + HBS


## Key Features
### Seller Features
- Register & login  
- Add crop details using a structured Sell Form  
- Upload crop images stored securely on Cloudinary  
- Mark negotiation availability and crop condition  
- View personal listings in the Profile section  
- Delete crop posts anytime  
- Recent posts appear in a homepage slider  

### Buyer Features
- View all crops available for sale  
- Search crops by name, price, or location  
- See detailed crop information on a dedicated page  
- Contact seller through phone or email  

### System Features
- Secure authentication with express-session  
- MongoDB + Mongoose schema modeling  
- Cloudinary integration for image storage  
- Fully responsive UI using HBS templates and CSS  
- Dynamic slider showing recent crop posts  
- Contact form for user queries  
- Services section describing platform features

## Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | HBS, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Image Upload | Cloudinary |
| Authentication | express-session |
| Version Control | Git + GitHub |

## Sell Form Schema (Mongoose Model)

{
userId,
owner_name,
owner_contact,
email,
country,
state,
location,
crop_name,
crop_variety,
quantity,
price,
condition,
harvest_date,
image,
description,
negotiable
}


## Image Upload Flow (Cloudinary)
1. User fills Sell Form  
2. Image uploaded via multipart/form-data  
3. Cloudinary middleware processes file  
4. Cloudinary returns secure image URL  
5. URL saved in MongoDB alongside crop info  

## Session Handling

app.use(session({
secret: process.env.SESSION_SECRET,
resave: false,
saveUninitialized: true
}));


## Sell Form Workflow
- User enters personal + crop details  
- Image sent to Cloudinary  
- Backend validates fields  
- Data saved into MongoDB  
- Listing appears on “My Listings” and homepage slider  

## Display Format Example
- Name  
- Contact  
- Email  
- Country / State / City  
- Crop Type & Variety  
- Quantity  
- Price per kg  
- Condition  
- Harvest Date  
- Description  

## Additional Functional Sections
- *Slider Section:* Displays latest crop posts on the homepage  
- *Contact Form:* Allows users to submit queries  
- *Services Section:* Explains key features offered by the platform  
- *Profile Section:* Displays all posts uploaded by the logged-in seller, with delete controls  

## Future Enhancements
- Buyer–Seller chat system  
- Admin dashboard
- Rating System (help to track trustworthy Sellers)
- AI-based price prediction  
- Crop quality prediction model  
- Mobile App (Flutter / React Native)
