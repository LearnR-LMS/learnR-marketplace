import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppFooter, Home } from "./components";
import './App.css'
import ButtonConnectWallet from "./components/ButtonConnectWallet";
function router() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/iframe/connect-wallet" element={<ButtonConnectWallet onRePress={() => {window.open(process.env.BASE_URL)}}/>} />
        </Routes>
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
