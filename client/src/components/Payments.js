import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
// import stripe_key from './key';

import * as actions from '../actions';

// function message() { alert('kkkkk'); }

class Payments extends Component {

	 message() {

	 	alert('You must enter credit card number: 4242 4242 4242 4242');

	 }

	render() {

		console.log('this.props in Payments: ', this.props);
		
		return(

			<StripeCheckout

				name = 'Customer Survey'
				description = 'Card number : 4242 4242 4242 4242'
				amount = { 500 } // => $5.00

				// Give token data to the server
				// It is a variable to get 'token' object from stripe api server 
				
				// Invocation of this.props.handleToken(token) occurrs at Stripe Server
				// Then, the server run this function 
				//	and then it executes action creator!!!
				//	The, action creator gets payload.data and delivers them to redux.
				token = { token => this.props.handleToken(token) }
				stripeKey = { process.env.REACT_APP_STRIPE_KEY }
			>

				{/* <button className = 'btn' message_number = { this.message() }>*/}

				<button className = 'btn' onClick = { this.message.bind() }>
					
					Add Credits
				
				</button>

			</StripeCheckout>

		);

	}

}

export default connect(null, actions)(Payments);