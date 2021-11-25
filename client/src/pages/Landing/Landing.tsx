import React from "react";
import "./Landing.styles.css";
import { Link } from "react-router-dom";

import NavBar from "../../components/NavBar/NavBar";

const Landing: React.FC = () => {
  return (
    <div className="landing-page">
      <NavBar />
      <div className="landing-container">
        <p className="main-text">Manage your client's</p>
        <p className="cursive-text">Mutual Funds</p>
        <div className="landing-buttons">
          <Link to="/login" className="landing-button slide_down">
            Log In
          </Link>
          <Link to="/register" className="landing-button slide_down">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
