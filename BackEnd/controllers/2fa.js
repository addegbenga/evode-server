const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { auth } = require("../config/verify");
const qrcode = require("qrcode");
const crypto = require("crypto");
const speakeasy = require("speakeasy");

//get logged in user

//activate 2fa for a user

exports.activate = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    const temp_secret = speakeasy.generateSecret();
    const fieldToUpdate = {
      tempSecret: temp_secret,
    };
    user = await User.findByIdAndUpdate(req.user.id, fieldToUpdate, {
      new: true,
      runValidators: true,
    });

    const barcode = await qrcode.toDataURL(user.tempSecret.otpauth_url);
    res.json({ success: true, data: user.tempSecret.base32, url: barcode });
  } catch (error) {
    console.log(error);
  }
};

//verify token and make secret permanent

exports.verify = async (req, res) => {
  const { token } = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.json({ error: "User not authorized" });
    }

    const { base32: secret } = user.tempSecret;
    console.log(secret);
    const verified = speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
    });
    console.log(verified);
    if (verified) {
      const fieldToUpdate = {
        secret: user.tempSecret,
        hookEnabled: false,
      };
      user = await User.findByIdAndUpdate(req.user.id, fieldToUpdate, {
        new: true,
        runValidators: true,
      });
      user.tempSecret = undefined;
      await user.save();

      return res.json({ msg: "verification succesfull" });
    } else {
      return res.json({ error: "verification failed" });
    }
  } catch (error) {
    console.log(error);
  }
};

//routeto validate the user

exports.validate = async (req, res) => {
  const { token } = req.body;
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.json({ error: "User not authorized" });
    }

    const { base32: secret } = user.secret;

    const tokenValidate = speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
      window: 1,
    });
    if (tokenValidate) {
      return res.json({ msg: "validated true", data: user.secret });
    } else {
      return res.json({ error: "validated false" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = router;
