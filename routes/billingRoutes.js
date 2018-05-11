console.log('starting billingRoutes.js');

const keys = require('../config/keys');

// "keys" is an object.
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {

	// can use Promise

	// npm stripe example used a callback or Promise.
	// However, the npm clearly specifies and recommends Promise.
	// Therefore, anynh await can be used.
	app.post('/api/stripe', async (req, res) => {

		// it is from action creator of the client, "handleToken(token)"
		// console.log(req.body);

		/* npm stripe request example
			
			// importing module
			var stripe = require("stripe")(
			  "sk_test_veMH4jRWcZq5dMLg6Go3y5sh"
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

		// 2)
		const charge = await stripe.charges.create({

			// must be a same setup as with client
			amount: 500, // $5
			currency: 'usd',
			description: '$5 for 5 credits',

			// console.log('req.body', req.body);
			source:req.body.id

		});

			console.log('charge: ', charge);

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