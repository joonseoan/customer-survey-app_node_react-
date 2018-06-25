const keys = require('../config/keys');

// "keys" is an object.
// sent SecretKey to stripe

/*

[ Basic configuration ]

	var stripe = require('stripe')('sk_test_...');
	 
	var customer = await stripe.customers.create(

	  { email: 'customer@example.com' }

	)

*/

// configuration of stripe
const stripe = require('stripe')(keys.stripeSecretKey);

const requireLogin = require('../middleware/requireLogin');

module.exports = app => {

	// can use Promise

	// npm stripe example used a callback or Promise.
	// However, "npm" clearly specifies and recommends "Promise" or chainable functions.
	// Therefore, "async" and "await" can be used.
	

	// ********* In express, it does not care about how many args it needs.
	// 		We can put as many as m/w, args, and callback we want.
	//		It is express a requirement.
	app.post('/api/stripe', requireLogin, async (req, res) => {

		// 401: You are not authorizd
		// Bear in min that if the browser does not have "req.user"
		//		it means that the user logged ou or unauthorized.
		// req.user can get through passport/serializeUser();
		// error is going to be in res.error!!!
		
		// It is deleted as we us m/w
		// if(!req.user) return res.status(401).send({ error : 'You must log in' });

		

		/* npm stripe request example
			
			// importing module
			var stripe = require("stripe")(
			  "sk_test_*****************"
			);
			
			// request
			stripe.charges.create({
			  amount: 2000,
			  currency: "cad",
			  source: "tok_mastercard", // obtained with Stripe.js
			  description: "Charge for jacob.taylor@example.com"
			}, function(err, charge) {
			  // asynchronously called
			});

		*/

		// it is from action creator of the client, "handleToken(token)"
		console.log('req.body from client:', req.body);
		// only "id" info needed

		// 2)
		const charge = await stripe.charges.create({

			// must be a same setup as with client
			amount: 500, // $5
			currency: 'usd',
			description: '$5 for 5 credits',
			source:req.body.id

		});

			// console.log('req.user: ', req.user);
	 		// 	console.log('req.user.credits: ', req.user.credits);
			// console.log('charge: ', charge);

			
			req.user.credits += 5;

			// from "passport" m/w
			const user = await req.user.save();
			console.log('1. ', user)


			// ***************We can send "user" object to the client by using variable, "user".
			res.send(user);
			console.log('2. ', user)

		// 1)
		// stripe.charge.create({

		// 	amount: 500,
		// 	currenty: 'usd',
		// 	description: '$5 for 5 credits',
		// 	source:req.body.id

		// }).then((charge) => {

		// 	console.log(charge);

		// })

	});

};