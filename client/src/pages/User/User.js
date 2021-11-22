import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actionsCreator/auth.actionsCreator";
import { Route, useRouteMatch, Switch } from "react-router-dom";

//components
import Dashboard from "../Dashboard/Dashboard";
import Calculator from "../Calculator/Calculator";
import Wishlist from "../Wishlist/Wishlist";
import Settings from "../Settings/Settings";
import Layout from "../../components/Layout/Layout";
import ClientDashboard from "../ClientDashbaord/ClientDashboard";
import FundDashboard from "../FundDashboard/FundDashboard";
import AddClient from "../AddClient/AddClient";
import AddFund from "../AddFund/AddFund";

//styles
import "./User.styles.css";
//import PrivateRoute from "../../components/private-route/PrivateRoute";

const User = () => {
  let { path } = useRouteMatch();
  return (
    <Route
      render={(props) => (
        <Layout {...props}>
          <Switch>
            <Route exact path={path} component={Dashboard} />
            <Route exact path={`${path}/Calculator`} component={Calculator} />
            <Route exact path={`${path}/Wishlist`} component={Wishlist} />
            <Route exact path={`${path}/Settings`} component={Settings} />
            <Route exact path={`${path}/add-client`} component={AddClient} />
            <Route exact path={`${path}/:client`} component={ClientDashboard} />
            <Route
              exact
              path={`${path}/:client/add-fund`}
              component={AddFund}
            />
            <Route
              exact
              path={`${path}/:client/:fund`}
              component={FundDashboard}
            />
          </Switch>
        </Layout>
      )}
    />
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
