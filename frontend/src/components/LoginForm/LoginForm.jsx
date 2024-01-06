import React, { useEffect, useState } from "react";
import Facebook from "../../assets/images/facebook.png";
import GooglePlus from "../../assets/images/google-plus.png";
import Linkedin from "../../assets/images/linkedin.png";
import { useDispatch, useSelector } from "react-redux";
import { AuthLogin } from "../../store/auth/authSlice";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn , isLoading} = useSelector((state) => state.auth);
  const [userDetail, setUserDetail] = useState({
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
    dispatch(AuthLogin(userDetail));
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <div className="loginForm-container">
      <h1> Sign In To Your Account</h1>
      <div className="auth-icons">
        <img alt="facebook-icon" src={Facebook} />
        <img alt="google-plus-icon" src={GooglePlus} />
        <img alt="linkedin-icon" src={Linkedin} />
      </div>
      <p> or use your email for registration</p>
      <form onSubmit={submitHandler}>
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
          <button type="submit"> Login</button>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
