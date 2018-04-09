console.log('starting index.js of "server" part');

const express = require('express');
const mongoose = require('mongoose');


// 1)
// const passportImported = require('./services/passport');

// 2)
// because we do not assign the "passport" component 
//      to any other functions and variables
// "passport" collaborately works together in background
require('./services/passport');

// import key
const { mongoURI } = require('./config/keys');

// connect to mLab
mongoose.connect(mongoURI);

// import "Schema" and "model" of mongoogse
require('./models/user');

const app = express();

//1) 
// authRoutes(app);

// *******
// './routes/authRoutes' : a function defined in "authRoutes"
// "app" is an argument in the fuction defined in "authRoutes"
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);


