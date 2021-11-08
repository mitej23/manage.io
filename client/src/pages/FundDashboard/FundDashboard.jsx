import React from "react";
import "./FundDashboard.styles.css";

import { useHistory, Link } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";

import { useQuery } from "react-query";
import axios from "axios";
import moment from "moment";

const FundDashboard = () => {
  const history = useHistory();
  const { pathname, fund } = history.location;
  const code = pathname.split("-").pop();

  const { data, isLoading } = useQuery(code, () => {
    return axios.get(
      `/api/fund?code=${code}&doi=${moment(fund.dateOfInvestment).format(
        "DD-MM-yyyy"
      )}`
    );
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || !fund) {
    return <div>No data</div>;
  }
  // calculate percentage increase
  if (data && fund) {
    const currNavValue = data.data.data.data[0].nav;
    const prevNavValue = data.data.data.data[1].nav;
    const oldNavValue = data.data.timeOfInv[0].nav;
    const percentageInc = ((currNavValue - oldNavValue) / oldNavValue) * 100;

    const amtInvested = parseFloat(fund.amtInvested);
    // calculate total return
    const totalRet = (percentageInc * amtInvested) / 100;

    console.log(amtInvested + parseInt(totalRet));

    return (
      <div>
        <BackButton text={"Client's Dashboard"} />
        <div className="fund-head-section">
          <div className="fund-head-left">
            <p className="fund-name">{fund.fundName}</p>
            <div className="fund-nav">
              <p className="fund-nav-value">
                ${parseFloat(currNavValue).toFixed(2)}
              </p>
              <p className="fund-nav-growth">+ 57.85 ( 62.35% ) 1y </p>
            </div>
          </div>
          <div className="fund-head-right">
            <div className="fund-total-inv">
              <p>${(amtInvested + totalRet).toFixed(2)}</p>
            </div>

            <div className="total-inv-growth">
              <div className="up-arrow-icon"></div>
              <p>{parseFloat(totalRet).toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="fund-graph">
          <canvas id="myChart"></canvas>
        </div>
        <div className="graph-timeline-conatiner">
          <p>1D</p>
          <p className="select">1M</p>
          <p>1Y</p>
          <p>3Y</p>
        </div>
        <div className="fund-overview">
          <div className="fund-overview-title">
            <p>Overview</p>
          </div>
          <div className="fund-overview-content">
            <div className="fund-overview-left">
              <div className="overview-value-container">
                <div className="overview-value-left">
                  <p>Total Investment:</p>
                </div>
                <div className="overview-value-right">
                  <p>${(amtInvested + totalRet).toFixed(2)}</p>
                </div>
              </div>
              <div className="overview-value-container">
                <div className="overview-value-left">
                  <p>Total Gain:</p>
                </div>
                <div className="overview-value-right">
                  <p>${totalRet.toFixed(2)}</p>
                </div>
              </div>
              <div className="overview-value-container">
                <div className="overview-value-left">
                  <p>Date of Investment:</p>
                </div>
                <div className="overview-value-right">
                  <p>{`${moment(fund.dateOfInvestment).format(
                    "DD-MM-yyyy"
                  )}`}</p>
                </div>
              </div>
              <div className="overview-value-container">
                <div className="overview-value-left">
                  <p>Percentage Gain:</p>
                </div>
                <div className="overview-value-right">
                  <p>{percentageInc.toFixed(2)}%</p>
                </div>
              </div>
            </div>
            <div className="fund-overview-divider"></div>
            <div className="fund-overview-right">
              <div className="overview-value-container">
                <div className="overview-value-left">
                  <p>Net Asset Value:</p>
                </div>
                <div className="overview-value-right">
                  <p>${parseFloat(currNavValue).toFixed(2)}</p>
                </div>
              </div>
              <div className="overview-value-container">
                <div className="overview-value-left">
                  <p>All Time Value:</p>
                </div>
                <div className="overview-value-right">
                  <p>${parseFloat(data.data.highest).toFixed(2)}</p>
                </div>
              </div>
              <div className="overview-value-container">
                <div className="overview-value-left">
                  <p>All Time Low:</p>
                </div>
                <div className="overview-value-right">
                  <p>${parseFloat(data.data.lowest).toFixed(2)}</p>
                </div>
              </div>
              <div className="overview-value-container">
                <div className="overview-value-left">
                  <p>Previous Value:</p>
                </div>
                <div className="overview-value-right">
                  <p>${parseFloat(prevNavValue).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default FundDashboard;
