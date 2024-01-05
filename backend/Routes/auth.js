const express = require("express");
const Login = require("./auth/Login");
const Signup = require("./auth/Signup");
const getUser = require("./auth/getUser");

const router = express.Router();

router.post("/Login", Login);

router.post("/signup", Signup);

router.get("/getUser", getUser);

module.exports = router;
