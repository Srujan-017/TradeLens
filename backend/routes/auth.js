const express = require("express");

const passport = require("passport");

const { UserModel } = require("../model/UserModel");

const router = express.Router();

// ================= Signup =================

router.post("/signup", async (req, res) => {

  try {

    const { username, email, password } = req.body;

    const newUser = new UserModel({
      username,
      email,
    });

    const registeredUser = await UserModel.register(
      newUser,
      password
    );

    res.json({
      success: true,
      message: "User Registered Successfully",
      user: registeredUser,
    });

  } catch (err) {

    res.status(400).json({
      success: false,
      message: err.message,
    });

  }

});

// ================= Login =================

router.post("/login", (req, res, next) => {

  passport.authenticate(
    "local",
    (err, user) => {

      if (err) {
        return next(err);
      }

      if (!user) {

        return res.status(401).json({
          success: false,
          message: "Invalid Username or Password",
        });

      }

      req.login(user, (err) => {

        if (err) {
          return next(err);
        }

        return res.json({
          success: true,
          message: "Login Successful",
          user,
        });

      });

    }
  )(req, res, next);

});

// ================= Logout =================

router.get("/logout", (req, res, next) => {

  req.logout((err) => {

    if (err) {
      return next(err);
    }

    res.json({
      success: true,
      message: "Logout Successful",
    });

  });

});

// ================= Current User =================

router.get("/currentUser", (req, res) => {

  if (req.isAuthenticated()) {

    res.json({
      success: true,
      user: req.user,
    });

  } else {

    res.json({
      success: false,
      message: "No User Logged In",
    });

  }

});

module.exports = router;