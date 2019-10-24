import React from "react";
import "./home.css";
import Button from '@material-ui/core/Button';

const Home = props => (
  <div className="homeContainer">
   <p>The Home container is here.</p>
   <Button variant="contained" color="primary">
      Hello World
    </Button>
  </div>
);
export default Home;