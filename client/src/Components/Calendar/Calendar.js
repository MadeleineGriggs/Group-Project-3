import React from "react";

import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import Grid from "@material-ui/core/Grid";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";

import Moment from 'react-moment';
import moment from 'moment';


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
      modalDesc: "",
      attendees: [],
      userId: "",
      meetingTotal: "",
      meetingDuration: ""
    }
  }

  fetchYourMeetings() {
    fetch("/api/your-meetings")
      .then( res => res.json())
      .then((data) => {
        for (var i = 0, len = data.length; i < len; i++) {
          const MeetingObj = {
            MeetingId: data[i].MeetingId
          };
          //Fetch information from the user's table based on the user id retrieved earlier.
          fetch("/api/your-meetings/single", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(MeetingObj)
          })
            .then( res => res.json())
            .then((data) => {
              //Make each user into an object, then spread into attendees state.
              const individualMeeting = {
                id: data.id,
                title: data.title,
                date: data.date,
                start: data.start,
                end: data.end,
                description: data.description
              }
              this.setState({
                meetings: [...this.state.meetings, individualMeeting]
              })
            });
        }
      })
      .catch(console.log)
  };

  //When the fetch has returned the meetings, mount it to the state. This fills in the calendar.
  componentDidMount() {
    this.fetchYourMeetings();
  }
  

  toggleEventModal(event) {
    //Clear out the modal window when it gets closed.
    if(this.state.eventModalOpen) {
      this.setState({
        attendees: [],
        modalTitle: "",
        modalId: "",
        modalStart: "",
        modalEnd: "",
        modalDesc: "",
        meetingTotal: "",
        meetingDuration: ""
      })
    }
    //Toggles the event modal open and closed.
    this.setState({
      eventModalOpen: !this.state.eventModalOpen
    })
  };

  checkTotal() {

    var total = 0;
    for (var i = 0, len = this.state.attendees.length; i < len; i++) {
      total += this.state.attendees[i].hourlyRate
      console.log(total)
    }
    var finalTotal = (total / 60);
    console.log(finalTotal);

    var start = moment(this.state.modalStart);
    var end = moment(this.state.modalEnd);
    console.log(start)
    console.log(end)
    var totalTime = moment.duration(end.diff(start)).asMinutes()
    var meetingCost = ((totalTime * finalTotal)).toFixed(2)
    console.log(meetingCost)
    this.setState({
      meetingTotal: meetingCost,
      meetingDuration: totalTime
    })
  }

  populateUsersModal(meetingID) {
    //Fetch the attendees user's id for the meeting id given.
    fetch("/api/modal-attendees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meetingID)
    })
      .then( res => res.json())
      .then((attendData) => {
        for (var i = 0, len = attendData.length; i < len; i++) {
          const attendeeObj = {
            UserId: attendData[i].UserId
          };
          //Fetch information from the user's table based on the user id retrieved earlier.
          fetch("/api/modal-attendee-single", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(attendeeObj)
          })
            .then( res => res.json())
            .then((data) => {
              //Make each user into an object, then spread into attendees state.
              const individualAttend = {
                name: data.name,
                company: data.company,
                email: data.email,
                hourlyRate: data.hourlyrate
              }
              this.setState({
                attendees: [...this.state.attendees, individualAttend]
              })
              this.checkTotal();
            });

        }
      });
  }

  //When the user clicks on a calendar event, this function fetches more information about the 
  //Meeting and displays it in a modal window.
  handleEventClick = ({ event, el }) => {
    const meetingID = {
      meetingId: event.id
    }
    fetch("/api/modal-meeting", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meetingID)
    }).then( res => res.json())
    .then((data) => {
      this.setState({
        modalTitle: JSON.stringify(data.title).replace(/"/g,""),
        modalId: JSON.stringify(data.id),
        modalStart: JSON.stringify(data.start).replace(/"/g,""),
        modalEnd: JSON.stringify(data.end).replace(/"/g,""),
        modalDesc: JSON.stringify(data.description).replace(/"/g,""),
      })
      this.populateUsersModal(meetingID);
      // this.checkTotal();
      this.toggleEventModal(event);
;
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
            <Grid container spacing={3} direction="row" justify="space-around">
              <Grid item xs={10}>
                <h2>
                  {this.state.modalTitle}
                </h2>
                <p>
                  Start: <Moment format="LLL">{this.state.modalStart}</Moment>
                </p>
                <p>
                  End: <Moment format="LLL">{this.state.modalEnd}</Moment>
                </p>
                <p>
                  Duration: {this.state.meetingDuration} Minutes
                </p>
                <p>
                  Total Cost of Meeting: $ {this.state.meetingTotal}
                </p>
              </Grid>
              <Grid item xs={4}>
                <h3>
                  Description
                </h3>
                <p>
                  {this.state.modalDesc}
                </p>
              </Grid>
              <Grid item xs={4}>
                <h3>
                    Attendees
                </h3>
                <div>
                  {this.state.attendees.map(attendee =>
                    {
                      return <p key={attendee.email}>{attendee.name}, {attendee.email}</p>
                    }
                  )}
                </div>
              </Grid>
              <Grid item xs={10}>
                <Button onClick={(e) => this.toggleEventModal(e)}>Close</Button>
              </Grid>
            </Grid>
          </div>
        </Modal>

        <h1 className="section-title">View Your Meetings</h1>
        <Button onClick={this.checkDuration}>Check Dates</Button>
        
        <FullCalendar 
          defaultView="dayGridMonth" 
          plugins={[interaction, dayGridPlugin]} 
          contentHeight="auto"   
          selectable={true}
          events={this.state.meetings}
          eventRender={this.handleEventRender}
          eventClick={this.handleEventClick}
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
      </>
    );
  }
}
