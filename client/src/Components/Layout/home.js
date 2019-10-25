import React, { Component } from "react";
import "./home.css";
import Button from '@material-ui/core/Button';

class Home extends Component {
    // let $exampleText = $("#example-text");
    // let $exampleDesc = $("#example-description");
    
    // let $exampleSubmit = $(".example-submit");

    // $exampleSubmit.on("submit", function(event) {
    //     event.preventDefault();
    //     var exampleData = {
    //         text: $exampleText.val(),
    //         description: $exampleDesc.val(),
    //     };
    //     //Need to check if all data is available.
    //     signUpExample(exampleData);
    // });

    // function signUpExample(exampleData) {
    //     $.post("/api/example", exampleData)
    //         .catch(function(err) {
    //             console.log(err);
    //         });
    // }

    handleSubmit = (event) => {
      event.preventDefault();

        const exampleData = {
            text: event.target.exampleText.value,
            description: event.target.exampleDesc.value,
        };
        console.log(exampleData);
    }

    // fetch('/api/example', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // }).then((response) => {
    //   if (response.status >= 400) {
    //     throw new Error("Bad response from server");
    //   }
    //   return response.json();
    // }).then((respData) => {
    //   console.log(respData);
    // }).catch((err) => {
    //   console.log(err);
    // });

  render() {
    return(
      <div className="homeContainer">
      <p>The Home container is here.</p>
      <Button variant="contained" color="primary">
          Hello World
        </Button>

          <br></br>
          <form onSubmit={event => this.handleSubmit(event)}>
        <input required name="exampleText" type="text" className="form-control" id="example-text" placeholder="text..."></input>
        <input required name="exampleDesc" type="text" className="form-control" id="example-description" placeholder="description..."></input>
        <button type="submit" className="example-submit">Sign Up</button>
        </form>
      </div>
    )
  }
};
export default Home;