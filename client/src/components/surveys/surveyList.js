import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions/index';

class SurveyList extends Component { 

    componentDidMount() {

        this.props.fetchSurveys();

    }

    rederConents() {

        return this.props.survey.reverse().map(result => {

            return (

                <div className = 'card darken-1' key = { result._id } >

                    <div className = 'card-content'>
                    
                        <span className = 'card-title' >{ result.title }</span>
                        <p>
                            { result.body }
                        </p>
                        <p className = 'right'>
                            Sent on : { new Date( result.dateSent).toLocaleDateString() }
                        </p>
                    
                    </div>

                    <div className = 'card-action'>

                        <a>Yes: { result.yes }</a>
                        <a>No: {result.no } </a>
                    
                    </div>

                </div>


            );

        });

    }

    render() {

        return (

            <div>{ this.rederConents() }</div>
        
        );

    }

}

function mapStateToProps({ survey }) {

    return { survey };

}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);

