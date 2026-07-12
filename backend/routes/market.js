const express = require("express");

const YahooFinance = require("yahoo-finance2").default;


const router = express.Router();

// Create YahooFinance instance
const yahooFinance = new YahooFinance({
  suppressNotices: ["yahooSurvey"],
});

router.get("/market/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase() + ".NS";

    const quote = await yahooFinance.quote(symbol);

    res.json({
      success: true,
      symbol: quote.symbol,
      name: quote.shortName,
      price: quote.regularMarketPrice,
      change: quote.regularMarketChangePercent,
      currency: quote.currency,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
});

module.exports = router;