import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

//Routes
import Home from "./components/Home/Home.js";
import Layout from "./components/Layout/Layout.js";
import Game from "./components/Library/Game/GameDetials/GameDetails.js";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/games" component={Layout} />
          <Route exact path="/games/:id" component={Game} />
          <Redirect to="/" component={Home} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
