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
  let newMeetEnd = document.getElementById("newDateEnd");
  console.log("New Meeting: " + newMeet.value);
  console.log("Start Time: " + newMeetStart.value);
  console.log("End Time: " + newMeetEnd.value);
};

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
        <h3>End Time</h3>
        <TimePicker
          id="newDateEnd"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <div className="meeting-submit-btn">
          <Button
            id="meetSub"
            onClick={newMeeting}
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
