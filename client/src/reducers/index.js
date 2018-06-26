import { combineReducers } from 'redux';

// built-in reducer. by convention "as reduxForm" 
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

export default combineReducers ({

    auth : authReducer,
    form : reduxForm
    
});