const express = require("express");

const router = express.Router();

const { WatchlistModel } = require("../model/WatchlistModel");

// ================= Get Watchlist =================

router.get("/watchlist", async (req, res) => {

    if (!req.isAuthenticated()) {

        return res.status(401).json({
            success: false,
            message: "Please Login First",
        });

    }

    try {

        const watchlist = await WatchlistModel.find({

            userId: req.user._id,

        });

        res.json(watchlist);

    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message,

        });

    }

});

// ================= Add Stock =================

router.post("/watchlist", async (req, res) => {

    if (!req.isAuthenticated()) {

        return res.status(401).json({
            success: false,
            message: "Please Login First",
        });

    }

    try {

        const existingStock = await WatchlistModel.findOne({

            userId: req.user._id,
            name: req.body.name,

        });

        if (existingStock) {

            return res.json({

                success: false,
                message: "Stock already exists in Watchlist",

            });

        }

        const newStock = new WatchlistModel({

            userId: req.user._id,

            name: req.body.name,

            price: req.body.price,

            percent: req.body.percent,

            isDown: req.body.isDown,

        });

        await newStock.save();

        res.json({

            success: true,

            message: "Stock Added Successfully",

        });

    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message,

        });

    }

});

// ================= Delete Stock =================

router.delete("/watchlist/:name", async (req, res) => {

    if (!req.isAuthenticated()) {

        return res.status(401).json({
            success: false,
            message: "Please Login First",
        });

    }

    try {

        await WatchlistModel.deleteOne({

            userId: req.user._id,

            name: req.params.name,

        });

        res.json({

            success: true,

            message: "Stock Removed",

        });

    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message,

        });

    }

});

module.exports = router;