const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    tempSecret: {
      type: Object,
    },
    secret: {
      type: Object,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

//Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Password matcher
UserSchema.methods.matchPassword = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
};

//generate and hash usr pass
UserSchema.methods.getResetPasswordToken = function () {
  //Generate Token

  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hash token and set to resetPassowrd field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //set expire

  this.resetPasswordExpire = Date.now(10 * 60 * 1000);
  return resetToken;
};

//sign jwt
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2days",
    }
  );
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
