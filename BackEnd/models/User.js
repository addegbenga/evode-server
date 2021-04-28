const crypto = require("crypto");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    socialID: {
      type: String
    },
    name: {
      type: String,
      required: [true, "Please enter your name!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email!"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password!"],
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    },
    role: {
      type: Number,
      default: 0, // 0 = user, 1 = admin
    },
    sessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session",
      }
    ],
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      }
    ],
    tempSecret: {
      type: Object,
    },
    secret: {
      type: Object,
    },
    hookEnabled: {
      type: Boolean,
      default: true,
    },
    history: {
      type: Array,
      default: [],
    },
    resetPassword: String,
    resetPasswordExpire: String,
  },
  {
    timestamps: true,
  }
);

//Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (this.hookEnabled) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } else {
    this.hookEnabled = undefined;
    next();
  }
});

//Password matcher
userSchema.methods.matchPassword = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
};

//generate and hash usr pass
userSchema.methods.getResetPasswordToken = function () {
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

//sign jwt with refresh token
userSchema.methods.getRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

//sign jwt with activation token
userSchema.methods.getActivationToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACTIVATION_TOKEN_SECRET,
    {
      expiresIn: "5m",
    }
  );
};


module.exports = mongoose.model("User", userSchema);
