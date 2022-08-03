import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import ButtonConnectWallet from "../../components/ButtonConnectWallet";

export default function Nav() {
  return (
    <div className="navbar">
      {/* <div className="logo">Shopio</div> */}
      <ul className="nav-links">
        <Link to="/"></Link>
        {/* <Link to="/inventory">Inventory</Link> */}
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
