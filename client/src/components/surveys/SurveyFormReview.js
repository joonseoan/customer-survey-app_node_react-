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
        
            <button className = 'green btn-flat right'
                    
                onClick = { () => submitSurvey(formValue, history) }
            
            >
                Send Survey
                <i className = 'material-icons right'>email</i>
            </button>

        </div>

    );

}

  // console.log('redux State: ', state);
function mapStateToProps({ form }) {
    
    return { formValue : form.surveyForm.values };

}

// With "withRouter", it adds 'history' object to props
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));