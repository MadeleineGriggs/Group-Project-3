import React, { useState } from "react";
import MomentUtils from "@date-io/moment";
import "./home.css";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";

var newMeeting = () => {
  let newMeet = document.getElementById("newDate");
  let newMeetStart = document.getElementById("newDateStart");
  let duration = document.getElementById("duration");
  console.log("New Meeting: " + newMeet.value);
  console.log("Start Time: " + newMeetStart.value);
  console.log("Duration: " + duration.value);
};

var realMeeting = () => {
  let newDate = document.getElementById("newDate");
  let newMeetStart = document.getElementById("newDateStart");
  let duration = document.getElementById("duration");
  var newMeet = {
    date: newDate.value,
    start: newMeetStart.value,
    duration: duration.value,
    description: "this is a test"
  };
  console.log(newMeet);
};

var handleMeetingCreation = event => {
  event.preventDefault();
  let newDate = document.getElementById("newDate");
  let newMeetStart = document.getElementById("newDateStart");
  let durationHour = document.getElementById("durationH");
  let durationMin = document.getElementById("durationM");
  const meetingData = {
    date: newDate.value,
    start: newMeetStart.value,
    durationH: durationHour.value,
    durationM: durationMin.value,
    description: "work, god damn you"
  };
  console.log(meetingData);
  fetch("/api/new-meeting", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(meetingData)
  });
};

//   $.ajax("/api/new-meeting", {
//     type: "POST",
//     data: newMeet
//   }).then(function() {
//     console.log("New meeting created!");
//     location("/");
//   });
// };

function ScheduleMeet(props) {
  const [selectedDate, handleDateChange] = useState(new Date());
  console.log(selectedDate);

  return (
    <div className="meeting-picker">
      <h1 className="meeting-title">Schedule a New Meeting</h1>
      <h2>Select your date and time for the meeting here.</h2>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <h3>Date of Meeting</h3>
        <DatePicker
          id="newDate"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <h3>Start Time</h3>
        <TimePicker
          id="newDateStart"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <h3>Duration (Hours)</h3>
        <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
          <input
            className="MuiInputBase-input MuiInput-input"
            id="durationH"
            type="text"
            text="Please enter duration"
          />
        </div>
        <h3>Duration (Minutes)</h3>
        <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
          <input
            className="MuiInputBase-input MuiInput-input"
            id="durationM"
            type="text"
            text="Please enter duration"
          />
        </div>
        {/* <TimePicker
          id="newDateEnd"
          value={selectedDate}
          onChange={handleDateChange}
        /> */}
        <div className="meeting-submit-btn">
          <Button
            id="meetSub"
            onClick={handleMeetingCreation}
            variant="contained"
            color="primary"
            // href="/metrics"
          >
            Book Meeting
          </Button>
        </div>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default ScheduleMeet;
