// "ID"must be uppercase!!!

if(process.env.NODE_ENV === 'production') {

    // We are in product. Return the product keys here in this file.
    module.exports = require('./prod');

} else {

    //We are in development - return the devkey.
    module.exports = require('./dev');

}