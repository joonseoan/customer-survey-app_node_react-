// prod.js - production keys here!!!
// Please, commit this production keys so that 
//   1) the app is in production / development environment
//   2) Heroku will notice the we are using "production env and its variable" listed below.

// Because we will commit this file, we must not write the keys over here.
// ID must be uppercase.
/*
const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const mongoURI = process.env.MONGODB_URI;
const cookieKey = process.env.COOKIE_KEY; // It can be any letter just to find the user.
const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
*/

/*module.exports = { 

	googleClientID : process.env.GOOGLE_CLIENT_ID,
	googleClientSecret : process.env.GOOGLE_CLIENT_SECRET,
	mongoURI : process.env.MONGODB_URI,
	cookieKey : process.env.COOKIE_KEY, // It can be any letter just to find the user.
	stripePublishableKey : process.env.STRIPE_PUBLISHABLE_KEY,
	stripeSecretKey : process.env.STRIPE_SECRET_KEY

};*/

module.exports = { 

	googleClientID : GOOGLE_CLIENT_ID,
	googleClientSecret : GOOGLE_CLIENT_SECRET,
	mongoURI : MONGODB_URI,
	cookieKey : COOKIE_KEY, // It can be any letter just to find the user.
	stripePublishableKey : STRIPE_PUBLISHABLE_KEY,
	stripeSecretKey : STRIPE_SECRET_KEY

}; 

// In order for the keys to be setup, please visit the document file.