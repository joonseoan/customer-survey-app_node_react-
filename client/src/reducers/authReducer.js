import { FETCH_USER } from '../actions/types';

export default function ( state = null, action) {

	console.log('action: ', action);

    switch(action.type) {

    	// In order to give better ux info to the user (it is my opinion, though)
    	// 		We should break down authentication processes into 3 parts:
    	//		- Request : it can be a logn time -> the user needs to notice the state
    	//		- Request complete : Now, the user notice he/she just logged in
    	//		- Reject : the user notices he/she failed to log in
    	// Withouth the work up above, the user can be confused 
    	//		particualry when they are in the slow network.
    	
    	// So here's things
    	// Start a request until get the request completed : state = null
    	// The user logged in : state = action.payload
    	// The user failed to get in : state = false
    	// Please go to Header component to vrify it

    	case FETCH_USER:

    		// when the user does not the tokoen or googleID
    		//		because they are  new user or try to login in different browser
    		// In this case when the googleID is not available, return "false"
    		//		then let the user get googleID again.
    		// "false" : not available
            console.log('action.payload: ', action.payload);
    		return action.payload || false;

        default:
            return state;

    }
    
}