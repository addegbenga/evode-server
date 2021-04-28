const passport = require("passport");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const User = require("../models/User");

const { sendTokenResponse } = require("../middleware/utils");

const { sendEmail } = require("../middleware/email");

const {
  loginValidations,
  registerValidations,
  changePasswordValidation,
  resetPasswordValidation,
} = require("../middleware/validation");

//Email tester site
let transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e4ce1728960690",
    pass: "8664c19d1f8ea9",
  },
});

class UserController {
    async getUser(req, res) {
        try {
          const user = await User.findById(req.user.id);
          if (!user) {
            return res.json({ msg: "user not found" });
          }
          res.json(user);
        } catch (error) {
          console.log(error);
        }
    }
    
}

module.exports = new UserController();