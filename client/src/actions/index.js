import axios from 'axios';

import { FETCH_USER } from './types';

/**
 * 
 * The verification of the existing user can be verified by using the express in the server.

    For instance, we can use "get("api/currentUser")" 
        makes us know if the request user has a "user.id" 
    which is sent from the server and is stored in the cookie when the user signs up.

    If the user has the user.id, the /api/currentUser will send(req.user) 
        which is the registered user information.
    If the user does not, the server will not let the user log in
        and then redirect the user to signup which is "/auth/google"
 
*/
export const fetchUser = () => // {

    // Proxy rule again for the url.
    // Add this url for proxy in package.json
    /*
    "/api/*": {
        "target": "http://localhost:5000"
      }
    */
    // Bear in mind again that prox this is just for development env.
    // In production, the react and node server will be merged.
    // No need to make use of proxy.
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

    // Rather than return type and payload directly to reducer by using dispatch function
    //      "redux-thunk" returns a fuction including "action" with the dispatch function
    //      and then reducers get the dispatch and its object values
    //      whenever its reducer is triggered.
    // In other words, action and values are not directly plaeced in all reduers.
    // It is only when they are necessary *****"after the action is sucessfully done".
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

        // By using await
        // removed "return" 
        //  () => function or value : it will automatically return it.
        async dispatch => {

            const res = await axios.get('/api/currentUser');

            // "res" includes all data including heander, body and so on.
            // We just need "data".
            dispatch({ type: FETCH_USER, payload: res.data });

        };

// };