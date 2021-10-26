import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/auth.actions";

const dashboard = ({ logoutUser }) => {
  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={onLogoutClick}>Logout</button>
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
