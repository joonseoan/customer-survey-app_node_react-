import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {

    renderContents(){

        switch(this.props.auth) {

            case null:

                // nothing to do
                return;

            case false:

                return <li><a href = '/auth/google'>Login Again with Google Auth</a></li>;

            default:

                return [ 

                    <li key = '1'><Payments /></li>,
                    <li key = '2' style = {{ margin : '0 10px' }}>

                        Credits: { this.props.auth.credits }
                    
                    </li>,
                                            
                    <li key='3' ><a href = '/api/logout'>Logout</a></li>
                ];

        }

    }

    render() {

        return (
            
            <nav>
            
                <div className = 'nav-wrapper'>
                    
                    <Link to = {this.props.auth ? '/surveys' : '/'} 
                            className = 'left brand-logo'
                    >
                        Customer Survey
                    
                    </Link>
                
                    <ul className = 'right'>

                        { this.renderContents() }
                       
                    </ul>
            
                </div>
            
            </nav>

        );
    }
}

function mapStateToProps({ auth }) {

    //console.log(auth);

    return { auth };
}

export default connect(mapStateToProps)(Header);
