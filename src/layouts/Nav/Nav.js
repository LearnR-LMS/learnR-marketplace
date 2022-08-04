import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import ButtonConnectWallet from "../../components/ButtonConnectWallet";
import logo_learnr from '../../assets/images/logo_learnr.png'
export default function Nav() {
  return (
    <div className="navbar">
      <a href="/">
        <img src={logo_learnr} width="120px" />
      </a>
      <ul className="nav-links">
        <Link to="/"></Link>
      </ul>
      <div
        style={{
          position: "absolute",
          right: 5,
        }}
      >
        <ButtonConnectWallet />
      </div>
    </div>
  );
}
