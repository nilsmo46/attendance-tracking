const jwtSign = require('./jwt');

const sendTokenResponse = (user, res) => {
  // Create token
  const token = jwtSign(`${user.id}-${user.email}`);

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(200).cookie("token", token, options).json({
    success: true,
    token,
  });
};

module.exports= sendTokenResponse;
