import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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

export default class App extends React.Component {
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
