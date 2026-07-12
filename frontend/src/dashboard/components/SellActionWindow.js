import React, { useState, useContext } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const generalContext = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);

  const handleSellClick = async () => {
    try {
      await axios.post(
        "https://tradelens-ewjp.onrender.com/sellOrder",
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
        },
        {
          withCredentials: true,
        }
      );

 

      generalContext.closeSellWindow();

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleCancelClick = () => {
    generalContext.closeSellWindow();
  };

  return (
    <div className="order-window" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>

            <input
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
            />

          </fieldset>

          <fieldset>
            <legend>Price</legend>

            <input
              type="number"
              step="0.05"
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
            />

          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Sell Stock</span>

        <div>
          <button className="btn btn-blue" onClick={handleSellClick}>
            Sell
          </button>

          <button
            className="btn btn-grey"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;