import React from "react";
import "./ClientDashbaord.styles.css";
import { useHistory, useLocation, Link } from "react-router-dom";

import { FiChevronLeft } from "react-icons/fi";

const ClientDashboard = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const { state } = useLocation();

  console.log(state.client);

  const backToDashboard = () => {
    history.push("/user");
  };

  return (
    <div>
      {/* <h1>Clients Dashboard</h1>
      button to go to add client
      <button
        onClick={() => {
          history.push(`${pathname}/add-fund`);
        }}
      >
        Add Fund
      </button>
      <button
        onClick={() => {
          history.push(`${pathname}/hdfc-fund`);
        }}
      >
        Check fund
      </button> */}
      <div className="back" onClick={backToDashboard}>
        <FiChevronLeft style={{ marginTop: "2px" }} />
        <p className="back-text ">Dashboard</p>
      </div>
      <div className="container-title">
        <p>{state.client.clientName.split(" ")[0]}'s Dashboard</p>
      </div>
      <div className="dashboard-overview-container">
        <div className="dashboard-overview-line">
          <canvas id="myChart"></canvas>
        </div>
        <div className="dashboard-overview-pie">
          <div className="pie-chart-text-inside">
            <span className="pie-chart-text-total">
              ${state.client.totalInvested}
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
            state: state.client.clientName.split(" ")[0],
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
          {state.client.funds.map((fund) => {
            return (
              <Link
                className="portfolio-fund"
                style={{ textDecoration: "none", color: "black" }}
                to={{
                  pathname: `${pathname}/${fund.fundName}`,
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

export default ClientDashboard;
