console.log('starting index.js of "server" part');

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');

// In order to maintain the session,
//  by telling passport the auth state.  
const passport = require('passport');


// import key
const { mongoURI, cookieKey } = require('./config/keys');

// connect to mLab
mongoose.connect(mongoURI);


//************************************************************************ */
// import "Schema" and "model" of mongoogse
// *************************
// Bear in mind that "Schema and model" must ren before
//      the its instance runs, forn instance it must above
//      "require('./services/passport');" which is using
//      the intance of Schema and model class. 
require('./models/user');


// 1)
// const passportImported = require('./services/passport');

// 2)
// because we do not assign the "passport" component 
//      to any other functions and variables
// "passport" collaborately works together in background
require('./services/passport');

const app = express();

// Cookie Setup for express route
// It is a preset format.

/***********************************************************************************************************
 * 
 *      // Relationship
 *      passport - (app = express()) - cookieSession
 *          - app tells passport that combine passport's serializeUser/deserializeUser with cookieSession
 *          - Then, when passport initizlies the auth process, it uses cookieSession.
 *          - Then, it returns requesting user info came out of the DB by using serializeUser/deserializeUser
 *                  stored in Session 
 * 
 ***********************************************************************************************************/

app.use(cookieSession({

    maxAge : 30 * 24 * 60 * 60 * 100,

    // Unique key to be encripted to identify the user
    // It is an array because different keys are listed
    //      then we can randomly choose a key for the security reason.
    keys: [ cookieKey ]

})

    // 30 days : 30 days, 24 hours 60 min, 60 sec, 100 msec
   
);

// Then, we need to tell passport
//      it shoud use cookie session for the auth.
// The two lines below are kind of a single unit.
//      When we use passport auth process middleware to "log in" (not "set up")
//      initialize "passport" and make it use "session"!!!!    
app.use(passport.initialize());
app.use(passport.session());

//1) 
// authRoutes(app);

// ********************************************************************
// './routes/authRoutes' : a function defined in "authRoutes"
// "app" is an argument in the fuction defined in "authRoutes"
require('./routes/authRoutes')(app);
// **********************************************************************8 */

const PORT = process.env.PORT || 5000;
app.listen(PORT);