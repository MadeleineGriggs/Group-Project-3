import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Components/Layout/home.js';
import ScheduleMeet from './Components/Layout/schedulemeet.js';
import ViewMeet from './Components/Layout/viewmeet.js';
import Metrics from './Components/Layout/metrics.js';

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
        <Route exact path="/schedule-meet" component={ScheduleMeet} /> 
        <Route exact path="/view-meet" component={ViewMeet} /> 
        <Route exact path="/metrics" component={Metrics} /> 
      </Router>
    );
  }
}

export default App;
