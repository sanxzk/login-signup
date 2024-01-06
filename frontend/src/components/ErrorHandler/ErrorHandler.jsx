import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorValueNull } from "../../store/auth/authSlice";

const ErrorHandler = () => {
    const dispatch = useDispatch();
  const {errorMessage} = useSelector((state) => state.auth);
  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
    //   alert(JSON.stringify(errorMessage));
      dispatch(setErrorValueNull());
    }
  }, errorMessage);
  return <div></div>;
};

export default ErrorHandler;
