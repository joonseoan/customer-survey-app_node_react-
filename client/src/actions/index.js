import axios from 'axios';

import { FETCH_USER } from './types';

// Proxy rule again for the url.
// Add this url for proxy in package.json
/*

"/api/*": {
    "target": "http://localhost:5000"

}

*/

// Without redux-thunk

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
// "action: axios.get('/api/cuurent_user');""

// 1)
// return function(dispatch) {

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

export const fetchUser = () => async dispatch => {

    const res = await axios.get('/api/current_user');

    // "res" includes all data including header, body and so on.
    // We just need "data".
    dispatch({ type: FETCH_USER, payload: res.data });

};

// This is to get the current credits of the user.
// Should use same TYPE info because it is using POST,
//      which does not need a separate, physical reducer.
export const handleToken = token => async dispatch => {

    console.log('token: ', token)

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
    address_city, Visa, country , exp_month, exp_year, "credit", id "card_1CRqPJDQtAcEDgcuvEnPtSvi", name

*/

export const submitSurvey = (values, history) => async dispatch => {

    const res = await axios.post('/api/surveys', values);

    // history : stores navigation logs.
    history.push('/surveys');
    // get "res" after posts some data to the server.
    dispatch({ type: FETCH_USER, payload: res.data });
     
};