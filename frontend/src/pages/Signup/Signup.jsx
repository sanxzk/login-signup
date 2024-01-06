import React from "react";
import "./Signup.css";
import SignupText from "../../components/SignupText/SignupText";
import SignupForm from "../../components/SignupForm/SignupForm";

const Signup = () => {
  return (
    <div className="signup-container">
      <SignupText />
      <SignupForm />
    </div>
  );
};

export default Signup;
