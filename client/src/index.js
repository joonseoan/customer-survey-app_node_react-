import React from 'react';
import ReactDom from 'react-dom';

// Bear in mind again that "Provider" is a tag to interconnect
//      react and redux to provide the state data from redux to react.
import { Provider } from 'react-redux';

// "createStore" is a component inside of "Provider"
// applyMiddleware is a tool/component to pull out data out of "createStore"
//      and then to deliver them to "Provider"
// Finally, "Provider" makes react and redux woring togeter.
import { createStore, applyMiddleware } from 'redux';


import App from './components/App';
import reducers from './reducers/index';

// Define store and data-pulling-out middleware in Redux
const store = createStore(reducers, {}, applyMiddleware());

ReactDom.render(

    // In react-redux environment, "Provider" which interconnect
    //      react components and redux store, are the parents of them.
    <Provider store = { store }>

        <App />

    </Provider>,

document.querySelector('#root'));