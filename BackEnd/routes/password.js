const express = require("express");
const router = express.Router();

const auth = require("../middleware/verify");

// Load Controllers
const {
  activateAccount,
  forgotPassword,
  resetPassword,
} = require("../controllers/password");


router.post("/emailverification", activateAccount);
router.put("/forgotpassword", forgotPassword);
router.put("/resetpassword/:reset_token", resetPassword);

module.exports = router