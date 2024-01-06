import React from 'react'
import "./Login.css";
import LoginText from "../../components/LoginText/LoginText.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";

const Login = () => {
  return (
    <div className="login-container">
      <LoginText />
      <LoginForm />
    </div>
  );
}

export default Login