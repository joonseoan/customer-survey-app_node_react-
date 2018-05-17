import axios from 'axios';

import { FETCH_USER } from './types';

/**
 * 
 * The validation of the existing user can be verified by using the express in the server.

    For instance, we can use "get("api/currentUser")" 
        that makes us notice if the requesting user has, in "cookie", a "user.id" 
        which is sent from the google server and is stored in the cookie when the user signs up.

    If the user has the user.id, the /api/currentUser will send(req.user),
        the registered user information.
    
    If the user does not, the server will not let the user log in
        and then redirect the user to signup url which is "/auth/google"
 
*/
export const fetchUser = () => // {

    // Proxy rule again for the url.
    // Add this url for proxy in package.json
    /*
    
    "/api/*": {
        "target": "http://localhost:5000"
      }
    */

    // Bear in mind again that 'proxy', this is just for development env.
    // In production, the react and node server will be merged.
    // No need to make use of proxy for communication between the node and react servers.
    // axios.get(`/api/currentUser`);

    // usually, without redux-thunk

    // 1)

    /*
    const request = axios.get(`/api/currentUser`);

    return ({

        type: FETCH_USER,
        payload: request

    });
    */

    // Rather than return types and payloads directly to the reducer
    //      by using dispatch function, "redux-thunk" returns dispatch fuctions including "action"
    //      and then "reducers" gets that dispatch function and its object values
    //      whenever its reducer is triggered.
    // In other words, action and values are not directly placed in all reduers.
    // It is only when they are necessary *****" after the action is sucessfully done".
    // "action: axios.get('/api/cuurentUser');""
    
    // 1)
    // return function(dispatch) {

        //        
        // axios
        //     .get('/api/currentUser')
           
        //     // "after the action is sucessfully done".
        //     // dispatch the action values!!!!
        //     .then(res => dispatch({

        //         type: FETCH_USER,
        //         payload: res

        //     }));

        // 2)
        // By using await
        // removed "return" 
        //  "() =>"" function or value : it will automatically return it.
        async dispatch => {

            const res = await axios.get('/api/currentUser');

            // "res" includes all data including header, body and so on.
            // We just need "data".
            dispatch({ type: FETCH_USER, payload: res.data });

        };

// };

// This is to get the current credits of the user.
// Should deal together with the auth. Not separately.
export const handleToken = token => async dispatch => {

    console.log('stripe token: ', token) // ***** find the object below.

    // token flies through "req.body" in header to the server
    const res = await axios.post('/api/stripe', token);

    // get "res" after posts some data to the server.
    dispatch({ type: FETCH_USER, payload: res.data });
    
};


// "token"

/*

{id: "tok_1CRqPJDQtAcEDgcuwfQZx38U", object: "token", card: {…}, client_ip: "142.55.0.10", created: 1526341725, …}
card
:
address_city
:
null
address_country
:
null
address_line1
:
null
address_line1_check
:
null
address_line2
:
null
address_state
:
null
address_zip
:
null
address_zip_check
:
null
brand
:
"Visa"
country
:
"US"
cvc_check
:
"pass"
dynamic_last4
:
null
exp_month
:
10
exp_year
:
2020
funding
:
"credit"
id
:
"card_1CRqPJDQtAcEDgcuvEnPtSvi"
last4
:
"4242"
metadata
:
{}
name
:
"jsdf@asdsdf.com"
object
:
"card"
tokenization_method
:
null
__proto__
:
Object
client_ip
:
"142.55.0.10"
created
:
1526341725
email
:
"jsdf@asdsdf.com"
id
:
"tok_1CRqPJDQtAcEDgcuwfQZx38U"
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
__proto__
:
Object


*/