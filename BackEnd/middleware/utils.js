//jwt token utils
const sendTokenResponse = (user, statuscode, res) => {
  const token = user.getRefreshToken();

  const options = {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statuscode).cookie("refreshToken", token, options).json({
    msg: "woah valid credentials",
    data: user,
    token,
  });
};

module.exports = { sendTokenResponse };
