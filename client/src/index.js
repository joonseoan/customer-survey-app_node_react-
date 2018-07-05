import React from 'react';
import ReactDOM from 'react-dom';

// Bear in mind again that "Provider" is a tag to interconnect
//      react and redux to provide the state data from redux to react.
import { Provider } from 'react-redux';

// "createStore" is a component inside of "Provider"
// applyMiddleware is a tool/component to pull out data out of "createStore"
//      and then to deliver them to "Provider"
// Finally, "Provider" makes react and redux woring togeter.
import { createStore, applyMiddleware } from 'redux';

// Use redux-thunk
import reduxThunk from 'redux-thunk';

// importing materialize.min.css over here.
// It is not matter where we imports materialize css.
// Just once and then good to go!!
// For the url, please find materialize-css in node_modules.
// We need to put "css" extension because it is not javascript file
// 		so that webpack can recognize it as a css file and merge it into this app.

// 1)
// import materializeCSS from 'materialize-css/dist/css/materialize.min.css';

// 2) just like "require('nodemodule')";
import 'materialize-css/dist/css/materialize.min.css';


import App from './components/App';
import reducers from './reducers/';


// import axios from 'axios';
// "axios" is assigned to "window" object.
// window.axios = axios; 


// Define store and data-pulling-out middleware in Redux
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
//"Before: const createStoreWithMiddleware = applyMiddleware(promise)(createStore);"

ReactDOM.render(

    // In react-redux environment, "Provider" which interconnect
    //      react components and redux store, are the parents of them.
    <Provider store = { store }>

        <App />

    </Provider>,

document.querySelector('#root'));