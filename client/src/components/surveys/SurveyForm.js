import React, { Component } from 'react';

import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmail from '../../utils/validateEmails';
import formFields from './formField';

class SurveyForm extends Component {

    renderFields() {

        return _.map(formFields, ({label, name}) => {

            return <Field 
                
                key = { name }
                label = { label }
                name = { name } 
                type = 'text' 
                component = { SurveyField }
            
            />

        });
        
    }

    render() {

        console.log('this.props in reduxForm: ', this.props);

        return(

            <div>
                
                <form onSubmit = { this.props.handleSubmit(this.props.onSurveySubmit) }>
                    
                    {/* 1) <Field type = 'text' name = 'surveyTitle' component = 'input' /> */}
                    { this.renderFields() }
                    <Link to = '/surveys' className = 'red btn-flat left white-text'>
                        Cancel
                    </Link>
                    <button type = 'submit' className = 'blue btn-flat right white-text'>
                        Next
                        <i className = 'material-icons right'>done</i>
                    </button>
                </form>
            </div>
        
        );

    }

}

function validate (values) {
    
    const errors = {};
    
    // || If value does not exist, it is not defined.yet
    errors.recipients = validateEmail(values.recipients || '');

    // _.each "no return" should be
    _.each(formFields, ({ name }) => {

        if(!values[name]) errors[name] = `You must provide a ${ name }.`;

    });

    
    return errors;

}

export default reduxForm({

    // This is making properties for this component.
    // Then, they attach to props.!!!**************************
    validate,

    // define this form component name. Then it attaches to props.
    // This props inherits to the child.
    form : 'surveyForm',

    // this property makes the value remain in the form!!!!!!*********
    // Default value is true which means that it deletes value the user input.
    destroyOnUnmount : false

})(SurveyForm);
