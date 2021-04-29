const express = require("express");
const router = express.Router();
const {
  login,
  facebookLogin,
  googleLogin,
} = require("../controllers2/authtxt");

router.get("/login", login);
router.post("/facebook", facebookLogin);
router.post("/google", googleLogin);

module.exports = router;
