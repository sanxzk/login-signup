const json = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../Models/User");
const secretKey = process.env.SECRET_KEY;

const Signup = async (req, res) => {
  let errorCode = null;
  try {
    console.log(req.body);
    let { name, email, password } = req.body;
    let alreadyUser = await User.findOne({ email: email.toLowerCase() });
    if (alreadyUser) {
      errorCode = 409;
      throw new Error("Account with same email already exists.");
    }
    alreadyUser = null;
    const securedPassword = bcrypt.hashSync(password, 10);
    const user = new User({
      email: email.toLowerCase(),
      name: name,
      password: securedPassword,
    });
    await user
      .save()
      .then((user) => {
        const data = {
          name: name,
          email: email.toLowerCase(),
          userId: user._id,
        };
        const authToken = json.sign(data, secretKey);
        res.status(201).json({
          success: true,
          message: "User created successfully.",
          authToken,
          user,
        });
      })
      .catch((err) => {
        errorCode = 500;
        throw new Error(err.message);
      });
  } catch (err) {
    res.status(errorCode || 500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
module.exports = Signup;
