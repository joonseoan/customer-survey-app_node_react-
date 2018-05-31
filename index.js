const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');

// In order to maintain the session,
//      by telling "passport" of the auth state
//      that the passport do not need to get the signup steps again
//      the first time user took.
const passport = require('passport');

const bodyParser = require('body-parser');

// import key
const { mongoURI, cookieKey } = require('./config/keys');

//*************************************************************************/
// import "Schema" and "model" of mongoogse
// ************************************************************************

// Bear in mind that "Schema and model" class must run before
//      its instance runs, for instance it must run 
//      before the instance, "require('./services/passport');" 
require('./models/user'); 

// 1)
// const passportImported = require('./services/passport');

// 2)
// because we do not assign the "passport" component 
//      to any other functions and variables
// "passport" collaborately works together in background

// ********* Distribute req.user to any route handlers of express server
require('./services/passport');

// connect to mLab
mongoose.Promise = global.Promise
mongoose.connect(mongoURI);


const app = express();

/**************************************** cookieSession Setup for express route*******************************************************************
 * 
 *      // Relationship
 *      app = express()) - cookieSession - passport
 * 
 *          - The user accesses the express's directory.
 * 
 *          - "cookieSession" tells "passport", "please" identify profile.id based "_id" 
 *               and decide whether or not "passport" will work on 
 *               its serializeUser/deserializeUser together with cookieSession
 *        
 *          - Simultanously, cookieSession tries to pull out the user info out of "Cookie", a storage
 *          
 *          - Then, passport will try to find the document, an object containing "profile.id"
 *               to get document's "_id" of "req.session" to grant "req.user" of the current user.
 *               
 *              1) If the profile.id is available in DB, it runs serializeUser/desrializeUser
 *                  to get the user info and its user.id and then grant the user app management.
 *              
 *              2) If the profile.id is not available, it passes the s/deserializeUser functions
 *                  and then makes the app server and google run "permission / code exchange process"
 *                  to get profile.id and store it in DB.
 *          
 *          - Then, after s/deserializeUser function,
 *              passport deliver "user info" which is "req.user: out of the DB, to "cookieSession". 
 *          
 *          - Finally, "cookieSession" sends "req.user" back to the app server and the user
 *             and also simutaneously grants the user authority to manage apps withouth additional login steps.
 * 
 ***********************************************************************************************************/
/**  Making Cookies in "index.js"**************8
 
    npm install --save cookie-session

*/

// When using "POST", the server will not read "req.body"
// Therefore, we need "body-parser" then change it to json format. 
app.use(bodyParser.json());

app.use(cookieSession({

    // 30 days : 30 days, 24 hours 60 min, 60 sec, 100 msec
    maxAge : 30 * 24 * 60 * 60 * 100,
 
    // A unique key to be encripted to identify the user
    // It is an array because different keys are listed
    //      then we can randomly choose a key for the security reason.
    keys: [ cookieKey ]

}));

// The two lines below are kind of a single unified unit to execute steps above.

// Then, app tells passport
//      we shoud check that cookieSession still maintains the user info.

// To do so, cookieSession in express "app" makes the passport implement s/deserializeUser functions run first
//      and then check up the session status that the user info is available,
//      when passport initialize authentication work.

// If the user info based on profile.id is available,
//    it puts the user info object into session 
//    when the user accesses "/api/currentUser" for login
 
// Also, it stops passport working on s/deserialize functions
//    if the user info is not available and 
//    let it jump to the steps of the first-time user
//    

// session will finish when the user logout
// ***** generate "user" requested by the client
app.use(passport.initialize());
app.use(passport.session());

//1) 
// authRoutes(app);
// ********************************************************************
//
//  './routes/authRoutes' : a function defined in "authRoutes"
//  "app" is an argument in the fuction defined in "authRoutes"
//
// **********************************************************************8 */
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// setup by heroku
if (process.env.NODE_ENV === 'production') {

    // Express will serve up production asset
    // like our main.js file, or main.css file.

    // client/build is a directory whe wa are done for "npm run build".
    
    // Any "GET" request comes in from the client,
    //    get "client/build" and is sub directory,
    //    and then return the file matched with the request.

    // If the server can't find it, return "index.html." 
    app.use(express.static('client/build'));

    // Express will serve up index.html file.
    // if it does not recognize the route of the client
    
    // "*" : express try to find all files, but can't find the file the client is requesting
    // Then responde with index.html.
    app.get('*', (req, res) => {
    
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    
    });
}

const PORT = process.env.PORT || 5000;
//console.log(`starting on ${PORT}`);
app.listen(PORT);

// Just for studying....
 /*********************************************************************************************************
  *     CookieSession (4KB) => mainly for one single user document based on a selected id reference
  *            out of a bunch of info stored in Cookie (kind of many to one)   
  *             => can be used for one single app component like auth     
  *     VS.
  *     
  *     Express Session (larger storage space in terms of app or server) => mainly for many different document
  *            or objects based on a single reference id (kinds of one to many)
  *             => can be used ofr multiple app component like shopping cart or like and so on...
  *********************************************************************************************************/