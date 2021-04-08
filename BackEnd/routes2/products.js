const express = require("express");
const User = require("../models/User");
const Product = require("../models/Products");
const { auth } = require("../config/verify");
const router = express.Router();

//get logged in user

router.get("/test", (req, res) => {
  res.json("testingn route reached");
});


module.exports = router;
