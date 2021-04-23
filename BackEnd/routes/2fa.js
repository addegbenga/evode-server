const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/verify");

const { activate2faAuth, verifyToken, validateUser } = require('../controllers/2fa');

// Activate 2fa for a user
router.post("/activate", auth, activate2faAuth);

// Verify token and make secret permanent
router.post("/verify", auth, verifyToken);

// Route to validate the user
router.post("/validate", auth, validateUser);

module.exports = router;
