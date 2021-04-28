const express = require("express");
const router = express.Router();
const passport = require('passport')

const { auth } = require("../middleware/verify");

const { 
  getUser,
  registerWithPassport, 
  loginWithPassport, 
  updatePassword,
  deleteUser,
  sendResetEmail,
  getResetPassPage,
  updatePasswordWithToken,
  loginWithGithub
} = require("../controllers/auth");

// Get logged in user
router.get("/me", auth, getUser);

// Register with passport
router.post("/register", registerWithPassport);

// Login with Passport
router.post("/login", loginWithPassport);

// Change password
router.put("/passwordChange", auth, updatePassword);

// Delete user function
router.put("/deleteUser", deleteUser);

// Forgot generate password link and send through email
router.post("/forgotpassword", sendResetEmail);

// Get reset password page through the reset email link
router.get("/resetpassword/:resetToken", getResetPassPage);

// Change password with reset token
router.put("/resetpassword/:resetToken", updatePasswordWithToken);

router.get("/github", passport.authenticate("github"));

router.get("/github/callback", passport.authenticate("github"), loginWithGithub);


module.exports = router;
