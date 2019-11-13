import React from "react";
import Button from "@material-ui/core/Button";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import NavBar from "../Layout/navBar";
// import { Calendar } from "@fullcalendar/core";

import "./main.scss";

export default class Ourcalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      meetings: []
    };
  }

  // Fetches the meetings from the database with an API call.
  fetchMeetings() {
    // event.preventDefault();

    fetch("/api/all-meetings")
      .then(res => res.json())
      .then(data => {
        this.setState({ meetings: data });
        console.log(this.state.meetings);
      })
      .catch(console.log);
  }

  //When the fetch has returned the meetings, mount it to the state. This fills in the calendar.
  componentDidMount() {
    this.fetchMeetings();
  }

  render() {
    return (
      <div className="calendarwrap">
        <NavBar></NavBar>
        <h1 className="section-title">Your Meetings</h1>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          contentHeight="auto"
          events={this.state.meetings}
        />
        <br></br>
        <Button
          variant="contained"
          color="primary"
          href="/"
          className="go-back-btn"
        >
          Go Back
        </Button>
      </div>
    );
  }
}
