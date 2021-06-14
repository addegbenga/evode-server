const jwt = require("jsonwebtoken");
const {User} = require("../models/User");

const auth = async (req, res, next) => {
  //get token from cookies

  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    req.user = await User.findById(decoded._id);
    next();
  } catch (err) {
    console.log(err + " token is not valid || something wrong with token");
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = auth;
