import React from "react";
import Button from "@material-ui/core/Button";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import { Calendar } from "@fullcalendar/core";

import "./main.scss";

export default class Ourcalendar extends React.Component {
  render() {
    return (
      <div className="calendarwrap">
        <h1 className="section-title">View Your Meetings</h1>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          contentHeight="auto"
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
