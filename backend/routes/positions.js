const express = require("express");

const router = express.Router();

const { PositionsModel } = require("../model/PositionsModel");

// ================= All Positions =================

router.get("/allPositions", async (req, res) => {

    try {

        const allPositions = await PositionsModel.find({});

        res.json(allPositions);

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

});

module.exports = router;