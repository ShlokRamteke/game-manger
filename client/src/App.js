import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";

//Routes
import Home from "./components/Home/Home.js";
import Library from "./components/Library/Library.js";
import Game from "./components/Library/Game/GameDetials/GameDetails.js";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />

      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/games" element={<Library />} />
          <Route exact path="/games/:id" element={<Game />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
