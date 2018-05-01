import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';

// * : pulls out all action creators in actions/index.js
//      then put them all in an "actions" object.
import * as actions from '../actions';
import Landing from './Landing';
// It would better to centralize the functions.
// "Header" also checks the token validation but
// it looks sparse that we would not esily find the functios.

// In order to make react life cycles and put the action creators together,
// the class is required.

//const ladning = () => <h1>Landing</h1>;
const surveyView = () => <h1>surveyView</h1>;
const dashboard = () => <h1>Dashboard</h1>;



class App extends Component {

    // In updated version of react,
    //      comonentWillMount is called several times
    // Also, no big gap of boot-up speed between two life-cycle mehtods
    componentDidMount() {

        this.props.fetchUser();

    }

    render() {

        console.log('actions in App: ', actions);

        // this.props including "fetchUser dispatch fuction"
        console.log('this.props: ', this.props)
        
        return (
        
        <div  className = 'container'>
            <BrowserRouter>
        
                <div>
                     
                    < Header />        
                    
                    <Route exact path = '/' component = { Landing } />
                    <Route exact path = '/survey' component = { dashboard } />
                    <Route path = '/surveyView' component = { surveyView } />
                    
                </div>

            </BrowserRouter>
        </div>

    );



    }
}

/*
const App = () => {

    return (
        // find the highest level container.
        // Then make "className" over here.
        <div  className = 'container'>
            <BrowserRouter>
                { container = > top dom}
                <div>

                    { pinned to all url.  must be upper letter}  
                    < Header /> 
                            
                    {How com? exact??? now???}
                    <Route exact path = '/' component = { ladning } />
                    <Route path = '/survey' component = { dashboard } />
                    

                </div>

            </BrowserRouter>
        </div>

    );

};

*/

// just put "actions" because it is an object.
export default connect(null, actions)(App);

// Bear in mind that "BrowserRouter" can have just one child.!!!!
/**
 * 
 * <BrwoserRouter> ==> incorrect!!!
 *      <div />  
 *      <div />
 * </BrowserRouter>
 * 
 * <BrwoserRouter> ==> correct!!!
 *      <div />  
 * </BrowserRouter>
 */
