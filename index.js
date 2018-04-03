console.log('starting index.js of "server" part');

// It is a common js module.
const express = require('express');

// ES 15 module
//import express from 'express';

// Call "express()" returns the "running express app"
//       assigned to "app" variable.
// The reason it is not a component of express,
//      express returns a single app, "running express app" 
// the running express app managing and control the input from the browser,
//      then hands off the input to the routHandler.

// Official Definition : Express App to register this
//      route handler with
const app = express();

app.get('/', (req, res) => {

    res.send({ bye : 'Sheridan' });

});

const PORT  = process.env.PORT || 5000;
app.listen(PORT);

