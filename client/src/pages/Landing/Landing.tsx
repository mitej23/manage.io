import React from "react";
import "./Landing.styles.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="nav-bar">
        <div className="landing-logo">
          <p>Manage.io</p>
        </div>
        <div className="nav-links">
          <p>Features</p>
          <p>About Me</p>
        </div>
      </div>
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

/* <Link to="/register">Register</Link>
        <br />
        <br />
        <Link
          to="/login"
          style={{
            width: "140px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
          }}
        >
          Log In
        </Link>
        <button type="submit" id="submit" className="btn">
          Add Client
        </button> */

export default Landing;
