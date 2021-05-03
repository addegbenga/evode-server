const express = require("express");
const router = express.Router();

const auth = require("../middleware/verify");

// Load Controllers
const {
  googleLogin,
  registration,
  facebookLogin,
  githubLogin,
  getUser,
  login,
} = require("../controllers/auth");

//middlewares for checking status code

router.use("/login", (req, res, next) => {
  console.log(req.statusCode);
  next();
});

// Google Login
router.post("/googlelogin", googleLogin);
router.post("/githublogin", githubLogin);
router.post("/facebooklogin", facebookLogin);
router.post("/register", registration);
router.post("/login", login);
router.get("/me", getUser);

module.exports = router;
