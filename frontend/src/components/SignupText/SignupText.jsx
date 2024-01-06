import React from "react";
import {useNavigate} from 'react-router-dom'
import "./SignupText.css";

const SignupText = () => {
  const navigate = useNavigate();
  return (
    <div className="signup-text-container">
      <h1>Welcome Back!</h1>
      <p>To keep connected with us please login with personal info </p>
      <button onClick={()=>{
        navigate('/login')
      }}> Sign In</button>
    </div>
  );
};

export default SignupText;
