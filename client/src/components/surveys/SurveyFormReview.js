import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

// In order to redirect to /surveys 
//  after "submit"
import { withRouter } from 'react-router-dom'; 


import formFields from './formField';
import * as actions from '../../actions';

// formValue from redux
const SurveyFormReview = ({ onCancel, formValue, submitSurvey, history }) => {
    
    const reviewField = _.map(formFields, ({ label, name }) => {

        return <div key = { name }>
                <label>{ label }:</label>
                <div>{ formValue[name] }</div>
              </div>; 
    }); 

    return (

        <div>
            <h5>
                Please, doublecheck your survey.
            </h5>
            
            { reviewField }

            <button className = 'yellow darken-3 btn-flat'

                    onClick = { onCancel }
            
            >Back</button>
            {/*
                
                onClick = { () => submitSurvey(formValue) } //=> automatically invoked.
                    must use callback of onClick
                However, because of parameter, "formValue"
                we need to specify ().

                In order to prevent from involing by itself,
                we need to specify arrow function like down below.

            */}
            <button className = 'green btn-flat right'
                    
                onClick = { () => submitSurvey(formValue, history) }
            
            >
                Send Survey
                <i className = 'material-icons right'>email</i>
            </button>

        </div>

    );

}

/* 
    // That is why we did form:reduxForm. It gives values to redux!!!!!
     
        {auth: {…}, form: {…}}
        auth
        :
        credits
        :
        6
        googleID
        :
        "116918350790714881539"
        __v
        :
        0
        _id
        :
        "5b19fb77479478261c58e775"
        __proto__
        :
        Object
        form
        :
        surveyForm
        :
        anyTouched
        :
        true
        fields
        :
        {title: {…}, subject: {…}, body: {…}, emails: {…}}
        registeredFields
        :
        {title: {…}, subject: {…}, body: {…}, emails: {…}}
        submitSucceeded
        :
        true
        syncErrors
        :
        {emails: undefined}
        values
        :
        {title: "dafa", subject: "adfa", body: "afddadf", emails: "af@daf.com"}
        __proto__
        :
        Object
        __proto__
        :
        Object
        __proto__
        :
Object
*/
  // console.log('redux State: ', state);
function mapStateToProps({ form }) {
    
    console.log('form', form)
    return { formValue : form.surveyForm.values };

}

// With "withRouter", it adds 'history' object to props
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));