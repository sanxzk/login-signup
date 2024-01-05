const jwt = require("jsonwebtoken");
const User = require("../../Models/User");
const secretKey = process.env.SECRET_KEY;

const getUser = async (req, res) => {
  let errorCode = null;
  try {
    const authToken = req.header("authToken");
    if (!authToken) {
      errorCode = 400;
      throw new Error("No user found");
    }
    const data = jwt.verify(authToken, secretKey);
    if (!data) {
      errorCode = 400;
      throw new Error("No user found");
    }
    const userId = data.userId;
    const user = await User.findById(userId);
    // console.log(user);
    if (user) {
      res
        .status(200)
        .json({ success: true, message: "user found successfully", user });
    } else {
      errorCode = 400;
      throw new Error("authentication failed");
    }
  } catch (err) {
    return res.status(errorCode || 500).json({
      success: false,
      message: "Internal server Error",
      error: err.message,
    });
  }
};
module.exports = getUser;
