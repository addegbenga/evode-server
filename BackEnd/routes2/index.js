const express = require("express");
const router = express.Router();
const { homePage } = require("../controllers2");

router.get("/", homePage);

module.exports = router;
