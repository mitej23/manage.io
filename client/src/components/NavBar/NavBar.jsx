import React from "react";
import "./NavBar.styles.css";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <div className="landing-logo">
        <p>Manage.io</p>
      </div>
      <div className="nav-links">
        <p>Features</p>
        <p>About Me</p>
      </div>
    </div>
  );
};

export default NavBar;
