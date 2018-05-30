if(process.env.NODE_ENV === 'production') {

    // We are in product. Return the product keys here in this file.
    
    console.log('keys: @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    module.exports = require('./prod');
    console.log('process.env.NODE_ENV: production');

} else {

    //We are in development - return the devkey.
    module.exports = require('./dev');
    console.log('process.env.NODE_ENV: development');

}