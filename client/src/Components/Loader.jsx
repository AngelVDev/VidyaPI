import React from "react";
import "./Styles/Loader.css";

const Loader = () => {
  return (
    <div id="LoaderContainer">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
