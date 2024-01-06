import React from 'react'
import {useNavigate} from 'react-router-dom'
import "./LoginText.css";

const LoginText = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-text-container">
      <h1>Welcome Back!</h1>
      <p>To keep connected with us please signup with personal info </p>
      <button onClick={()=>{
        navigate('/signup')
      }}> Sign Up</button>
    </div>
  )
}

export default LoginText