
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { ThemeProvider } from '@material-ui/styles';
import theme from './theme'

import Home from "./Components/Layout/home.js";
import ScheduleMeet from "./Components/Layout/schedulemeet.js";
import Ourcalendar from "./Components/Calendar/Calendar.js";
import Metrics from "./Components/Layout/metrics.js";
import Pg404 from "./Components/Layout/Pg404.js";

// import logo from './logo.svg';
import "./App.css";
import "./Calendar.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.connecToServer = this.connecToServer.bind(this);
  }


  connecToServer() {
    fetch("/");
  }

  componentDidMount() {
    this.connecToServer();
  }
  render() {
    return (
      <ThemeProvider theme={theme}>

        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/schedule-meet" component={ScheduleMeet} />
          <Route exact path="/view-meet" component={Ourcalendar} />
          <Route exact path="/metrics" component={Metrics} />
          <Route exact path="/404" component={Pg404} />
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
