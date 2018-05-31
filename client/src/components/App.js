import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';

// * : pulls out all action creators in actions/index.js
//      then put them all in an "actions" ****** object.
import * as actions from '../actions';
import Landing from './Landing';

//const surveyView = () => <h1>surveyView</h1>;
//   // <Route exact path = '/surveyView' component = { surveyView } />
                  
//const ladning = () => <h1>Landing</h1>;
const dashboard = () => <h1> Dashboard </h1>; 
//
    
class App extends Component {

    componentDidMount() {

        this.props.fetchUser();

    }

    render() {

        // It would be better to centralize the functions.
   
    ///////// "Header" also checks "token" validation but
    //      it looks sparse that we would not esily find the functios.

    // In order to make react life cycles and put the action creators together,
    //      the class is required.

    // In the updated version of react,
    //      comonentWillMount is called several times
    // Also, no big gap of boot-up speed between two life-cycle mehtods


        // => {__esModule: true}
        console.log('actions in App: ', actions);

        // this.props including "fetchUser dispatch fuction"
        // => {fetchUser: ƒ}
        console.log('this.props: ', this.props)
        
        return (
        
        <div  className = 'container'>
            <BrowserRouter>
        
                <div>
                     
                    < Header />        
                    
                    <Route exact path='/' component = { Landing } />
                    
                    <Route exact path='/surveys' component = { dashboard } />

                </div>

            </BrowserRouter>
        </div>

    );



    }
    
}

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
