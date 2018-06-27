// prod.js - production keys here!!!
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

