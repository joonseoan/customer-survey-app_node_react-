console.log('starting index.js of "server" part');

const express = require('express');

const passport = require('passport');

// "Strategy" is a component of "passport-google-oauth20"
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { googleClientID, googleClientSecret } = require('./config/keys');


const app = express();

// "use" is a method to access GoogleStrategy 
// Then, by using "()" of the object, it makes Google configure 
//      the authentication process for the application.

/*
// In order for Google to correctly configure the auth process,
//      we need to give Google information about the application.
// They are "client id" and "client secret"

// For instance, we need to inform Google 
//      where the users are from for the auth.
// Then, Google will send them back some (API) info for the auth process.
// To establish this process, we need to sign up with Google OAuth.
*/

// Once we finish clientID and client secret, 
//      we need to inform Google both.
passport.use(
    
    new GoogleStrategy({

        // "clientID" and "clientSecret" are built-in name.
        clientID : googleClientID,
        clientSecret : googleClientSecret,

        // It assigns the route / directory
        //      where / which route Google should ping the permission
        //      at this app server, after it listens to and investigates
        //      the request form the user and then this app server
        callbackURL : '/auth/google/callback'

    }, (accesToken) => {

        // later on.
        console.log(accessToken);

    })

);

// Route Handler to listen to the user access to the define route "/auth/google".
//      => It is a kind of the first user request.
// Then it will try to send the info including "clientID" and "clientSecret"
//      for the configuration.

// We will not use callback because we are using "passport" MW.
// The " passport~ " below is to process "send" authenticate response info to
//      google server, not back to the user.

// 1) 'google', the first argument defines that the strategy defined above
//      for the google strategis other than any other app.
// Therefore 'google' stands for containing the information about
//      GoogleStrategy object. 

// 2) Google defines different properties for the auth.
//    'scope' defines the properties we want? to use for auth
//      ,among many different properties.
// In this app, we will use "profile" and "email" only.
app.get('/auth/google', passport.authenticate('google', {

    scope : ['profile', 'email']

}));


const PORT = process.env.PORT || 5000;
app.listen(PORT);