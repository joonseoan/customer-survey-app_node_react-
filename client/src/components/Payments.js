import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

// import { handleToken } from '../actions/index';
import * as actions from '../actions';

class Payments extends Component {

	render() {

		console.log('this.props in Payments: ', this.props)

		return(

			<StripeCheckout

				name = 'Customer Survey'
				description = '$5 for 5 emails'
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

			<button className = 'btn'>

					Add Credits
				
				</button>

			</StripeCheckout>

		);

	}

}

export default connect(null, actions)(Payments);