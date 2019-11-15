import React, { Component } from "react";
import "./home.css";
import logoImg from "../../images/helm-white.png"
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Modal from "@material-ui/core/Modal";

import Grid from "@material-ui/core/Grid";

import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Link from "@material-ui/core/Link";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      showPassword: false,
      setOpen: false,
      modalOpen: false
    };
  }

  // Modal Window Open/Close Function
  toggleModal(event) {
    event.preventDefault();
    this.setState({
      setOpen: !this.state.setOpen,
      modalOpen: !this.state.modalOpen
    });
  }

  // Set the propery and the event target value.
  handleChange(prop, event) {
    this.setState({
      [prop]: event.target.value
    });
  }

  //Toggles the visibility of the password login field text.
  handleClickShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  handleMouseDownPassword(event) {
    event.preventDefault();
  }

  //Submits a new user to the users table in the database. (When a new user is signing up.)
  handleSubmitUser(event) {
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
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });
    this.toggleModal(event);
  }

  // Submits the email and password of a user logging in. Passport authenticates the user and sets a cookie to keep the user logged in.
  handleUserLogin(event) {
    event.preventDefault();
    const userLoginData = {
      email: event.target.loginEmail.value,
      password: event.target.loginPassword.value
    };
    // console.log(userLoginData)
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userLoginData)
    });
    this.toggleModal(event);
  }

  // Logs the User out.
  handleUserLogout(event) {
    event.preventDefault();
    fetch("api/logout", {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }

  // Function to check the auth of the user from the local cookie. Used for testing.
  handleAuthCheck(event) {
    event.preventDefault();
    fetch("api/authCheck", {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }

  render() {
    return (
      <div className="nav-container">
        {/* The Modal Window */}
        <Modal open={this.state.modalOpen} onClose={e => this.toggleModal(e)}>
          <div className="login-signup-modal-container">
            {/* User Login. */}
            <Grid container spacing={3} direction="row" justify="space-around">
              <Grid item xs={4}>
                <div className="login-container">
                  <h2 className="schedule-subtitle">Login</h2>
                  <form onSubmit={e => this.handleUserLogin(e)}>
                    <InputLabel htmlFor="standard-email">Email</InputLabel>
                    <TextField
                      name="loginEmail"
                      id="standard-email"
                      className="email-login-field"
                      // label="Email"
                      value={this.state.email}
                      onChange={e => {
                        this.handleChange("email", e);
                      }}
                    />

                    <InputLabel htmlFor="standard-adornment-password">
                      Password
                    </InputLabel>
                    <Input
                      required
                      name="loginPassword"
                      id="standard-adornment-password"
                      type={this.state.showPassword ? "text" : "password"}
                      value={this.state.password}
                      onChange={e => {
                        this.handleChange("password", e);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => {
                              this.handleClickShowPassword();
                            }}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {this.state.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />

                    <br></br>
                    <br></br>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      value="Submit"
                    >
                      Login
                    </Button>
                  </form>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="sign-up-container">
                  <h2 className="schedule-subtitle">Signup</h2>
                  <form onSubmit={e => this.handleSubmitUser(e)}>
                    <InputLabel htmlFor="signupUsername">Username</InputLabel>
                    <TextField
                      required
                      name="userName"
                      id="signupUsername"
                      type="text"
                      className="form-control"
                    />
                    <br></br>
                    <InputLabel htmlFor="signupJobTitle">Job Title</InputLabel>
                    <TextField
                      required
                      name="jobTitle"
                      id="signupJobTitle"
                      type="text"
                      className="form-control"
                    />
                    <br></br>
                    <InputLabel htmlFor="signupHourRate">Salary</InputLabel>
                    <TextField
                      required
                      name="hourRate"
                      type="text"
                      id="signupHourRate"
                      className="form-control"
                    />
                    <br></br>
                    <InputLabel htmlFor="signupEmail">Email</InputLabel>
                    <TextField
                      required
                      name="emailAddress"
                      id="signupEmail"
                      type="text"
                      className="form-control"
                    />
                    <br></br>
                    <InputLabel htmlFor="signupCompany">
                      Company Name
                    </InputLabel>
                    <TextField
                      required
                      name="company"
                      id="signupCompany"
                      type="text"
                      className="form-control"
                    />
                    <br></br>
                    <InputLabel htmlFor="signupPassword">Password</InputLabel>
                    <TextField
                      required
                      name="userPassword"
                      id="signupPassword"
                      type="text"
                      className="form-control"
                    />
                    <br></br>
                    <br></br>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="signup-submit"
                    >
                      Sign Up
                    </Button>
                  </form>
                </div>
              </Grid>
            </Grid>

            <Button onClick={e => this.toggleModal(e)}>Close</Button>
          </div>
        </Modal>

        {/* The Top Nav Bar */}
        <AppBar position="static" color="primary">
          <Toolbar>
            <Grid container spacing={3} direction="row" justify="center">
              <Grid item xs={3}>
                <div className="logo-center">
                  
                  <Typography variant="h5">
                  <img src={logoImg} alt="logo" className="helm-logo"/>
                    <Link href="/" id="homelink" className="nav-title">
                    <span className="logo-text">
                      Spartan Meet
                      </span>
                    </Link>
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" className="nav-bar-link">About Us</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" className="nav-bar-link">Contact</Typography>
              </Grid>
              <Grid item xs={3}>
                <Button
                  onClick={e => this.toggleModal(e)}
                  variant="contained"
                  color="primary"
                  className="login-btn"
                >
                  Login | Signup
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default NavBar;
