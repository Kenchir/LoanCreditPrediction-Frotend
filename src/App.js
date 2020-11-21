import React from "react";
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from "react-router-dom";

import { DatePicker, message, Alert } from "antd";
import "./App.css";
//Compnents import
import Home from "./Components/Home";
import About from "./Components/About";
import Loan from "./Components/Loan";
import NotFoundPage from "./Components/NotFound";

//Remove all consol1e.logs on pro1duction by1 setting  console.log to empty function
if (process.env.NODE_ENV === "production") {
  console.log = function () {};
}

const center = {
  position: "absolute",
  left: "50%",
  top: "50%",
  WebkitTransform: "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)",
};

export default class App extends React.Component {
  state = {
    date: null,
  };

  handleChange = (date) => {
    message.info(`Selected Date: ${date ? date.format("YYYY-MM-DD") : "None"}`);
    this.setState({ date });
  };

  render() {
    return (
      <div>
        <Router>
          <div>
            {/*<Nav/>*/}

            <Switch>
              <Route path="/predictmyloan" component={Loan} />
              <Route path="/About" component={About} />
              <Route exact path="/" component={Home} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
