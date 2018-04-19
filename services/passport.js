console.log('starting passport.js');

const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const mongoose = require('mongoose');

const { googleClientID, googleClientSecret } = require('../config/keys');
const UserID = mongoose.model('users');

passport.serializeUser((user, done) => {

    done(null, user.id);

});

passport.deserializeUser((id, done) => {

    UserID.findById(id).then((user) => {

        done(null, user);

    });

});

passport.use(
    
    new Strategy({

        clientID : googleClientID,
        clientSecret : googleClientSecret,
        callbackURL : '/auth/google/callback',
        proxy : true

    }, async (accessToken, refreshToken, profile, done) => {

        const userGoogleID = await UserID.findOne({ googleID : profile.id });

        if (userGoogleID) return done(null, userGoogleID); 

        const user = await new UserID({ googleID : profile.id }).save();      
        done(null, user);
            
    })

);