import React from "react";
import Button from "@material-ui/core/Button";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import { Calendar } from "@fullcalendar/core";

import "./main.scss";


export default class Ourcalendar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      meetings: []
    }
  }
  fetchMeetings(event) {
    event.preventDefault();

    fetch("/api/all-meetings")
    .then( res => res.json())
    .then((data) => {
      console.log(data)
        this.setState({meetings: data})
    })
    .catch(console.log)
  };
  

  render() {
    return (
      <div className="calendarwrap">
          <Button variant="contained" color="primary" className="fetch-meeting-btn" onClick={(e) => this.fetchMeetings(e)}>
            Populate Calendar - Check Console Log.
          </Button>
        <h1 className="section-title">View Your Meetings</h1>
        <FullCalendar defaultView="dayGridMonth" plugins={[dayGridPlugin]} contentHeight="auto"   
        events={[
    { title: 'event 1', date: '2019-07-01' },
    { title: 'event 2', date: '2019-07-02' }
  ]}/>
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
