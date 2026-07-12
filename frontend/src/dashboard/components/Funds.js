import React, { useEffect, useState } from "react";
import axios from "axios";

const Funds = () => {

  const [balance, setBalance] = useState(0);

  const loadFunds = async () => {

  try {

    const res = await axios.get(
      "https://tradelens-ewjp.onrender.com/funds",
      {
        withCredentials: true,
      }
    );

    setBalance(res.data.balance);

  } catch (err) {

    console.log(err);

  }

};

useEffect(() => {

  loadFunds();

}, []);

  return (

    <div className="container mt-5">

      <h2>Funds</h2>

      <hr />

      <h1 style={{ color: "green" }}>

        ₹{balance.toLocaleString()}

      </h1>

      <p>Available Balance</p>

    </div>

  );

};

export default Funds;