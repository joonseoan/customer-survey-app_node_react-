console.log('starting passport.js');

const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const mongoose = require('mongoose');


const { googleClientID, googleClientSecret } = require('../config/keys');

// 'require('../models/user) should not be used 
//      because different mongooses with different schema can be used
//      in big applications or development environment.
// In order to take the specific mongoose in, 
//      it would be better use mongoose's model name, 'users'.
// "UserID" is an instance to access the documents of 'user' model.
const UserID = mongoose.model('users');

// ============================ "user info" setup in DB by taking advantage of user.id===============================
// "user" : "users" model
//      It is the 'users' model stored in mongoDB by utilizing
//          "UserID.findOne({ googleID : profile.id }).then((userGoogleID) => {"
//          down below. More speicifically, "userGoogleID and user" below.
// This user information (in other words, "profile.id") is 
//      going to immediately attacch to cookieSession 
//      by using "serilizeUser" function.

// done : notify the "serializeUser" work is done(callback).
// "serializeUser" is a kind of work that gets the DB involed then
//       pulls out the user info.
passport.serializeUser((user, done) => {

    // "user.id" is "document's id" that exists together with the targeted "profile.id"
    // "seriizeUser" function utilizes "_id" of a document,
    //      instead of profile.id which is exposed 
    //      during the query.

    // "user.id" is shortcut "_id", by the way.

    // Also, the user for real is able to differentiate its profile id for different apps.
    // "document id" is able to represent these different profile ids.

    // Just remember!!!!
    // As the user logged in for the first time and
    //      after the server received and saved "profile.id",
    //      the auth flow does not use "profile.id". It uses "document id"
    // **** "profile.id" is used just to get the user info document of MongoDB then
    //      to attach "user" document to this serializeUser method.

    // If "user" is not available, the next step is the signup process.
    // It jumps up the "deserializeUser" method.
    done(null, user.id);

});

// ============================ Granting Service Authorization by taking info from Session ============================

// "id" is the document's "id property" 
// Just take out the id property out of "serializeUser" function!!.
// Then, grant access right to manage app service 
//      after it identifies "profile.id" with Google 
//      before it starts "serializeUser" method above. 
passport.deserializeUser((id, done) => {

    UserID.findById(id).then((user) => {

        done(null, user);

    });

});

/**  Making Cookies in "index.js"**************8
 
    npm install --save cookie-session

*/

// --------------- The codes down below might not be use when it uses serializeUser/desrialzeUser with "cookieSession"---------------------------

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
// Then, Google will send them back with some (API) info for the auth process.
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
        //      and "code" at this app server, after it listens to and investigates
        //      the request from the user and then this app server
        
        
        // It is a relative path.
        // When we use the localhost://5000,
        //      Google Strategy is able to automatically recognize
        //      the correct path.
        // However, when we use the server, google Stragegy
        //      is not able to correctly understand the domain proxy url.
        // For instance,
        //      heroku's url for redirection is "https" ~/auth/google/callback.
        //      However, because google Strategy matches that redirect url with this callback url,
        //      it can be confused with the "http" because the proxy url is not trusted from google Strategy.
        
        // 1) Solution one :Specify two full urls for both the heroku server and the localhost.
        // Also, add some algoriths to choose one of both in terms of the environments
        //      "development" and "production".
        callbackURL : '/auth/google/callback',
        
        // 2) It is a solution two. 
        // Make root heroku directory which is a "proxy" address trustful. 
        proxy : true

    }, (accessToken, refreshToken, profile, done) => {

        //------------------------------------------------------
        // Down below here are data sent from Google
        //
        //      then can be stored in mongoDB by utilizing mongoose.
        //------------------------------------------------------

        // accessToken: it is a kind of permission key of admin
        //      of the account. The user is able to delete or modify
        //      the account and etc.
        // console.log('accessToken: ', accessToken);

        // refreshToken: it allows us to refresh "accessToken"
        // It is expired at the certain amount of time. In the meantime,
        //      it will update "accessToken"
        // console.log('refreshToken: ', refreshToken);

        
        // Literally, "profile" contains my all profile info.
        // We will mainly take care of this.
        // console.log('profile: ', profile);

        // Bear in mind that it has "userID".
        // The userID never and ever changes.
        // For these reasons, mongoDB should be 
        //      connected over here to store "userID"
        // "googleID" is defined in model
        // "save()": it saved "profile.id" into database
        
        /** Test myself */

        //1) 
         // const userid = new UserID({ googleID : profile.id })
         // userid.save();
         
         //2)
         // new UserID({ googleID : profile.id }).save();

         /***************************
          * Pleae, bear in mind that find, delete, update....methods are used
          *     only with instance reference, itself like "UserID.find()",
          *     not with object itself "new UserID().find() ===> (x)"
          * 
          */ 

        // In order to avoid making more than a "googleID" per user

        /*3) 
        UserID.findOne({ googleID : profile.id })
            .then((userGoogleID) => {

            if(!userGoogleID) new UserID({ googleID : profile.id }).save();

        });*/

        // Actually, it could be a standard format
        // UserID.findeOne().then((arg) => {

            // with "express()"
                //  if (!arg) return res.send();

                //  res.send();

            // without "express" or only with mongoose
                //done(err || null, arg);

        // });

        //4)
        UserID.findOne({ googleID : profile.id }).then((userGoogleID) => {

                if (userGoogleID) {

                    // muse use "done()" to finish ansynchronous function,
                    //   (userGoogleID) => {}
                    // It is used instead of send()
                    done(null, userGoogleID); 

                } else { 

                    new UserID({ googleID : profile.id })
                        .save()

                        // It is used to generate callback about save();
                        .then( (user) => done(null, user)); 

                }

            });
        
        // console.log('done: ', done);

    })

);

/**
 * 1. the user with account => server deliver them => google
 * 2. google permission with the server code and user acccount=> server receives code => google
 * 3. google displacing code with user profile => server storing profile id in mongoDB
 * 4. Afteer the first log in above, (from this point, it does communicate with google in the same way.) the user access the server again with the same email and profle => the server find the profileId from Mongodb
 *    Wheneveer the user tries to log in, it receives the user profile.id from Google.
 * 5.
 */



