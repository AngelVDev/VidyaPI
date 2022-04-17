import React from "react";
import { Link } from "react-router-dom";
import "./Styles/Landing.css";

const Landing = () => {
  return (
    <div className="Front">
    <div className="GLASS">
      <h1 className="Font">GAMER'S CAVE</h1>
      <Link to="/home">
        <button className="Button">Press START</button>
      </Link>
    </div>
    </div>
  );
};

export default Landing;