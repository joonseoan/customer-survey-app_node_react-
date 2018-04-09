console.log('starting passport.js');

const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const { googleClientID, googleClientSecret } = require('../config/keys');



// "passport" is not required to export 
//      because "index.js" does not use a specific function of this file.
//  However, to work together, "index.js" must import this component by using
//      require(directory of this file.)


// "use" is a method to access GoogleStrategy 
// Then, by using "()" of the object, it makes Google configure 
//      the authentication process for the application.

/*
// In order for Google to correctly configure the auth process,
//      we need to give Google information about the application.
// They are "client id" and "client secret"

// For instance, we need to inform Google 
//      where the users are from and which app they are using for the auth.
// Then, Google will send them back some (API) info for the auth process.
// To establish this process, we need to sign up with Google OAuth.
// Please, go to the setup doc.
*/

// Once we finish clientID and client secret, 
//      we need to inform Google both.
passport.use(
    
    new Strategy({

        // "clientID" and "clientSecret" are built-in name.
        clientID : googleClientID,
        clientSecret : googleClientSecret,

        // It assigns the route / directory
        //      where / which route Google should ping the permission
        //      at this app server, after it listens to and investigates
        //      the request form the user and then this app server
        callbackURL : '/auth/google/callback'

    }, (accessToken, refreshToken, profile, done) => {

        // accessToken: it is a kind of permission key of admin
        //      of the account. The user is able to delete or modify
        //      the account and etc.
        console.log('accessToken: ', accessToken);

        // refreshToken: it allows us to refresh "accessToken"
        // It is expired at the certain amount of time. In the meantime,
        //      it will update "accessToken"
        console.log('refreshToken: ', refreshToken);

        // Literally, it contains my all profile.
        // We will mainly take care of this.
        console.log('profile: ', profile);

        
        console.log('done: ', done);

    })

);



