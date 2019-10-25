import React, { Component } from "react";
import "./home.css";
import Button from '@material-ui/core/Button';

class Home extends Component {

    handleSubmit = (event) => {
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



  render() {
    return(
      <div className="homeContainer">

        <div className="sign-in-container">
          <form onSubmit={event => this.handleSubmit(event)}>
            <input required name="exampleText" type="text" className="form-control" id="example-text" placeholder="text..."></input>
            <br></br>
            <input required name="exampleDesc" type="text" className="form-control" id="example-description" placeholder="description..."></input>
            <br></br>
            <button type="submit" className="example-submit">Sign Up</button>
          </form>
        </div>

        <h1>Spartan Meetings</h1>
        <div className="home-buttons">
          <Button variant="contained" color="primary">
            Schedule Meeting
          </Button>
          <br></br>
          <br></br>
          <Button variant="contained" color="primary">
            View Meetings
          </Button>
          <br></br>
          <br></br>
          <Button variant="contained" color="primary">
            Meeting Metrics
          </Button>
        </div>



      </div>
    )
  }
};
export default Home;