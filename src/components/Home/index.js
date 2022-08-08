import { List, } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./index.css";
import pen_default from "../../assets/images/pendefault.png";
import { Button } from "react-bootstrap";
import clientWallet from '../../ultils/WalletHelpers'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Home = () => {
  const listPen = useSelector((state) => state.client.pen_nfts);

  const _renderItem = (item) => {
    let extensionData = "";
    let level = ''
    if (item.extension) {
      extensionData = JSON.parse(item.extension);
      if(extensionData.hasOwnProperty('level')){
        level = extensionData.level
        delete extensionData.level
      }
    }

    var stringExtension = Object.keys(extensionData)
      .map(function (key) {
        return "" + capitalizeFirstLetter(key) + ": " + extensionData[key]; // line break for wrapping only
      })
      .join(" | ");
    return (
      <List.Item>
        <div className="item-row">
          <img src={pen_default} style={{ width: "20px", height: "70px" }} />
          <div
            style={{
              marginLeft: "12px",
              alignItems: "start",
              flex: 1,
              padding: "4px",
              flexDirection: 'column',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span className="level_text">Level: {level}</span>
            <span className="token_id">#{item.token_id}</span>
            <span className="extension">{stringExtension}</span>
          </div>
        </div>
      </List.Item>
    );
  };

  return (
    <div className="home">
      <h2>Inventory</h2>
      <List
        bordered
        dataSource={listPen}
        renderItem={_renderItem}
        style={{width: '100%'}}
      />
      <Button onClick={clientWallet.mintPen} className="button-mint">Mint Pen Free</Button>
    </div>
  );
};

export default Home;
