import React from "react";
import "./background.css";
import RedTriangle from "../../assets/images/triangle.png";
import YellowCircle from "../../assets/images/yellow-circle.png";
const Background = () => {
  return (
    <div className="background-container">
      <img
        className="background-red-triangle"
        alt="red-triangle"
        src={RedTriangle}
      />
      <img
        className="background-yellow-circle"
        alt="yellow-circle"
        src={YellowCircle}
      />
    </div>
  );
};

export default Background;
