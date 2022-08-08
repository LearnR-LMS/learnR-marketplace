import { Button } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { formatBalance, formatWalletAddress } from "../../ultils/helpers";
import auraicon from "../../../public/auraicon.png";
import "./styles.css";
import walletClient from '../../ultils/WalletHelpers'

export default function ButtonConnectWallet(props) {
  const address = useSelector((state) => state.client.address_wallet);
  const auraStaked = useSelector((state) => state.client.aura_staked);

  const dispatchUpdateAddress = async () => {
    await walletClient.connectWallet();
  };
  let getData
  useEffect(() => {
    if (address !== "") {
      getData = setInterval(() => {
        dispatchUpdateAddress();
      }, 10000);
    }
  }, []);

  useEffect(() => {
    if (address !== "") {
      clearInterval(getData)
      getData = setInterval(() => {
        dispatchUpdateAddress();
      }, 10000);
    }
  }, [address]);

  const btnText =
    address !== "" ? formatWalletAddress(address) : "Connect Wallet";
  return (
    <Button
      onClick={address === "" ? dispatchUpdateAddress : props.onRePress ? props.onRePress : () => {} }
      className="itemActionButton"
      type="round"
    >
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          display: "flex",
        }}
      >
        {address !== "" ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={auraicon}
              alt="auraicon"
              style={{ width: 30, height: 30, marginRight: 8 }}
            />
            <span style={{ fontWeight: "bold", fontSize: 16, marginRight: 8 }}>
              {formatBalance(auraStaked)}
            </span>
            <span
              style={{ fontWeight: "inherit", fontSize: 12, color: "#eee" }}
            >
              {btnText}
            </span>
          </div>
        ) : (
          <span style={{ fontWeight: "bold", fontSize: 14 }}>{btnText}</span>
        )}
      </div>
    </Button>
  );
}
