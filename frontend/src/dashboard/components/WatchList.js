import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";

import { Tooltip } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { DoughnutChart } from "./DoughnoutChart";
import { stocks } from "../data/stocks";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [search, setSearch] = useState("");

  // ---------------- Load Watchlist ----------------

  const loadWatchlist = async () => {
    try {
      const res = await axios.get(
        "https://tradelens-ewjp.onrender.com/watchlist",
        {
          withCredentials: true,
        }
      );

      const list = res.data;

      // Fetch live price for every stock
      const updated = await Promise.all(
        list.map(async (stock) => {
          try {
            const market = await axios.get(
              `https://tradelens-ewjp.onrender.com/market/${stock.name}`
            );

            return {
              ...stock,
              price: market.data.price,
              percent:
                market.data.change.toFixed(2) + "%",
              isDown: market.data.change < 0,
            };
          } catch {
            return stock;
          }
        })
      );

      setWatchlist(updated);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {

    loadWatchlist();

    // Refresh every 10 seconds
    const interval = setInterval(loadWatchlist, 10000);

    return () => clearInterval(interval);

  }, []);

  // ---------------- Search ----------------

  const filteredStocks = stocks.filter((stock) =>
    stock.toLowerCase().includes(search.toLowerCase())
  );

  // ---------------- Add Stock ----------------

  const addStock = async () => {

    if (!stocks.includes(search.toUpperCase())) {

      alert("Invalid Stock Symbol");

      return;

    }

    try {

      await axios.post(
        "https://tradelens-ewjp.onrender.com/watchlist",
        {
          name: search.toUpperCase(),
        },
        {
          withCredentials: true,
        }
      );

    

      setSearch("");

      loadWatchlist();

    } catch (err) {

      console.log(err);

    }

  };

  // ---------------- Doughnut Chart ----------------

  const labels = watchlist.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255,99,132,0.5)",
          "rgba(54,162,235,0.5)",
          "rgba(255,206,86,0.5)",
          "rgba(75,192,192,0.5)",
          "rgba(153,102,255,0.5)",
          "rgba(255,159,64,0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">

      <div className="search-container">

        <input
          type="text"
          className="search"
          placeholder="Search Stock..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <span className="counts">
          {watchlist.length} / 50
        </span>

      </div>

      {search !== "" && (
        <div
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            maxHeight: "180px",
            overflowY: "auto",
            marginTop: "5px",
          }}
        >
          {filteredStocks.map((stock, index) => (
            <div
              key={index}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
              onClick={() => setSearch(stock)}
            >
              {stock}
            </div>
          ))}
        </div>
      )}

      <div className="mb-3">
        <button
          className="btn btn-primary"
          onClick={addStock}
        >
          Add Stock
        </button>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => (
          <WatchListItem
            stock={stock}
            key={index}
            reloadWatchlist={loadWatchlist}
          />
        ))}
      </ul>

      <DoughnutChart data={data} />

    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock, reloadWatchlist }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowWatchlistActions(true)}
      onMouseLeave={() => setShowWatchlistActions(false)}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>
          {stock.name}
        </p>

        <div className="itemInfo">
          <span className="percent">
            {stock.percent}
          </span>

          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}

          <span className="price">
            ₹{Number(stock.price).toFixed(2)}
          </span>
        </div>
      </div>

      {showWatchlistActions && (
        <WatchListActions
          uid={stock.name}
          reloadWatchlist={reloadWatchlist}
        />
      )}
    </li>
  );
};

const WatchListActions = ({ uid, reloadWatchlist }) => {

  const generalContext = useContext(GeneralContext);

  // ---------------- BUY ----------------

  const handleBuyClick = () => {

    generalContext.openBuyWindow(uid);

  };

  // ---------------- SELL ----------------

  const handleSellClick = () => {

    generalContext.openSellWindow(uid);

  };

  // ---------------- DELETE ----------------

  const handleDelete = async () => {

    try {

      await axios.delete(

        `https://tradelens-ewjp.onrender.com/watchlist/${uid}`,

        {
          withCredentials: true,
        }

      );

    

      reloadWatchlist();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <span className="actions">

      <Tooltip
        title="Buy (B)"
        placement="top"
        arrow
      >
        <button
          className="buy"
          onClick={handleBuyClick}
        >
          Buy
        </button>
      </Tooltip>

      <Tooltip
        title="Sell (S)"
        placement="top"
        arrow
      >
        <button
          className="sell"
          onClick={handleSellClick}
        >
          Sell
        </button>
      </Tooltip>

      <Tooltip
        title="Delete"
        placement="top"
        arrow
      >
        <button
          className="action"
          onClick={handleDelete}
        >
          Delete
        </button>
      </Tooltip>

      <Tooltip
        title="Analytics"
        placement="top"
        arrow
      >
        <button className="action">
          <BarChartOutlined className="icon" />
        </button>
      </Tooltip>

      <Tooltip
        title="More"
        placement="top"
        arrow
      >
        <button className="action">
          <MoreHoriz className="icon" />
        </button>
      </Tooltip>

    </span>

  );
};