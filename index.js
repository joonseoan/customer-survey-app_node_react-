const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
// const cors = require('cors');

const passport = require('passport');

const bodyParser = require('body-parser');

// import key
const { mongoURI, cookieKey } = require('./config/keys');


// app.use(cors());

require('./models/user'); 

// Execute mongoose model!!!
// It has nothing but modules inherited.
require('./models/survey');

require('./services/passport');

// connect to mLab
mongoose.Promise = global.Promise
mongoose.connect(mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(cookieSession({

    // 30 days : 30 days, 24 hours 60 min, 60 sec, 100 msec
    maxAge : 30 * 24 * 60 * 60 * 1000, 
    keys: [ cookieKey ]

}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// setup by heroku
if (process.env.NODE_ENV === 'production') {

    // If the server can't find it, return "index.html." 
    app.use(express.static('client/build'));

    // "*" : express try to find all files, but can't find the file the client is requesting
    // Then responde with index.html.
    const path = require('path');
    app.get('*', (req, res) => {
    
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    
    });

}

const PORT = process.env.PORT || 5000;
console.log(`starting on ${PORT}`);
app.listen(PORT);