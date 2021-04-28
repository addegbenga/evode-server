const express = require("express");
const router = express.Router();

const auth = require('../middleware/verify');

const { getUser } = require('../controllers/user');


//get logged in user
router.get("/me", auth, getUser);



module.exports = router;