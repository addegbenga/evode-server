const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("../middleware/config");
const User = require("../models/User");

const auth = async (req, res, next) => {
  // Get token from header
  let token = req.header("x-auth-token");
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    console.log(req.user);
    next();
  } catch (err) {
    console.log(err + " token is not valid || something wrong with token");
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = { auth };
