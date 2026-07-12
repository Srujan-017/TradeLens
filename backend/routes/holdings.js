const express = require("express");

const router = express.Router();

const { HoldingsModel } = require("../model/HoldingsModel");

// ================= All Holdings =================

router.get("/allHoldings", async (req, res) => {

    if (!req.isAuthenticated()) {

        return res.status(401).json({
            success: false,
            message: "Please Login First",
        });

    }

    try {

        const allHoldings = await HoldingsModel.find({
            userId: req.user._id,
        });

        res.json(allHoldings);

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

});

module.exports = router;