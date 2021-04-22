const express = require("express");
const router = express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require("../middleware/auth");

const { renderWelcomePage, renderDashboard } = require('../controllers/indexController');

// Welcome Page
router.get("/", forwardAuthenticated, renderWelcomePage);

// Dashboard Page
router.get("/dashboard", ensureAuthenticated, renderDashboard);

module.exports = router;
