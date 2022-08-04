import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppFooter, Home } from "./components";
import Nav from "./layouts/Nav/Nav";
import { store } from "./redux/store";
import walletClient from "./ultils/WalletHelpers";
import './App.css'
function router() {
  return (
    <Router>
      <Nav />
      <div className="App content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<div>Inventory</div>} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  useEffect(() => {
    window.onbeforeunload = function () {
      localStorage.removeItem("persist:client");
    };
  }, []);

  return (
    <div>
      <div className="top-menu">{/* <AppHeader /> */}</div>
      <div> {router()} </div>
      <div className="footer">
        <AppFooter />
      </div>
    </div>
  );
}

export default App;
