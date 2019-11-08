
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Components/Layout/home.js";
import ScheduleMeet from "./Components/Layout/schedulemeet.js";
// import ViewMeet from "./Components/Layout/viewmeet.js";
import Ourcalendar from "./Components/Calendar/Calendar.js";
import Metrics from "./Components/Layout/metrics.js";
import Pg404 from "./Components/Layout/Pg404.js";





// import logo from './logo.svg';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.connecToServer = this.connecToServer.bind(this);
  };

  
  connecToServer() {
    fetch("/");
  }
  
  state = {attendees: []};
  componentDidMount() {
    this.connecToServer();
    fetch(`/api/users?company=Phil Tech`)
    .then( res => res.json())
    .then((data) => {
        this.setState({attendees: data})
    })
    .catch(console.log)
  }
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/schedule-meet" component={ScheduleMeet} />
        <Route exact path="/view-meet" component={Ourcalendar} />
        <Route exact path="/metrics" component={Metrics} />
        <Route exact path="/404" component={Pg404} />
      </Router>
    );
  }
}

export default App;
