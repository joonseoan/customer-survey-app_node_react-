// prod.js - production keys here!!!
// Please, commit this production keys so that 
//   1) the app is in production / development environment
//   2) Heroku will notice the we are using "production env and its variable" listed below.

// Because we will commit this file, we must not write the keys over here.
// ID must be uppercase.

const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const mongoURI = process.env.MONGODB_URI;
const cookieKey = process.env.COOKIE_KEY; // It can be any letter just to find the us
const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;


module.exports = {  
				
					googleClientID,
					googleClientSecret,
					mongoURI,
					cookieKey,
					stripePublishableKey,
					stripeSecretKey

				 };

/*module.exports = { 

	googleClientID : process.env.GOOGLE_CLIENT_ID,
	googleClientSecret : process.env.GOOGLE_CLIENT_SECRET,
	mongoURI : process.env.MONGODB_URI,
	cookieKey : process.env.COOKIE_KEY, // It can be any letter just to find the user.
	stripePublishableKey : process.env.STRIPE_PUBLISHABLE_KEY,
	stripeSecretKey : process.env.STRIPE_SECRET_KEY

};*/


/*module.exports = { 

	googleClientID : '929012459244-omvku0hql66rbc1fm7ljgpfqsmsuk8fq.apps.googleusercontent.com',
	googleClientSecret : 'YlDw0-kGeUoohqodFNVkd-qc',
	mongoURI : 'mongodb://survey_subscribers:7604632tk@ds139342.mlab.com:39342/customer-survey-prod',
	cookieKey : 'sgsdfglertyjklcvhjk', // It can be any letter just to find the user.
	stripePublishableKey : 'pk_test_Jg1vFTZIOBwQbxyPMQx4tJlu',
	stripeSecretKey : 'sk_test_veMH4jRWcZq5dMLg6Go3y5sh'

}; 
*/

// In order for the keys to be setup, please visit the document file.