import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {

    renderContents(){

        // 3 parts to manage buttons ui in the header.
        switch(this.props.auth) {

            case null:

                return;

            case false:

                return <li><a href = '/auth/google'>Login Again with Google Auth</a></li>;

            default:

                // Setup logout url 
                return <li><a href = '/api/logout'>Logout</a></li>;

        }

    }

    render() {

        // login process: 
        
        // Without login info in payload of reducer
        // null -> false
        
        // With googleID info
        // null -> payload.data
        // it returns "false".
        
        return (
            
            /*
             - apply for materialize-css we installed in "index.js"
             - it is same format of "Components" -> "Navbar" in http://materializecss.com/navbar.html 
             - It is really imortant to me for my app!!!!!
            */

            <nav>
                <div className = 'nav-wrapper'>
                    <a href = "#" className = 'left brand-logo'>
                        Customer Survey
                    </a>
                    <ul className = 'right'>
                                { this.renderContents() }
                       
                    </ul>
                </div>
            </nav>

        );
    }
}

function mapStateToProps({ auth }) {

    console.log(auth);

    return { auth };
}

export default connect(mapStateToProps)(Header);