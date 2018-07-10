// Returns "user" doc to all route handlers!!!!!! 
const passport = require('passport');

module.exports = app => {

    // passport.authenticate => redirects to google's auth 
    app.get('/auth/google', passport.authenticate('google', {

        // then sends profile and email to google auth
        scope : [ 'profile', 'email' ]
    
    }));

    // It is same thing as middleware of authenticate and (req, res)
    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {

        res.redirect('/surveys');

    
    });

    // Logout
    app.get('/api/logout', (req, res) => {

        req.logout();

        res.redirect('/');

    
    });

    // Need another route handler to give "req.user" state once auth is done and starts working.
    // From this directory, the user is able to mange the app.
    app.get('/api/current_user', (req, res) => {
    
       res.send(req.user);

   });

}
