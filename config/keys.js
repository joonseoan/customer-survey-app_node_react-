// "ID"must be uppercase!!!

/*
const googleClientID = '351399471671-5hc1bhvbt3955volvo1kctvo8bv1omba.apps.googleusercontent.com';
const googleClientSecret = '-Mjpj90mAvhC9ls-M9DRqtFU';
const mongoURI = 'mongodb://joon:1111@ds139929.mlab.com:39929/customer-survey'
const cookieKey = 'tyjklfaofldfagh';
module.exports = { googleClientID, googleClientSecret, mongoURI, cookieKey }; 
*/

//===============================================

// keys.js - figure out what set of credential to return

if(process.env.NODE_ENV === 'production') {

    // We are in product. Return the product keys here in this file.
    module.exports = require('./prod');
    console.log(require('./prod'));

} else {

    //We are in development - return the devkey.
    module.exports = require('./dev');
    console.log(require('./dev'));

}