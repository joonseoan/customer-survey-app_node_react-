import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {

    // 1)
    // Traditional way
    // constructor(props) {

    //     super(props);

    //     this.state = { new : true };

    // }

    //2) It is 100% equivalent to constructor up and above!!!*********
    state = { showFormReview : false };

    // This is a way of controlling rendering SurveyFormReview and SurveyFor
    //      without "Link" component.
    // Must access to surveyForm first to get to SurvyeFormReview.
    //      because it is possible for the user to directly access to SurveyFormReview on URL.
    renderContents() {

        if(this.state.showFormReview) {
            
            return <SurveyFormReview 
                
                onCancel = { () => { this.setState({ showFormReview : false })} }
            
            />;
        
        }

        // sending props's property to SurveyForm component
        return <SurveyForm onSurveySubmit = { () => { this.setState ({ showFormReview : true })} } />;

    }

    render() {

        return(

            <div>
                { this.renderContents() }
            </div>
        
        );
    
    }

}

// new reduxForm : 
//  whenever it executes new reduxForm,
//  the previous attributes and properties of reduxForm including "form" will be dumped out.
// It is reduxform's default function.
export default reduxForm({

    form: 'surveyForm'

})(SurveyNew);