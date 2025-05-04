import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="khally-loader-wrapper">
      <div className="spinner-box">
        <div className="pulse-ring"></div>
        <div className="heart-pillow"></div>
      </div>
      <p className="loading-text">Preparing comfort for you...</p>
    </div>
  );
};

export default Loading;

