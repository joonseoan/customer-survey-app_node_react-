const keys = require('../config/keys');

// configuration of stripe
const stripe = require('stripe')(keys.stripeSecretKey);

const requireLogin = require('../middleware/requireLogin');

module.exports = app => {

app.post('/api/stripe', requireLogin, async (req, res) => {

		// it is from action creator of the client, "handleToken(token)"
		console.log('req.body from client:', req.body);

		const charge = await stripe.charges.create({

			// must be a same setup as with client
			amount: 500, // $5
			currency: 'usd',
			description: '$5 for 5 credits',
			source:req.body.id

		});
			
		req.user.credits += 5;

		// from "passport" m/w
		const user = await req.user.save();
		console.log('1. ', user)


		// ***************We can send "user" object to the client by using variable, "user".
		res.send(user);
		console.log('2. ', user)

	});

};