import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Components/Layout/home.js';

// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {    
    super(props);    
    this.state = {}
    this.connecToServer = this.connecToServer.bind(this);
  }

  connecToServer() {    
    fetch('/');  
  }

  componentDidMount() {    
    this.connecToServer();  
  }
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} /> 
      </Router>
    );
  }
}

export default App;
