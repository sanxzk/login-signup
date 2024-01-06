import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import {logout} from "../../store/auth/authSlice"

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  useEffect(() => {
    document.title = "Home | Login Signup Flow";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);
  return (
    <div>
      <h2>{JSON.stringify(user)}</h2>
      <button onClick={()=>{
        dispatch(logout())
      }}> Logout</button>
    </div>
  );
};

export default Home;
