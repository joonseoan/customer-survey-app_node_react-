console.log('starting passport.js');

const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const mongoose = require('mongoose');


const { googleClientID, googleClientSecret } = require('../config/keys');

// 'require('../models/user) should not be used 
//      because different mongooses with different schema can be used
//      in big applications or development environment.
// In order to pull in the specific mongoose, 
//      it would be better use mongoose's model name, 'users'
// "UserID" is an instance to access the documents of 'user' model.
const UserID = mongoose.model('users');

// ============================ Brwoser Session setup by taking advantage of user.id===============================
// "user" : user model
//      It is the usser model the came to be stored in mongoDB by utilizing
//      "UserID.findOne({ googleID : profile.id }).then((userGoogleID) => {"
//      down below. More speicifically, "userGoogleID and user" below.
// This user iformation (in other words, "profile.id") is going to attacch to Cookies 
//      by using "serilizeUser" function.

// done : notify thw work is done(callback)
passport.serializeUser((user, done) => {

    // "user.id" is "document's id" that exists together with the targeted "profile.id"
    // seriizeUser function utilizes "_id" of the collection
    //      instead of profile.id which is exposed 
    //      during the query.

    // "user.id" is shortcut "_id", by the way.

    // Also, the user for real is able to different profile id for different apps.
    // document id is able to unify these different profile ids.

    // Just remember!!!!
    // Since the user logged in for the first time and
    //      after the server receives and saves "profile.id",
    //      the auth flow does not use "profile.id". It uses "document id"
    done(null, user.id);

});

// ============================ Graning Service permission by taking out info from Session ============================

// "id" is the document's "id property" 
// Just take out the id property out of the document in Cookies!!.
passport.deserializeUser((id, done) => {

    UserID.findById(id).then((user) => {

        done(null, user);

    });

});

/**  Making Cookies in "index.js"**************8
 
    npm install --save cookie-session

*/

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

        //------------------------------------------------------
        // Down below here data sent from Google
        //  then stored in mongoDB by utilizing mongoose.
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

        // Bear in mind that it has "userID"
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
          * only with instance itself like "UserID.find()",
          * not with object itself "new UserID().find() === (x)"
          * 
          */ 

        // In order to overlapped "googleID"
        // Remember!!!!!!!!!!!
        //  When we reach out and query the database, we must use 
        //      asynchronous function that is called "promise" to 
        //      get an returned action!!!!!!!!!!!!!!! 

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
                    // It is uses instead of send()
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
 * 2. google permission with the server code and user acccount=> server receives code = google
 * 3. google displacing code with user profile => server storing profile id in mongoDB
 * 4. Afteer the first log in above, (fron now on then, it does communicate with google in the same way.) the user access the server again with the same email and profle => the server find the profileId from Mongodb
 *    Wheneveer the user tries to log in, it receives the user profile.id from Google.
 * 5.
 */



