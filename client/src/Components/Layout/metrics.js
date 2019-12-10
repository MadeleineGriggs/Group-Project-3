import React, { Component } from "react";
import NavBar from "../Layout/navBar";
import "./home.css";
import './metricStyle.css';
import {XYPlot, LineSeries, LineMarkSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, Hint} from 'react-vis';

class Metrics extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [
        {x: 0, y: 8},
        {x: 1, y: 5},
        {x: 2, y: 4},
        {x: 3, y: 6},
        {x: 4, y: 2},
        {x: 5, y: 7},
        {x: 6, y: 6},
        {x: 7, y: 3},
        {x: 8, y: 2},
        {x: 9, y: 4}
      ],
      projects: [],
      value: null,
    }
  }

  _forgetValue = () => {
    this.setState({
      value: null
    });
  };

  _rememberValue = value => {
    this.setState({value});
  };

  fetchProjects() {
    fetch("/api/fetch-projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    })
    .then( res => res.json())
    .then((data) => {
      data.forEach(function(element) {
        const elementBody = {
          projectId: element.id
        }
        fetch("/api/fetch-meeting-by-project", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(elementBody)
        })
        .then( res => res.json())
        .then((data) => {
          console.log(data)
          data.forEach(function(dataElement) {
            console.log("Testing Elements")
            console.log(dataElement);
          })
        })
      })
    })
  }

  componentDidMount() {
    this.fetchProjects();
  }

  render() {
    const value = this.state.value;
    const data = [
      {x: 0, y: 45, title:"Initial Site Visit"},
      {x: 1, y: 30, title:"Scope Meeting"},
      {x: 2, y: 120, title:"Design Discussion"},
      {x: 3, y: 35, title:"Standup Week 1"},
      {x: 4, y: 45, title:"Paul and Maddy Meeting: Discuss Charts"},
      {x: 5, y: 100, title:"Introduction to our New System"},
      {x: 6, y: 20, title:"Another Meeting Name"},
      {x: 7, y: 15, title:"Another Meeting Name 2: Electric Boogaloo"},
      {x: 8, y: 35, title:"Testing Suite Discussion"},
      {x: 9, y: 20, title:"Christmas Party Planning"}
    ];
    const data2 = [
      {x: 0, y: 30, title:"Initial Site Visit"},
      {x: 1, y: 45, title:"Scope Meeting"},
      {x: 2, y: 100, title:"Design Discussion"},
      {x: 3, y: 70, title:"Standup Week 1"},
      {x: 4, y: 20, title:"Paul and Maddy Meeting: Discuss Charts"},
      {x: 5, y: 60, title:"Introduction to our New System"},
      {x: 6, y: 45, title:"Another Meeting Name"},
      {x: 7, y: 45, title:"Another Meeting Name 2: Electric Boogaloo"},
      {x: 8, y: 80, title:"Testing Suite Discussion"},
      {x: 9, y: 25, title:"Christmas Party Planning"}
    ];
    const data3 = [
      {x: 0, y: 15, title:"Scope Meeting"},
      {x: 1, y: 35, title:"Initial Site Visit"},
      {x: 2, y: 60, title:"Testing Suite Discussion"},
      {x: 3, y: 120, title:"Introduction to our New System"},
      {x: 4, y: 25, title:"Another Meeting Name 2: Electric Boogaloo"},
      {x: 5, y: 45, title:"Another Meeting Name"},
      {x: 6, y: 100, title:"Introduction to our New System"},
    ];

    const dataCost = [
      {x: 0, y: 120.00, title:"Initial Site Visit"},
      {x: 1, y: 30.00, title:"Scope Meeting"},
      {x: 2, y: 175.00, title:"Design Discussion"},
      {x: 3, y: 15.75, title:"Standup Week 1"},
      {x: 4, y: 75.75, title:"Paul and Maddy Meeting: Discuss Charts"},
      {x: 5, y: 110.25, title:"Introduction to our New System"},
      {x: 6, y: 20.57, title:"Another Meeting Name"},
      {x: 7, y: 35.45, title:"Another Meeting Name 2: Electric Boogaloo"},
      {x: 8, y: 35, title:"Testing Suite Discussion"},
      {x: 9, y: 70.75, title:"Christmas Party Planning"}
    ];
    const dataCost2 = [
      {x: 0, y: 76.80, title:"Initial Site Visit"},
      {x: 1, y: 65, title:"Scope Meeting"},
      {x: 2, y: 87, title:"Design Discussion"},
      {x: 3, y: 70, title:"Standup Week 1"},
      {x: 4, y: 34, title:"Paul and Maddy Meeting: Discuss Charts"},
      {x: 5, y: 57, title:"Introduction to our New System"},
      {x: 6, y: 45, title:"Another Meeting Name"},
      {x: 7, y: 75, title:"Another Meeting Name 2: Electric Boogaloo"},
      {x: 8, y: 60.5, title:"Testing Suite Discussion"},
      {x: 9, y: 45, title:"Christmas Party Planning"}
    ];
    const dataCost3 = [
      {x: 0, y: 15, title:"Scope Meeting"},
      {x: 1, y: 35, title:"Initial Site Visit"},
      {x: 2, y: 60, title:"Testing Suite Discussion"},
      {x: 3, y: 120, title:"Introduction to our New System"},
      {x: 4, y: 25, title:"Another Meeting Name 2: Electric Boogaloo"},
      {x: 5, y: 45, title:"Another Meeting Name"},
      {x: 6, y: 100, title:"Introduction to our New System"},
    ];
    return (
      <>
        <NavBar>
        </NavBar>
        <div className="MetricDisplayArea">
          <h1 className="metric-title">Meeting Metrics</h1>
      

            <div className="dump-div">

            </div>


            <div className="plot-chart-area">
              <h2>Duration of Meetings by Project</h2>
              <h3>Mouse over points to see duration and meeting title</h3>
              <XYPlot width={1200} height={800}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis title="Meeting"/>
                <YAxis title="Time Duration (In Minutes)"/>
                <LineMarkSeries
                  className="linemark-series-example"
                  curve={'curveMonotoneX'}
                  onValueMouseOver={this._rememberValue}
                  onValueMouseOut={this._forgetValue}
                  data={data}
                />
                <LineMarkSeries
                  className="linemark-series-example-2"
                  curve={'curveMonotoneX'}
                  onValueMouseOver={this._rememberValue}
                  onValueMouseOut={this._forgetValue}
                  data={data2}
                />
                                <LineMarkSeries
                  className="linemark-series-example-2"
                  curve={'curveMonotoneX'}
                  onValueMouseOver={this._rememberValue}
                  onValueMouseOut={this._forgetValue}
                  data={data3}
                />
                {value ? (<Hint value={value}>
                            <div className="hint-container">
                              <p>Meeting Title: {value.title}</p>
                              <p>Duration: {value.y}</p>
                            </div>
                          </Hint>) : null}
              </XYPlot>
            </div>


            <div className="plot-chart-area-2">
              <h2>Cost of Meetings by Project</h2>
              <h3>Mouse over points to see cost and meeting title</h3>
              <XYPlot width={1200} height={800}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis title="Meeting"/>
                <YAxis title="Cost (in dollars)"/>
                <LineMarkSeries
                  className="linemark-series-example"
                  curve={'curveMonotoneX'}
                  onValueMouseOver={this._rememberValue}
                  onValueMouseOut={this._forgetValue}
                  data={dataCost}
                />
                <LineMarkSeries
                  className="linemark-series-example-2"
                  curve={'curveMonotoneX'}
                  onValueMouseOver={this._rememberValue}
                  onValueMouseOut={this._forgetValue}
                  data={dataCost2}
                />
                                <LineMarkSeries
                  className="linemark-series-example-2"
                  curve={'curveMonotoneX'}
                  onValueMouseOver={this._rememberValue}
                  onValueMouseOut={this._forgetValue}
                  data={dataCost3}
                />
                {value ? (<Hint value={value}>
                            <div className="hint-container">
                              <p>Meeting Title: {value.title}</p>
                              <p>Duration: {value.y}</p>
                            </div>
                          </Hint>) : null}
              </XYPlot>
            </div>
        </div>
      </>
    );
  }
 
}

export default Metrics;
