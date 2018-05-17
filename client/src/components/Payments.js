import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

// import { handleToken } from '../actions/index';
import * as actions from '../actions';

class Payments extends Component {

	render() {

		/* just to see how  "process.env.REACT_APP_STRIPE_KEY" works. */
		// debugger; // => we cannot see "process.env.REACT_APP_STRIPE_KEY" in bundle.js
		// Instead, the key value shows up. 

		/*

			"process.env" is  another way to deliver key to the app server.
			because react (front-end) sometimes needs 
			to communicate with the app server like "stripe" without any node server.

			As we use process.env, the react can have same variables as node server has.
			That means the variables can share with the server.

			From the "react-stripe-checkout" to the "token" delivery, 
			the react communicates with stripe app server by giviing "publishable key" 
			and receiving "token" data

			In order to communicate with strpe app server, axios can't be used.
			The best way is to use "react-stripe-checkout" component. 

			This entire class is a component to get stripe api data, "token".

		*/

		return(

			/*
				user clicks "add credits" button.

				tell Stripe to show a credit card form
			
				when the user enters the credit card number in the form
				the stripe server sends "token" from the callback.

				Then we sends the token to our api server

				Then, our server confirms that the charge is successfully done with Stripe

				Then, the server addes the credit. 
		
			*/	
			

			/*

				Again, regarding for the process.env can be used anywhere
				because it is a machin enviroment.

			*/

			/* Mainly id: can be a token itself

				{id: "tok_1CPI6oDQtAcEDgcub4didjkC", object: "token", card: {…}, client_ip: "142.55.0.11", created: 1525733226, …}
				card
				:
				{id: "card_1CPI6oDQtAcEDgcuPfTkGZXg", object: "card", address_city: null, address_country: null, address_line1: null, …}
				client_ip
				:
				"142.55.0.11"
				created
				:
				1525733226
				email
				:
				"dfa@dfad.com"
				id
				:
				"tok_1CPI6oDQtAcEDgcub4didjkC"
				livemode
				:
				false
				object
				:
				"token"
				type
				:
				"card"
				used
				:
				false

			*/

			<StripeCheckout

				name = 'Customer Survey'
				description = '$5 for 5 emails'
				amount = { 500 } // => $5.00

				// give token data the server
				// It is a variable to get 'token' object from stripe api server 
				token = { token => this.props.handleToken(token) }
				stripeKey = { process.env.REACT_APP_STRIPE_KEY }

			>
				{/* Bear in mind that html element 

					is able to get into the componet element

				*/}

				<button className = 'btn'>

					Add Credits
				
				</button>

			</StripeCheckout>

		);

	}

}

// actions it self is object. It is not a property of an object.
//		Therefore, it is not requred to use { }
export default connect(null, actions)(Payments);