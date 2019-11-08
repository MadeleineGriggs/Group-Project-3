import React, { Component } from 'react';
import "./home.css";

const Attendees = ({ attendees }) => {
    return (
        <div>
            <center><h1>User List</h1></center>
            {attendees.map((attendee) => (
                <div class='card'>
                    <div class='card-body'>
                        <h5 class='card-title'>{attendee.name}</h5>
                        <h6 class='card-subtitle'>{attendee.email}</h6>
                        <h6 class='card-subtitle'>{attendee.id}</h6>
                    </div>
                </div>
            ))}
        </div>
    )
};


export default Attendees;