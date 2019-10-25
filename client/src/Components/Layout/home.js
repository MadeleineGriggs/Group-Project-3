import React, { Component } from "react";
import "./home.css";
import Button from '@material-ui/core/Button';

class Home extends Component {

    handleSubmitExample = (event) => {
      event.preventDefault();

        const exampleData = {
            text: event.target.exampleText.value,
            description: event.target.exampleDesc.value,
        };
        console.log(exampleData);


        fetch("/api/example", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(exampleData)
        })

    }

    handleSubmitUser = (event) => {
      event.preventDefault();

        const userData = {
            name: event.target.userName.value,
            jobtitle: event.target.jobTitle.value,
            hourlyrate: event.target.hourRate.value,
            email: event.target.emailAddress.value,
            password: event.target.userPassword.value
        };
        console.log(userData);


        fetch("/api/new-user", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        })

    }



  render() {
    return(
      <div className="homeContainer">

        <div className="sign-in-container">
          <form onSubmit={event => this.handleSubmitExample(event)}>
            <input required name="exampleText" type="text" className="form-control" id="example-text" placeholder="text..."></input>
            <br></br>
            <input required name="exampleDesc" type="text" className="form-control" id="example-description" placeholder="description..."></input>
            <br></br>
            <button type="submit" className="example-submit">Sign Up</button>
          </form>
        </div>



        <h1>Spartan Meetings</h1>
        <div className="home-buttons">
          <Button variant="contained" color="primary" href="/schedule-meet">
            Schedule Meeting
          </Button>
          <br></br>
          <br></br>
          <Button variant="contained" color="primary" href="/view-meet">
            View Meetings
          </Button>
          <br></br>
          <br></br>
          <Button variant="contained" color="primary" href="/metrics">
            Meeting Metrics
          </Button>
        </div>

        <div className="sign-up-container">
          <form onSubmit={event => this.handleSubmitUser(event)}>
            <input required name="userName" type="text" className="form-control" placeholder="Name"></input>
            <br></br>
            <input required name="jobTitle" type="text" className="form-control" placeholder="Job Title"></input>
            <br></br>
            <input required name="hourRate" type="text" className="form-control" placeholder="Hourly Rate"></input>
            <br></br>
            <input required name="emailAddress" type="text" className="form-control" placeholder="Email Address"></input>
            <br></br>
            <input required name="userPassword" type="text" className="form-control" placeholder="Password"></input>
            <br></br>
            <button type="submit" className="signup-submit">Sign Up</button>
          </form>
        </div>

      </div>
    )
  }
};
export default Home;