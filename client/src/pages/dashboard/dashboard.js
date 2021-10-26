import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/auth.actions";

//components
import SideMenu from "../../components/SideMenu/SideMenu";

//styles
import "./dashboard.styles.css";

const dashboard = ({ logoutUser }) => {
  // const onLogoutClick = (e) => {
  //   e.preventDefault();
  //   logoutUser();
  // };

  return (
    <div className="page">
      <SideMenu />
      <div className="content">
        <h1>Dashbaord</h1>
      </div>
    </div>
  );
};

dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(dashboard);
