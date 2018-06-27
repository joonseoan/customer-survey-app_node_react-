// Returns "user" doc to all route handlers!!!!!! 
// Therefore, ******all route handler can use "req.user" withouth passport m/w arg.
const passport = require('passport');

// just bear in mind that again 
//      that "app" is an object (reference vavriable).
module.exports = app => {

    // passport.authenticate => redirects to google's auth 
    app.get('/auth/google', passport.authenticate('google', {

        // then sends profile and email to google auth
        scope : [ 'profile', 'email' ]
    
    }));

    // It is same thing as middleware of authenticate and (req, res)
    //      node js.
    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {

        // passport middleware returns "req.user" that is from database!!!!
        //      because the middleware contains "find()" to indentify ???
        //console.log('req.user from passport middleware: ', req.user);

        //console.log('req.user(callback): ', req.user);
        // res.send(req.user). // => get back to the user with user info (_id, googleID)
        res.setHeader('content-type', 'text/html'); 
        return res.redirect('/surveys');

    });

    // Logout
    app.get('/api/logout', (req, res) => {

        // "logout()": tells the cookieSession to detach 
        //      passport's serializeUser/deserializeUsser functions  
        //      and to kill the user auth state, google ID and _id stored in the cookieSession.
        //console.log('req.user(logout)', req.user);
        req.logout();



        // acknowlegement that "you just logged out."
        // => on the browser, it shows the empty because
        //      the user logged out! and cookieSession including googleID and _id is now empty.
        
        // "reg.user": "user" document requested by the current user to be detached.
        //
        // res.send(req.user);

        // To redired to main page instead to show req.user
        res.redirect('/');

    
    });

    // Need another route handler to give "req.user" state once auth is done and starts working.
    // From this directory, the user is able to mange the app.
    app.get('/api/current_user', (req, res) => {

        // the user info is incomming to cookieSession, containing the user document
        //      through the steps of serializeUser/deserializeUser or first-time user's signup 
        // => on the brower, it shows user info
        
        
         /* {
             "_id": "5ace7aa0955a6f6468a04b0f",
                "googleID": "106062814941201787643",
            "__v": 0
            }
         */
        
        // ultimately this url takes the user document out of the cookies or database
        //      sends the result to the user, telling "You are just logged in!" or "A certain error occurred!!"
        

        // req.user is created by passport.serializeUser()/deserializeUser()
        /*
        
            passport.serializeUser((user, done) => {

                done(null, user.id);

            });

            passport.deserializeUser((id, done) => {

                UserID.findById(id).then((user) => {

                    done(null, user);

                });

            });
            
        */ 
        
       res.send(req.user);

       // console.log('req.user: ', req.user);
       // console.log('req.body: ', req.body);
       // res.send(req.body);
       
       /**
        [req.session]

        * {
        
            "passport": {
         
                "user": "5ace7aa0955a6f6468a04b0f"
         
                }
         
           }
       */
        // res.send(req.session);

   });

}

// Route Handler listens to the user access first in "/api/currentUser".
//   => It should be a kind of the first user request.

// If the user does not have session value of _id and googleID, then it redirects the user to
//      "auth/google"

// Then it will try to send the info including "clientID" and "clientSecret"
//      for the configuration.

// We will not use a customized callback middleware because we are using pre-builtin "passport" MW.
// The " passport~~~ " below is to process "send" authenticate response info to
//      google server, not back to the user.

// 1) 'google', the first argument defines that the strategy defined above
//      for the google strategies other than any other app.

   // Therefore 'google' stands for containing the information about
   //      Google's Strategy object. 

// 2) Google defines different properties for the auth.
//    'scope' defines the properties we want? to use for auth
//      ,among many different properties.
// In this app, we will use "profile" and "email" only.

// To auth after this app server receives the code from Google.
// Then after Google receives "code", it will exchange the code 
//      with the user profile. 
// Whenever Google exchanges "the code" with the user profile,
//      it produces "accessToken" which is generated by "callback"
//      of "Strategy" above.   
// app.get('/auth/google/callback', passport.authenticate('google'))