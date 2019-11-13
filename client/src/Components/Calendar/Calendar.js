import React from "react";

import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";

import Moment from 'react-moment';


import NavBar from "../Layout/navBar.js";
import "./main.scss";
import "../Layout/home.css";


export default class Ourcalendar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      meetings: [],
      eventModalOpen: false,
      modalTitle: "",
      modalId: "",
      modalStart: "",
      modalEnd: "",
      modalDesc: ""
    }
  }

  // Fetches the meetings from the database with an API call.
  fetchMeetings() {
    // event.preventDefault();

    fetch("/api/all-meetings")
    .then( res => res.json())
    .then((data) => {
      
        this.setState({meetings: data})
        console.log(this.state.meetings)
    })
    .catch(console.log)
  };

  //When the fetch has returned the meetings, mount it to the state. This fills in the calendar.
  componentDidMount() {
    this.fetchMeetings();
  }
  

  toggleEventModal(event) {
    this.setState({
      eventModalOpen: !this.state.eventModalOpen
    })
  };

  handleEventClick = ({ event, el }) => {
console.log(event.id)
    const meetingID = {
      meetingId: event.id
    }
    this.toggleEventModal(event);
    console.log(meetingID)
    fetch("/api/modal-meeting", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meetingID)
    }).then( res => res.json())
    .then((data) => {
      console.log( "Event info:" + JSON.stringify(data))
      console.log("Event Title" + JSON.stringify(data.title))

      this.setState({
        modalTitle: JSON.stringify(data.title).replace(/"/g,""),
        modalId: JSON.stringify(data.id),
        modalStart: JSON.stringify(data.start).replace(/"/g,""),
        modalEnd: JSON.stringify(data.end).replace(/"/g,""),
        modalDesc: JSON.stringify(data.description).replace(/"/g,""),
      })
      console.log(this.state.modalTitle)

     });

  };

  render() {
    return (
      <>
<NavBar>
</NavBar>
      <div className="calendarwrap">

        <Modal
          open={this.state.eventModalOpen}
          onClose={(e) => this.toggleEventModal(e)}
        >
          <div className="meeting-modal-container">
            <h2>
            {this.state.modalTitle}
            </h2>
            <h5>
              Start: <Moment format="LLL">{this.state.modalStart}</Moment>
            </h5>
            <h5>
              End: <Moment format="LLL">{this.state.modalEnd}</Moment>
            </h5>
            <h3>
              Description
            </h3>
            <h5>
            {this.state.modalDesc}
            </h5>
            
          <Button onClick={(e) => this.toggleEventModal(e)}>Close</Button>
          </div>
        </Modal>

        {/* <div>{this.state.meetings.map((item, key) =>
            <div item={item.date} key={item.id}>{item.title}, {item.date}</div>
        )}</div> */}
        <h1 className="section-title">View Your Meetings</h1>
        <FullCalendar 
        defaultView="dayGridMonth" 
        plugins={[interaction, dayGridPlugin]} 
        contentHeight="auto"   
        selectable={true}
        events={this.state.meetings}
        eventRender={this.handleEventRender}
        eventClick={this.handleEventClick}/>
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
      </>
    );
  }
}
