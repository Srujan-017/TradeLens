const express = require("express");

const router = express.Router();

const { OrdersModel } = require("../model/OrdersModel");
const { HoldingsModel } = require("../model/HoldingsModel");
const { FundsModel } = require("../model/FundsModel");
// ================= New Order =================

router.post("/newOrder", async (req, res) => {

  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: "Please Login First",
    });
  }

  try {

    // ================= Check Funds =================

let funds = await FundsModel.findOne({

    userId: req.user._id,

});

if (!funds) {

    funds = new FundsModel({

        userId: req.user._id,

        balance: 50000,

    });

    await funds.save();

}

const totalCost =

    Number(req.body.qty) *

    Number(req.body.price);

if (funds.balance < totalCost) {

    return res.json({

        success: false,

        message: "Insufficient Balance",

    });

}

funds.balance -= totalCost;

await funds.save();

    const newOrder = new OrdersModel({

      userId: req.user._id,

      name: req.body.name,

      qty: Number(req.body.qty),

      price: Number(req.body.price),

      mode: req.body.mode,

    });

    await newOrder.save();

    // Check whether user already owns this stock
    let holding = await HoldingsModel.findOne({

      userId: req.user._id,

      name: req.body.name,

    });

    if (holding) {

      const oldQty = holding.qty;
      const newQty = oldQty + Number(req.body.qty);

      holding.avg =
        (
          (holding.avg * oldQty) +
          (Number(req.body.price) * Number(req.body.qty))
        ) / newQty;

      holding.qty = newQty;

      holding.price = Number(req.body.price);

      await holding.save();

    } else {

      const newHolding = new HoldingsModel({

        userId: req.user._id,

        name: req.body.name,

        qty: Number(req.body.qty),

        avg: Number(req.body.price),

        price: Number(req.body.price),

        net: "0%",

        day: "0%",

      });

      await newHolding.save();

    }

    res.json({

      success: true,

      message: "Order Saved Successfully",

    });

  } catch (err) {

    res.status(500).json({

      success: false,

      message: err.message,

    });

  }

});

// ================= Sell Stock =================

router.post("/sellOrder", async (req, res) => {

  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: "Please Login First",
    });
  }

  try {

    const { name, qty, price } = req.body;

    const holding = await HoldingsModel.findOne({
      userId: req.user._id,
      name,
    });

    if (!holding) {
      return res.json({
        success: false,
        message: "Stock not found in Holdings",
      });
    }

    if (holding.qty < qty) {
      return res.json({
        success: false,
        message: "Not enough quantity",
      });
    }

    // Save sell order
    const sellOrder = new OrdersModel({
      userId: req.user._id,
      name,
      qty,
      price,
      mode: "SELL",
    });

    await sellOrder.save();

    // Update holding quantity
    let funds = await FundsModel.findOne({

    userId: req.user._id,

});

if (!funds) {

    funds = new FundsModel({

        userId: req.user._id,

        balance: 50000,

    });

}

funds.balance +=

    qty *

    price;

await funds.save();
    holding.qty -= qty;

    if (holding.qty === 0) {
      await HoldingsModel.deleteOne({
        _id: holding._id,
      });
    } else {
      holding.price = price;
      await holding.save();
    }

    res.json({
      success: true,
      message: "Stock Sold Successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

});

// ================= All Orders =================

router.get("/orders", async (req, res) => {

    if (!req.isAuthenticated()) {

        return res.status(401).json({
            success: false,
            message: "Please Login First",
        });

    }

    try {

        const orders = await OrdersModel.find({

            userId: req.user._id,

        }).sort({ _id: -1 });

        res.json(orders);

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

});

module.exports = router;