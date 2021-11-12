import React from "react";
import "./SideMenu.styles.css";
import { useLocation, useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/auth.actions";

//icons
import { MdSpaceDashboard } from "react-icons/md";
import { FaCalculator } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { BsBookmarksFill } from "react-icons/bs";

const SideMenu = ({ logoutUser }) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const strings = ["Wish", "Calc", "Settings"];

  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
  };

  const backToDashboard = () => {
    history.push("/user");
  };

  return (
    <div className="side-bar">
      <p className="logo" onClick={backToDashboard}>
        Manage.io
      </p>
      <div className="sm-logo" onClick={backToDashboard}>
        <p className="sm-logo-text">Manage</p>
        <p className="sm-logo-text">.io</p>
      </div>
      <div className="menu-links">
        <Link to="/user" style={{ textDecoration: "none" }}>
          <p
            className="links"
            id={!strings.some((el) => pathname.includes(el)) ? "highlight" : ""}
          >
            <MdSpaceDashboard className="fas" />
            Dashboard
          </p>
        </Link>
        <Link
          to="/user/Calculator"
          style={{ textDecoration: "none", color: "none" }}
        >
          <p
            className="links"
            id={pathname.includes("Calculator") ? "highlight" : ""}
          >
            <FaCalculator className="fas" />
            Calculator
          </p>
        </Link>
        <Link to="/user/Wishlist" style={{ textDecoration: "none" }}>
          <p
            className="links"
            id={pathname.includes("Wishlist") ? "highlight" : ""}
          >
            <BsBookmarksFill className="fas" />
            Wishlist
          </p>
        </Link>
        <Link to="/user/Settings" style={{ textDecoration: "none" }}>
          <p
            className="links"
            id={pathname.includes("Settings") ? "highlight" : ""}
          >
            <IoMdSettings className="fas" />
            Settings
          </p>
        </Link>
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
