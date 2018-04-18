import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>


        {/*
        [Stumbling Bock]
        
         When we use "relatvie" path like "auth/google", it automatically put the current domain
              which is localhost:3000, not 5000
         So in order to make the browser clearly get the domain of the relative path,
              we must add the domain address.      
        
          However, it is only only for the development environment.
          We should use the relative path for devlopment and production enviroment
              and all address string must be flipped over in terms of the environments.
        
          Please, go to setup file or package.json of "client"
        
        
        <a href = "http://localhost:5000/auth/google">Sign in with Google Auth</a>
        */}

        <a href = "/auth/google">Sign in with Google Auth</a>
      </div>
    );
  }
}

export default App;
