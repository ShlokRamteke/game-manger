import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Library from "./components/Library/Library";
import Game from "./components/Library/Game/Game";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/games" element={<Library />} />
        <Route exact path="/games/:id" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
