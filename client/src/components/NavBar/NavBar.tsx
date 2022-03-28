import React from "react";
import Logo from "../Logo/Logo";
import "./NavBar.styles.css";

const NavBar: React.FC = () => {
  const alertPopup = () => {
    alert("This is page is not added yet!");
  };

  return (
    <div className="nav-bar">
      <Logo />
      <div className="nav-links">
        <p onClick={alertPopup}>Features</p>
        <p onClick={alertPopup}>About Me</p>
      </div>
    </div>
  );
};

export default NavBar;
