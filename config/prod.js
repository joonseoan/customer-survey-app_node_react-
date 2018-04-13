// prod.js - production keys here!!!
// Please, commit this production keys so that 
//   1) the app is in production / development environment
//   2) Heroku will notice the we are using "production env and its variable" listed below.

// Because we will commit this file, we must not write the keys over here.
const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const mongoURI = process.env.MONGO_URI;
const cookieKey = process.env.COOKIE_KEY; // It is any letter just to find the user.

module.exports = { googleClientID, googleClientSecret, mongoURI, cookieKey }; 

// In order for the keys to be setup, please visit the document file.