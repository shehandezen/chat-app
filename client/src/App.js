import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
// import Chat from "./components/Chat/Chat";
import Container from "./components/Container/Container";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" exact Component={Home} />
      <Route path="/chat" Component={Container} />
    </Routes>
  </Router>
);

export default App;
