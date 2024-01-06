import React, { useState, useEffect } from "react";
import Facebook from "../../assets/images/facebook.png";
import GooglePlus from "../../assets/images/google-plus.png";
import Linkedin from "../../assets/images/linkedin.png";
import { useDispatch, useSelector } from "react-redux";
import { AuthSignup } from "../../store/auth/authSlice";
import validator from "validator";
import { useNavigate } from "react-router-dom";

import "./SignupForm.css";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);

  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserDetail((prevValue) => ({ ...prevValue, [name]: value }));
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (validator.isEmpty(userDetail.name.trim())) {
      alert("enter a valid name");
      return;
    }
    if (!validator.isEmail(userDetail.email.trim())) {
      alert("enter a valid email");
      return;
    }
    if (!validator.isStrongPassword(userDetail.password.trim())) {
      alert("enter a strong password");
      return;
    }
    dispatch(AuthSignup(userDetail));
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);
  return (
    <div className="signupForm-container">
      <h1> Create Account</h1>
      <div className="auth-icons">
        <img alt="facebook-icon" src={Facebook} />
        <img alt="google-plus-icon" src={GooglePlus} />
        <img alt="linkedin-icon" src={Linkedin} />
      </div>
      <p> or use your email for registration</p>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="name"
          value={userDetail.name}
          onChange={handleChange}
          placeholder="👤 Name"
        />
        <input
          type="email"
          name="email"
          value={userDetail.email}
          onChange={handleChange}
          placeholder="✉️ Email"
        />
        <input
          type="password"
          name="password"
          value={userDetail.password}
          onChange={handleChange}
          placeholder="🔒 Password"
        />
        {isLoading ? (
          <button style={{ backgroundColor: "grey" }}> Loading...</button>
        ) : (
          <button type="submit"> Signup</button>
        )}
      </form>
    </div>
  );
};

export default SignupForm;
