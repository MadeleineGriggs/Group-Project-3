import React, { useState } from "react";
import MomentUtils from '@date-io/moment';
import "./home.css";
import {
    DatePicker,
    TimePicker,
    MuiPickersUtilsProvider,
  } from "@material-ui/pickers";
import Button from '@material-ui/core/Button';

    function ScheduleMeet(props) {
          const [selectedDate, handleDateChange] = useState(new Date());
          console.log(selectedDate)
        
            return (
                <div className="meeting-picker">
                    <h1 className="meeting-title">Schedule a New Meeting</h1>
                    <h2>Select your date and time for the meeting here.</h2>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <h3>Date of Meeting</h3>
                    <DatePicker value={selectedDate} onChange={handleDateChange} />
                    <h3>Start Time</h3>
                    <TimePicker value={selectedDate} onChange={handleDateChange} />
                    <h3>End Time</h3>
                    <TimePicker value={selectedDate} onChange={handleDateChange} />
                    <div className="meeting-submit-btn">
                        <Button variant="contained" color="primary" href="/">
                            Book Meeting / Go Home
                        </Button>
                    </div>
                    </MuiPickersUtilsProvider>
                </div>
            );
        }


export default ScheduleMeet;