import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    axios.get(
      "https://tradelens-ewjp.onrender.com/orders",
      {
        withCredentials: true,
      }
    )
    .then((res) => {

      setOrders(res.data);

    })
    .catch((err) => {

      console.log(err);

    });

  }, []);

  return (

    <div className="orders">

      <h3 className="title">
        Orders ({orders.length})
      </h3>

      <table className="table">

        <thead>

          <tr>

            <th>Type</th>

            <th>Stock</th>

            <th>Quantity</th>

            <th>Price</th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr key={order._id}>

              <td
                style={{
                  color:
                    order.mode === "BUY"
                      ? "green"
                      : "red",
                }}
              >
                {order.mode}
              </td>

              <td>{order.name}</td>

              <td>{order.qty}</td>

              <td>₹{order.price}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};

export default Orders;