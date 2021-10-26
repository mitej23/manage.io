import React from "react";
import "./SideMenu.styles.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/auth.actions";

//icons
import { MdSpaceDashboard } from "react-icons/md";
import { FaCalculator } from "react-icons/fa";
import { BiGitCompare } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";

const SideMenu = ({ logoutUser }) => {
  const onLogoutClick = (e) => {
    e.preventDefault();
    console.log(logoutUser);
    logoutUser();
  };

  return (
    <div className="side-bar">
      <p className="logo">Manage.io</p>
      <div className="sm-logo">
        <p className="sm-logo-text">Manage</p>
        <p className="sm-logo-text">.io</p>
      </div>
      <div className="menu-links">
        <p className="links">
          <MdSpaceDashboard className="fas" />
          Dashboard
        </p>
        <p className="links">
          <FaCalculator className="fas" />
          Calculator
        </p>
        <p className="links">
          <BiGitCompare className="fas" />
          Compare
        </p>
        <p className="links" id="highlight">
          <IoMdSettings className="fas" />
          Settings
        </p>
        <p className="links" id="exit" onClick={onLogoutClick}>
          <FiLogOut className="fas" />
          Log out
        </p>
      </div>
    </div>
  );
};

SideMenu.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(SideMenu);
