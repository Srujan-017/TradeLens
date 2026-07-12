require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const { UserModel } = require("./model/UserModel");

const { HoldingsModel } = require("./model/HoldingsModel");

const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");
const holdingRoutes = require("./routes/holdings");
const positionRoutes = require("./routes/positions");
const watchlistRoutes = require("./routes/watchlist");
const fundsRoutes = require("./routes/funds");
const marketRoutes = require("./routes/market");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
console.log(uri);

const app = express();

const allowedOrigins = [
  "http://localhost:3001",
  "https://tradelens-1.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(bodyParser.json());

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "tradelens",

    resave: false,

    saveUninitialized: false,

    cookie: {
      secure: true,
      sameSite: "none",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "TradeLens Backend is Running 🚀",
  });
});

app.use("/", authRoutes);

app.use("/", orderRoutes);
app.use("/", holdingRoutes);
app.use("/", positionRoutes);
app.use("/", watchlistRoutes);
app.use("/", fundsRoutes);
app.use("/", marketRoutes);


app.listen(PORT, () => {
  console.log("App started!");
  mongoose.connect(uri);
  console.log("DB started!");
});
