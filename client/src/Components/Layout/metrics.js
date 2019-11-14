import React, { Component } from "react";
import NavBar from "../Layout/navBar";
import "./home.css";

class Metrics extends Component {
  state = {
    attendees: [],
    Times: [],
    userSal: [],
    userArr: [],
    meetSal: 0,
    duration: []
  };

  getAttendees() {
    fetch("/api/get-attendees")
      .then(response => response.json())
      .then(data => {
        this.setState({ attendees: data });
        console.log(this.state.attendees);
      })
      .catch(console.log);
  }

  getMeetTimes() {
    fetch("/api/get-meetings")
      .then(response => response.json())
      .then(data => {
        this.setState({ Times: data });
        console.log(this.state.Times);
      })
      .catch(console.log);
  }

  getUserSalaries() {
    fetch("/api/get-salaries")
      .then(response => response.json())
      .then(data => {
        this.setState({ userSal: data });
        console.log(this.state.userSal);
      })
      .catch(console.log);
  }

  componentDidMount() {
    this.getAttendees();
    this.getMeetTimes();
    this.getUserSalaries();
  }

  userSort() {
    for (let i = 0; this.state.attendees.length > i; i++) {
      if (this.state.attendees[i].MeetingId === 5) {
        console.log("User ID: " + this.state.attendees[i].UserId);
        this.state.userArr.push(this.state.attendees[i].UserId);
        console.log("User array: " + this.state.userArr);
      }
    }
  }

  findDuration() {
    for (let j = 0; this.state.Times.length > j; j++) {
      // if (this.state.Times[j] === 2) {
      //   let duration = this.state.Times[j].end - this.state.Times[j].start;
      //   console.log(duration);
      console.log("Meeting start: " + this.state.Times[j].start);
      console.log("Meeting end: " + this.state.Times[j].end);
      // }
    }
  }

  findSalaries() {
    for (let i = 0; this.state.userArr.length > i; i++) {
      for (let j = 0; this.state.userSal.length > j; j++) {
        if (this.state.userArr[i] === this.state.userSal[j].id) {
          let Hrate = this.state.userSal[j].hourlyrate;
          // let MTotal = this.state.meetSal;
          console.log(Hrate);
          // function addition() {
          //   Mtotal + Hrate;
          // }
          // addition();
        }
      }
    }
  }

  quicktest() {
    for (let i = 0; 6 > i; i++) {
      console.log([i]);
    }
  }

  render() {
    return (
      <div>
        <NavBar></NavBar>
        <h1>Metrics related to your Meetings</h1>
        <button
          onClick={
            (this.userSort(this.state.attendees),
            this.findDuration(this.state.Times),
            this.findSalaries())
            // this.quicktest()
          }
        >
          press me!
        </button>
      </div>
    );
  }
}

export default Metrics;
