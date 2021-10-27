import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/auth.actions";
import { BrowserRouter, Route, useRouteMatch, Switch } from "react-router-dom";

//components
import Dashboard from "../Dashboard/Dashboard";
import Calculator from "../Calculator/Calculator";
import Wishlist from "../Wishlist/Wishlist";
import Settings from "../Settings/Settings";
import Layout from "../../components/Layout/Layout";

//styles
import "./User.styles.css";
//import PrivateRoute from "../../components/private-route/PrivateRoute";

const User = ({ logoutUser, auth }) => {
  let { path } = useRouteMatch();
  console.log(auth);
  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <Layout {...props}>
            <Switch>
              <Route exact path={path} component={Dashboard} />
              <Route exact path={`${path}/Calculator`} component={Calculator} />
              <Route exact path={`${path}/Wishlist`} component={Wishlist} />
              <Route exact path={`${path}/Settings`} component={Settings} />
            </Switch>
          </Layout>
        )}
      />
    </BrowserRouter>
  );
};

User.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(User);
