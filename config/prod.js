// prod.js - production keys here!!!
// Please, commit this production keys so that 
//   1) the app is in production / development environment
//   2) Heroku will notice the we are using "production env and its variable" listed below.

// Because we will commit this file, we must not write the keys over here.
// ID must be uppercase.

const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const mongoURI = process.env.MONGO_URI;
const cookieKey = process.env.COOKIE_KEY; // It can be any letter just to find the us
const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const sendGridKey = process.env.SEND_GRID_KEY;
const redirectDomain = process.env.REDIRECT_DOMAIN;

module.exports = {  
				
					googleClientID,
					googleClientSecret, 
					mongoURI,
					cookieKey,
					stripePublishableKey,
					stripeSecretKey,
					sendGridKey,
					redirectDomain

				 };

