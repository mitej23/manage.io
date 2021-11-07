import React from "react";
import "./ClientDashbaord.styles.css";
import { useHistory, Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { FiChevronLeft } from "react-icons/fi";
import BackButton from "../../components/BackButton/BackButton";

const ClientDashboard = ({ auth }) => {
  const history = useHistory();
  const { pathname } = history.location;
  const lastPath = pathname.split("/").pop() + ".com";

  const { data, isLoading } = useQuery(["client-data", lastPath], () => {
    return axios.get(
      `/api/agents/client?agentEmail=${auth.user.email}&clientEmail=${lastPath}`
    );
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BackButton text={"Dashboard"} />
      <div className="container-title">
        <p>{data.data.clientName.split(" ")[0]}'s Dashboard</p>
      </div>
      <div className="dashboard-overview-container">
        <div className="dashboard-overview-line">
          <canvas id="myChart"></canvas>
        </div>
        <div className="dashboard-overview-pie">
          <div className="pie-chart-text-inside">
            <span className="pie-chart-text-total">
              ${data.data.totalInvested}
            </span>
            {/* <Br /> */}
            <span className="pie-chart-text-growth">+$4000</span>
          </div>

          <canvas id="pie-chart"></canvas>
        </div>
      </div>
      <div className="portfolio-head">
        <div className="container-title portfolio-title">
          <p>Portfolio</p>
        </div>
        <Link
          to={{
            pathname: `${pathname}/add-fund`,
            state: data.data.clientName.split(" ")[0],
          }}
          className="add-fund-btn"
        >
          <p>+ Add Fund</p>
        </Link>
      </div>
      <div className="portfolio-container">
        <div className="portfolio-container-head">
          <p className="portfolio-fund-name">Fund Name</p>
          <p className="portfolio-fund-right">Net Profit / Loss</p>
          <p className="portfolio-fund-right">Current Value</p>
        </div>
        <div className="portfolio-container-content">
          {data.data.funds.map((fund) => {
            return (
              <Link
                className="portfolio-fund"
                style={{ textDecoration: "none", color: "black" }}
                to={{
                  pathname: `${pathname}/${fund.fundName}-${fund.code}`,
                  fund: fund,
                }}
              >
                <p className="portfolio-fund-name">{fund.fundName}</p>
                <p className="portfolio-fund-right">+3000</p>
                <p className="portfolio-fund-right">{fund.amtInvested}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

ClientDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, null)(ClientDashboard);
