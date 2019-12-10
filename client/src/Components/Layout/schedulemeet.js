// eslint-disable-next-line
import React, { useState } from "react";
import Moment from 'react-moment';
import moment from 'moment';
import MomentUtils from "@date-io/moment";
import "./home.css";
// Material UI imports
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
// MaterialUI pickers imports.
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
//Local imports - hooks, other components.
import useFetch from "./Hooks/userFind.js";
import useFetchProject from "./Hooks/projectFind.js";
import NavBar from "./navBar.js";

let projectId = "";

//Handles which project has been selected from the dropdown menu of projects.
const handleProjectChange = (event) => {
  projectId = event.target.value
}

const createProject = (event) => {
  // event.preventDefault();
  let newProject = document.getElementById("newProject");
  const projectData = {
    title: newProject.value,
    description: "Something"
  };
  fetch("/api/new-project", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData)
  })
  .then(response => response.json())
}


//Creates a new meeting.
const handleMeetingCreation = (event, userData) => {
  event.preventDefault();

  let newDate = document.getElementById("newDate");
  let newTitle = document.getElementById("newTitle");
  let newMeetStart = document.getElementById("standard-basic newDateStart");
  let newMeetFullStart = newDate.value + "T" + newMeetStart.value + ":00"
  let newMeetEnd = document.getElementById("standard-basic newDateEnd");
  let newMeetFullEnd = newDate.value + "T" + newMeetEnd.value + ":00";
  let newDescNewLines = document.getElementById("standard-multiline-flexible newDesc");
  let newDesc = (newDescNewLines.value).replace(/(\n)/g," ")

  var start = moment(newMeetFullStart);
  var end = moment(newMeetFullEnd);
  console.log(start)
  console.log(end)
  var totalTime = moment.duration(end.diff(start)).asMinutes()
  console.log(totalTime)

  const meetingData = {
    date: newDate.value,
    start: newMeetFullStart,
    end: newMeetFullEnd,
    title: newTitle.value,
    description: newDesc,
    prodId: projectId,
    duration: totalTime
  };
  fetch("/api/new-meeting", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(meetingData)
  })
    .then(response => response.json())
    .then(data => createAttendees(data, userData));
};

//Gets the meeting id from the created meeting.
//Populates an array of users that the person has checked to include.
//API call does a bulk create to the attendees table.
const createAttendees = (meetingID, userData) => {

  let attendArray = [];

  // filter list of users to checked users only, then map to correct object structure
  attendArray = userData.filter(user => user.checked).map(user => ({MeetingId: meetingID, UserId: user.id}))
  fetch("/api/all-attendees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(attendArray)
  }).then(response => response.json())
  window.location.replace("/view-meet");
};

const handleCheckChange = (event, userData, key, setUserData) => {
  userData[key].checked = event.target.checked
  setUserData(userData)
}

function ScheduleMeet(props) {
  const fetchData = useFetch("/api/all-users")
  const userData = fetchData[0]
  const setUserData = fetchData[1]

  const fetchProject = useFetchProject("/api/all-projects")
  const projectData = fetchProject[0]
  const setProjectData = fetchProject[1]

  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedDate2, handleDateChange2] = useState(new Date())

  
  return (
    <>
    <NavBar>
    </NavBar>
    <div className="meeting-picker">
      
      <h1 className="meeting-title">Schedule a New Meeting</h1>
      <Grid container 
        spacing={3}
        direction="row"
        justify="space-around"
        className="schedule-meeting-area">


      <Grid item xs={6} className="scheduler-container">

      <h2 className="schedule-title">Book Meeting</h2>
      <MuiPickersUtilsProvider utils={MomentUtils}>
      <h3 className="schedule-subtitle">Meeting Title</h3>
      <TextField
          name="Meeting Title"
          id="newTitle"
          fullWidth
          className="meeting-title-field"
          label="Meeting #1..."
        />
      <h3 className="schedule-subtitle">Meeting Description</h3>
      <TextField
          name="Meeting Description"
          id="standard-multiline-flexible newDesc"
          fullWidth
          multiline
          rowsMax="6"
          className="meeting-title-field"
          label="A short summary..."
        />
        <h3 className="schedule-subtitle">Date of Meeting</h3>
        <DatePicker
          openTo="year"
          id="newDate"
          fullWidth
          views={["year", "month", "date"]}
          className="meeting-title-field"
          value={selectedDate}
          format="YYYY-MM-DD"
          disablePast
          onChange={handleDateChange}

        />
        <h3 className="schedule-subtitle">Start Time</h3>
        <TimePicker
          clearable
          ampm={false}
          fullWidth
          label="24 hours"
          id="standard-basic newDateStart"
          className="meeting-title-field"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <h3 className="schedule-subtitle">End Time</h3>
        <TimePicker
          clearable
          ampm={false}
          fullWidth
          label="24 hours"
          id="standard-basic newDateEnd"
          className="meeting-title-field"
          value={selectedDate2}
          onChange={handleDateChange2}
        />

        <div className="meeting-submit-btn">
          <Button
            id="meetSub"
            onClick={(event) => handleMeetingCreation(event, userData)}
            variant="contained"
            color="primary"
          >
            Book Meeting and Go To Calendar
          </Button>
        </div>
      </MuiPickersUtilsProvider>
      </Grid>

      <Grid item xs={4}>
        <h2>Assign Meeting to Project</h2>
          <FormControl>
            <InputLabel id="simple-select-label">Project</InputLabel>
            <Select
              labelid="simple-select-label" className="drop-down"
              onChange={handleProjectChange}
            >
              {projectData.map((item, key) => 
              <MenuItem value={item.id} id={item.id} key={item.id}>{item.title}</MenuItem>
              )}
            </Select>
          </FormControl>
        <h3 className="schedule-subtitle">Create New Project</h3>
        <TextField
          name="Project Title"
          id="newProject"
          fullWidth
          className="project-title-field"
          label="New Project..."
        />
          <div className="project-submit-btn">
          <Button
            id="projectSub"
            onClick={(event) => createProject(event)}
            variant="contained"
            color="primary"
          >
            Create New Project
          </Button>
        </div>
        <h2 className="schedule-title">Meeting Attendees: </h2>
      <FormControl component="fieldset" className='formControl'>
        <FormLabel component="legend">Assign Members</FormLabel>
        <FormGroup>
        {userData.map((item, key) =>
            <FormControlLabel
              control={<Checkbox value={item.id} key={item.id} data-userid={item.id} onChange={(event) => handleCheckChange(event, userData, key, setUserData)}/>}
              label={item.name}
              key={key}
            />
        )}
        </FormGroup>
      </FormControl>
      </Grid>


      </Grid>
    </div>
    </>
  );
}

export default ScheduleMeet;
