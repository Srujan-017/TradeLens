const express = require("express");

const router = express.Router();

const { FundsModel } = require("../model/FundsModel");

// ================= Get Funds =================

router.get("/funds", async (req, res) => {

  if (!req.isAuthenticated()) {

    return res.status(401).json({
      success: false,
      message: "Login First",
    });

  }

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

  res.json(funds);

});

module.exports = router;