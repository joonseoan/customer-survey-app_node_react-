import React, { Component } from 'react';

// reduxForm is a built-in lib, not the one we defined in reducers/index.js
// It has a role to communicate with redux which stores the data from the form.
// It is a function object with a parameter inside of redux-form
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
        
        // 2)
        // It works also.
        // return formFields.map(({ label, name }) => {

        //     return <Field label = { label } name = { name } component = { SurveyField }/>

        // });

        // 1)
        // Hardcoding
        // return (

        //     <div>
        //         {/* attributes inside of Field will attach to props.
        //             Therefore, properties of props will be delivered to SurveryField */}
        //         <Field
        //             label = 'Survey Title' 
        //             type = 'text'
        //             name = 'title'
        //             component = { SurveyField }
        //         />
        //         <Field
        //             label = 'Subject Line' 
        //             type = 'text'
        //             name = 'subject'
        //             component = { SurveyField }
        //         />
        //         <Field
        //             label = 'Email Body' 
        //             type = 'text'
        //             name = 'body'
        //             component = { SurveyField }
        //         />
        //         <Field
        //             label = 'Recipient List' 
        //             type = 'text'
        //             name = 'emails'
        //             component = { SurveyField }
        //         />
        //     </div>

        
    }

    render() {

        console.log('this.props in reduxForm: ', this.props);

        return(

            <div>
                {/* handleSubmit is a function from object reduxtForm 
                    
                    {surveyTitle: "afaafa"}
                    surveyTitle
                    :
                    "afaafa"
                    __proto__
                    :
                    Object                
                
                */}

                {/* ************************************************8
                    handleSubmit is the best palce to execute props.onSurveySubmit because it can confirm 
                        that "submit" is successfully done!!!
                */}
                
                {/* 1) <form onSubmit = { this.props.handleSubmit(values => { console.log(values); console.log(this.props) }) }> */}
                
                {/* 2) We will not invoke onSurveySubmitfunction now. 
                       ****** We will talk about the access to values up and above later on.
                <form onSubmit = { this.props.handleSubmit( () => this.props.onSurveySubmit()) }> */}

                {/* 3) There it just passes a function object as a parameter to be invoked by handleSubmit inside's invoker
                    , not by "this.props.onSurveySubmit" itself. It is same as "this.props.handleSubmit( () => this.props.onSurveySubmit())"
                    if it is this.props.onSurveySubmit(), it causes error because handleSubmit's invoker does not 
                    have nothing to work.
                */}
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


/** 
 *  "_.map" is intended to be a functional mapping method:
 *  its function argument should return a value, 
 *  but is not expected to have any side-effects.
 * 
 * Also, it can 

   "_.each" is just a functional replacement for an imperative for loop:
   its purpose is to have an effect, and it is not expected to return any value. 
 
   Finally, remind that
   "_.mapKeys"
   "_.ommit"

*/

/* const xyz = {
    'fName': {type: 'string'},
    'mName': {type: 'string'},
    'lName': {type: 'string'}
    };

console.log('xyz value convertion: ', _.map(xyz));

0: {type: "string"}1: {type: "string"}2: {type: "string"}length: 3__proto__: Array(0)
 */


function validate (values) {
    
    
    // 2)
    const errors = {};
    
    // || If value does not exist, it is not defined.yet
    errors.recipients = validateEmail(values.recipients || '');

    // _.each "no return" should be
    _.each(formFields, ({ name }) => {

        if(!values[name]) errors[name] = `You must provide a ${ name }.`;

    });

    // 1)
    // if(!values.title) errors.title = 'You must provide a title.';

    // if(!values.subject) errors.subject = 'Your must provide a subject.';

    // if(!values.body) errors.body = 'Your must provide a body.';

    // if(!values.recipient) errors.recipient = 'Your must provide a recipient.';


    return errors;

}

// to store value in redux and distribute to all components
//      using reduxForm.
// Invoking reduxForm here, it returns "handleSubmit".
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
