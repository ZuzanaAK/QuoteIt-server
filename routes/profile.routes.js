const express = require("express");
const router = express.Router();

const UserModel = require("../models/User.model");
const QuoteModel = require("../models/Quote.model");

const { isLoggedIn } = require('../helpers/auth-helper'); // this is the middleware to check if user is loggedIn

//for user to access their own profile
router.get("/profile", isLoggedIn, (req, res) => {
  let userData = req.session.loggedInUser._id;
  console.log("userData is: ", userData)
  // console.log("req.session is: ", req.session)
  // console.log("req.session.loggedInUser is: ", req.session.loggedInUser)

  UserModel.findById(userData)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      })
    })
})


module.exports = router;