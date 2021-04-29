const fetch = require("node-fetch");
const Users = require("../models/User");

const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const client = new OAuth2(process.env.GOOGLE_CLIENT_ID);

const { CLIENT_URL } = process.env;
const { sendTokenResponse } = require("../middleware/utils");

exports.login = (req, res) => {
  res.render("login");
};

exports.facebookLogin = async (req, res) => {
  const { accessToken, userID } = req.body;
  console.log(req.body);
  try {
    const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

    const data = await fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        return res;
      });

    const { email, name, picture } = data;

    const password = email + process.env.FACEBOOK_SECRET;
    const user = await Users.findOne({ email });

    if (user) {
      const validate = await user.matchPassword(password);
      if (!validate) {
        return res.status(400).json({ msg: "Password is incorrect." });
      }

      sendTokenResponse(user, 200, res);
    } else {
      const newUser = new Users({
        name,
        email,
        password,
        avatar: picture.data.url,
      });

      await newUser.save();

      sendTokenResponse(user, 200, res);
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//google login
exports.googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;
    const verify = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email_verified, email, name, picture } = verify.payload;
    const password = email + process.env.GOOGLE_CLIENT_SECRET;
    if (!email_verified) {
      return res.status(400).json({ msg: "Email verification failed." });
    }
    const user = await Users.findOne({ email });
    if (user) {
      const validate = await user.matchPassword(password);
      if (!validate) {
        return res.status(400).json({ msg: "Password is incorrect." });
      }
      sendTokenResponse(user, 200, res);
    } else {
      const newUser = new Users({
        name,
        email,
        password,
        avatar: picture,
      });
      await newUser.save();
      sendTokenResponse(user, 200, res);
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
