import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppFooter, Home } from "./components";
import Nav from "./layouts/Nav/Nav";

function router() {

  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/inventory" element={<div>Inventory</div>} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {

  useEffect(() => {
    window.onbeforeunload = function() {
      localStorage.removeItem('persist:client');
    };
  }, [])

  return (
    <div>
      <div className="top-menu">
        {/* <AppHeader /> */}
      </div>
      <div className="content"> {router()} </div>
      <div className="footer">
        <AppFooter />
      </div>
    </div>
  );
}

export default App;
