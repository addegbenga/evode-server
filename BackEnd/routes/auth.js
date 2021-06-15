const express = require("express");
const router = express.Router();

const auth = require("../middleware/verify");

// Load Controllers
const {
  registration,
  getUser,
  login,
  vote,
  aspirant,
  getUsers,
  createAllStudent,
  updateAllStudent,
  getAspirants
} = require("../controllers/auth");

router.post("/register", registration);
router.post("/login", login);
router.get("/me", getUser);
router.post("/vote", auth, vote);
router.post("/create", aspirant);
router.get("/getusers", getUsers);
router.get("/getuser", auth, getUser);
router.get("/aspirants", getAspirants);
router.post("/bulk", createAllStudent);
router.post("/updatebulk", updateAllStudent);

module.exports = router;
