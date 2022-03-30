import React from "react";
import "./SideMenu.styles.css";
import { useLocation, useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actionsCreator/auth.actionsCreator";

//icons
import { MdSpaceDashboard } from "react-icons/md";
import { FaCalculator } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { BsBookmarksFill } from "react-icons/bs";
import { HiSearch } from "react-icons/hi";
import Logo from "../Logo/Logo";

const SideMenu = ({ logoutUser }) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const strings = ["Wish", "Calc", "Settings", "search"];

  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
  };

  const backToDashboard = () => {
    history.push("/user");
  };

  return (
    <div className="side-bar">
      <div className="logo">
        <Logo onClick={backToDashboard}>Manage.io</Logo>
      </div>
      <div className="menu-links">
        <Link to="/user/search" style={{ textDecoration: "none" }}>
          <p
            className="links"
            id={pathname.includes("search") ? "highlight" : ""}
          >
            <HiSearch className="fas" />
            Search
          </p>
        </Link>
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
