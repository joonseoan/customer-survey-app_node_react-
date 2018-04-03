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

    res.send({ hi : 'there' });

});

// ----------------------Configuration for deploying Heroku -----------------------------

// 1) Dynamic Port Deployment for Heroku
//      Whenever Heroku runs the application,
//          it injects "env" variable.
//      "env" is running underline of node
//          then it passes us to runtime configuration
//          for the application's execution.
//      Heroku decides and passes on the port after
//          the configuration is done and just before
//          the application starts its execution.
// It is a format of the production "env"
// const PORT = process.env.PORT;

// Development environment,
//      We use it down below.
// That is, it it is not the production environment,
//      use "5000".
const PORT  = process.env.PORT || 5000;
app.listen(PORT);

// 2) Specify Node Environment
//  Put the version into package.json, 
//      at the below of "main" : "index.js"
//  node -v : 8.9.4
//  npm -v : 5.6.0
//  "engines" : {
//      "node" : "8.9.4",
//      "npm" : "5.6.0"
//  },

// 3) Specify start script
//      Tell Heroku how it should start up the server.
//    Find "scripts" : {} in package.json.
//    Delete "test" : ~~~~~
//    Then put "start" : "node index.js" at the spot.

// 4) Make .gitignore
//      Therefore, Heroku does not find dependency on
//      "node_modules/" that includes many unnecessary
//      and duplicated modules with package.json.
//      Heroku should refer to package.json for the dependancy.


// ----------------- Herok Deployment CheckList ------------------

// 1) Heroku Account => Done.

// 2) Commit our codebase to git
    // git init
    // git add .
    // git commit -m "initial commit"
    // 