const User = require("../models/User");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendTokenResponse } = require("../middleware/utils");
const { sendEmail } = require("../middleware/email");

//forgot passowrd
exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json({ error: "no user with that email" });
  }
  const resetToken = user.getResetPasswordToken();
  console.log(resetToken);
  console.log(user);
  await user.save({
    validateBeforeSave: false,
  });
  const resetUrl = `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;
  console.log(resetUrl);
  const message = `you are receiving this email cux you requsted for a forgot password: \n\n   ${resetUrl}`;

  try {
    await sendEmail(
      user.email,
      "Reset your password",
      {
        name: "new charge",
        link: resetUrl,
      },
      "../helpers/templates/resetPassword.ejs"
    );
    return res.json({ msg: "Email sent successfully, check your ibox" });
  } catch (error) {
    console.log(error);
    (user.resetPasswordToken = undefined),
      (user.resetPasswordExpire = undefined);
    await user.save({ validateBeforeSave: false });

    return res.json({
      error:
        "cant send email at the moment make sure are connected to the intenet ",
    });
  }
};

//activate account
//activate user account
exports.activateAccount = async (req, res) => {
  try {
    const { activation_token } = req.body;
    const user = jwt.verify(
      activation_token,
      process.env.ACTIVATION_TOKEN_SECRET
    );
    console.log(user.user);

    const { name, email, password } = user.user;
    console.log(name + "hgdjgwjj");

    const check = await User.findOne({ email });
    if (check)
      return res.status(400).json({ msg: "This email already exists." });

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    res.json({ msg: "Account has been activated!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//reset password
exports.resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.reset_token)
      .digest("hex");
    // const user = await User.findOne({
    //   resetPasswordToken,
    //   resetPasswordExpire: { $gt: Date.now() },
    const user = await User.findOne({
      resetPasswordToken: resetPasswordToken,
    });
    // });
    if (!user) {
      return res.status(400).send("invalid token");
    }

    //set the new password

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.log(err);
  }
};
