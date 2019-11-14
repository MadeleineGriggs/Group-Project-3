import React, { Component } from "react";
import NavBar from "../Layout/navBar";
import "./home.css";

class Metrics extends Component {
  state = {
    attendees: [],
    meetTimes: [],
    userSal: [],
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
        this.setState({ meetTimes: data });
        console.log(this.state.meetTimes);
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
      }
    }
  }

  findDuration() {
    for (let i = 0; this.state.meetTimes.length > i; i++) {
      if (this.state.meetTimes[i] === 2) {
        // let duration =
        //   this.state.meetTimes[i].end - this.state.meetTimes[i].start;
        console.log("Meeting start: " + this.state.meetTimes[i].start);
        console.log("Meeting end: " + this.state.meetTimes[i].end);
      }
    }
  }

  render() {
    return (
      <div>
        <NavBar></NavBar>
        <h1>Metrics related to your Meetings</h1>
        <button
          onClick={
            this.userSort(this.state.attendees)
            // this.findDuration(this.state.meetTimes)
          }
        >
          press me!
        </button>
      </div>
    );
  }
}

export default Metrics;
