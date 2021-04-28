const express = require("express");
const router = express.Router();
const auth = require("../middlewares/verify");

// Load Controllers
const { activate, verify, validate } = require("../controllers/2fa");

//activate 2fa
router.get("/activate", auth, activate);

//verify 2fa account
router.put("/verify", auth, verify);

//validate 2fa account
router.post("/validate", auth, validate);

module.exports = router;
