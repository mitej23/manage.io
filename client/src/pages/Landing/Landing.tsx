import React from "react";
import "./Landing.styles.css";
import { Link } from "react-router-dom";

const Landing = () => {
  console.log("Landing");

  return (
    <div>
      <h4>
        <b>Build</b> a login/auth app with the{" "}
        <span style={{ fontFamily: "monospace" }}>MERN</span>
        stack from scratch
      </h4>
      <Link to="/register">Register</Link>
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
    </div>
  );
};

export default Landing;
