import React, { Component } from "react";
import "./home.css";
import Button from '@material-ui/core/Button';
// import { EventEmitter } from "events";

class Home extends Component {

  // handleSubmitExample = (event) => {
  //   event.preventDefault();

  //     const exampleData = {
  //         text: event.target.exampleText.value,
  //         description: event.target.exampleDesc.value,
  //     };
  //     console.log(exampleData);


  //     fetch("/api/example", {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(exampleData)
  //     })

  // }

  handleSubmitUser = (event) => {
    event.preventDefault();

      const userData = {
          name: event.target.userName.value,
          jobtitle: event.target.jobTitle.value,
          hourlyrate: event.target.hourRate.value,
          email: event.target.emailAddress.value,
          company: event.target.company.value,
          password: event.target.userPassword.value
      };
      console.log(userData);


      fetch("/api/new-user", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })

  }

  handleUserLogin = (event) => {
    event.preventDefault();
    const userLoginData = {
      email: event.target.loginEmail.value,
      password: event.target.loginPassword.value
    };
    console.log(userLoginData)
    fetch("/api/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userLoginData)
    })
  }

  handleUserLogout = (event) => {
    event.preventDefault();
    fetch("api/logout", {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => console.log(res))
  }

  handleAuthCheck = (event) => {
    event.preventDefault()
    fetch("api/authCheck", {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => console.log(res))
  }


  render() {
    return(
      <div className="homeContainer">



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


        <div className="sign-in-container">
          <h1>Sign in Area</h1>
          <form onSubmit={event => this.handleUserLogin(event)}>
            <input required name="loginEmail" type="text" className="form-control" id="example-text" placeholder="your email address"></input>
            <br></br>
            <input required name="loginPassword" type="text" className="form-control" id="example-description" placeholder="password"></input>
            <br></br>
            <button type="submit" className="login-submit">Login</button>
          </form>
        </div>

        <div className="sign-out-container">
          <form onSubmit={event => this.handleAuthCheck(event)}>
            <button>Check Auth</button>
          </form>
        </div>

        <div className="auth-check-container">
          <form onSubmit={event => this.handleUserLogout(event)}>
            <button type="submit" className="logout-submit">Logout</button>
          </form>
        </div>


        <div className="sign-up-container">
          <h1>Signup Area</h1>
          <form onSubmit={event => this.handleSubmitUser(event)}>
            <input required name="userName" type="text" className="form-control" placeholder="Name"></input>
            <br></br>
            <input required name="jobTitle" type="text" className="form-control" placeholder="Job Title"></input>
            <br></br>
            <input required name="hourRate" type="text" className="form-control" placeholder="Hourly Rate"></input>
            <br></br>
            <input required name="emailAddress" type="text" className="form-control" placeholder="Email Address"></input>
            <br></br>
            <input required name="company" type="text" className="form-control" placeholder="Company"></input>
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
