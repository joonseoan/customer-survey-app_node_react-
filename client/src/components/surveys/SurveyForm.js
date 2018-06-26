import React, { Component } from 'react';

// reduxForm is a built-in lib, not the one we defined in reducers/index.js
// It has a role to communicate with redux which stores the data from the form.
// It is a function object with a parameter inside of redux-form
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';

console.log('FIELD: ', Field)
console.log('rudexForm: ', reduxForm);

const FIELD = [
    
    {label : 'Survey Title', name : 'title'},
    {label : 'Subject Line', name : 'subject'},
    {label : 'Email Body', name : 'body'},
    {label : 'Recipient List', name : 'emails'}

];

class SurveyForm extends Component {

    renderFields() {

        return _.map(FIELD, ({label, name}) => {

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
        // return FIELD.map(({ label, name }) => {

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
                <form onSubmit = { this.props.handleSubmit(values => { console.log(values); console.log(this.props) }) }>
                    
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

    if(!values.title) errors.title = 'You must provide a title.';

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
    form : 'surveyForm'

})(SurveyForm);
