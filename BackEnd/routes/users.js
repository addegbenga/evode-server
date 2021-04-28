const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/verify");

const { ensureAuthenticated } = require("../middleware/auth");

const { 
  getUser, 
  renderLoginView, 
  renderRegisterView,
  render2factAuth,
  registerWithPassport,
  loginWithPassport,
  renderChangePassView,
  updatePassword,
  renderDeleteView,
  deleteUser,
  renderForgottenPassView,
  emailForgottenPass,
  renderResetPassView,
  resetPasswordWithToken,
  logOut
} = require('../controllers/user');


//get logged in user
router.get("/me", auth, getUser);



module.exports = router;


/*

// Register with passport
router.post("/register", registerWithPassport);

// Login with Passport
router.post("/login", loginWithPassport);

// Change password
router.put("/passwordChange", ensureAuthenticated, updatePassword);

// Delete user function
router.put("/deleteUser", ensureAuthenticated, deleteUser);

// Forgot generate password link and send through email
router.post("/forgotpassword", emailForgottenPass);

// Change password with reset token
router.put("/resetpassword/:resettoken", resetPasswordWithToken);

//Log out
router.get("/logout", logOut);

// Render Login View
router.get("/login", renderLoginView);

// Render Register View
router.get("/register", renderRegisterView);

// 2 factor authenticator
router.get("/setup-2fa", render2factAuth);

// Delete user View
router.get("/delete", ensureAuthenticated, renderDeleteView);

// Change Password page
router.get("/passwordChange", ensureAuthenticated, renderChangePassView);

// Get forgot password page
router.get("/forgotPassword", renderForgottenPassView);

// Get reset password page through the reset email link
router.get("/resetpassword/:resetToken", renderResetPassView);

*/
