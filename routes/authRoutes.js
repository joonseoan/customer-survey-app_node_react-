console.log('starting authRoutes.js');

const passport = require('passport');

module.exports = (app) => {

    app.get('/auth/google', passport.authenticate('google', {

        scope : ['profile', 'email']
    
    }));

    // It is same thing as middleware of authenticate and (req, res)
    //      node js.
    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {

        res.redirect('/survey');

    });

    // Logout
    app.get('/api/logout', (req, res) => {

        // "logout()": tells the cookieSession to detach 
        //      passport's serializeUser/deserializeUsser functions  
        //      and to kill the user auth state stored in the cookieSession.
        req.logout();

        // acknowlegement that "you just logged out."
        // => on the browser, it shows the empty because
        //      the user logged out! and cookieSession is now empty.
        
        // "reg.user": "user" document requested by the current user to be detached.
        //
        // res.send(req.user);

        // To redired to main page instead to show req.user
        res.redirect('/');

    
    });

    // Need another route handler to give req.user state once auth is done and starts working.
    // From this directory, the user is able to mange the app.
    app.get('/api/currentUser', (req, res) => {

        // the user info is incomming from cookieSession containing the user document
        //      through the steps of serializeUser/deserializeUser or first-time user's signup 
        // => on the brower, it shows user info
        
        /**
         * {
             "_id": "5ace7aa0955a6f6468a04b0f",
                "googleID": "106062814941201787643",
            "__v": 0
            }
         */
        
        // ultimately takes the user document out of the cookies or database
        //      sends it to the user, telling "You are just logged in!"
        // The reason that "req.user" is required is because google sends "res.user" not "req.body"
        // Like this.
        /**
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

        console.log('req.user: ', req.user);
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

// Route Handler listens to the user access to the defined route "/auth/google".
//      => It is a kind of the first user request.
// Then it will try to send the info including "clientID" and "clientSecret"
//      for the configuration.

// We will not use a customized callback because we are using "passport" MW.
// The " passport~~~ " below is to process "send" authenticate response info to
//      google server, not back to the user.

// 1) 'google', the first argument defines that the strategy defined above
//      for the google strategis other than any other app.
// Therefore 'google' stands for containing the information about
//      Google's Strategy object. 

// 2) Google defines different properties for the auth.
//    'scope' defines the properties we want? to use for auth
//      ,among many different properties.
// In this app, we will use "profile" and "email" only.

// To auth after this app server receives the code from Google.
// Then after Google receives "code", it will exchange the code 
//      with the user profile. 
// Whever Google exchange "the code" with the user profile,
//      it produces "accessToken" which is generated by "callback"
//      of "Strategy" above.   
// app.get('/auth/google/callback', passport.authenticate('google'))