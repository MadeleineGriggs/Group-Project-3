import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Calendar } from "@fullcalendar/core";

import "./main.scss";

export default class Ourcalendar extends React.Component {
  render() {
    return (
      <div className="calendarwrap">
        <FullCalendar defaultView="dayGridMonth" plugins={[dayGridPlugin]} />
      </div>
    );
  }
}
