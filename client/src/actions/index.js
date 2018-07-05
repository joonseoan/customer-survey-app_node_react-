import axios from 'axios';

import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => async dispatch => {

    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data });

};

export const handleToken = token => async dispatch => {

    console.log('token: ', token)

    const res = await axios.post('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: res.data });
    
};

export const submitSurvey = (values, history) => async dispatch => {

    const res = await axios.post('/api/surveys', values);

    // history : stores navigation logs.
    history.push('/surveys');
    
    // get "res" after posts some data to the server.
    dispatch({ type: FETCH_USER, payload: res.data });
     
};

// new action creator!!!
export const fetchSurveys = () => async dispatch => {

    const res = await axios.get('/api/surveys');

    dispatch({ type: FETCH_SURVEYS, payload: res.data });
     
};
