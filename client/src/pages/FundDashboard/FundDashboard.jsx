import React from "react";
import "./FundDashboard.styles.css";

import { useHistory, Link } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";

import { useQuery } from "react-query";
import axios from "axios";

const FundDashboard = () => {
  const history = useHistory();
  const { pathname, fund } = history.location;
  const code = pathname.split("-").pop();

  console.log(fund);

  const { data, isLoading } = useQuery(code, () => {
    return axios.get(`/api/fund?code=${code}`);
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if(!data) {
    return <div>No data</div>
  }

  return (
    <div>
      <BackButton text={"Client's Dashboard"} />
      <div class="fund-head-section">
        <div class="fund-head-left">
          <p class="fund-name">{fund.fundName}</p>
          <div class="fund-nav">
            <p class="fund-nav-value">$340</p>
            <p class="fund-nav-growth">+ 57.85 ( 62.35% ) 1y </p>
          </div>
        </div>
        <div class="fund-head-right">
          <div class="fund-total-inv">
            <p>$40000</p>
          </div>

          <div class="total-inv-growth">
            <div class="up-arrow-icon"></div>
            <p>4000</p>
          </div>
        </div>
      </div>
      <div class="fund-graph">
        <canvas id="myChart"></canvas>
      </div>
      <div class="graph-timeline-conatiner">
        <p>1D</p>
        <p class="select">1M</p>
        <p>1Y</p>
        <p>3Y</p>
      </div>
      <div class="fund-overview">
        <div class="fund-overview-title">
          <p>Overview</p>
        </div>
        <div class="fund-overview-content">
          <div class="fund-overview-left">
            <div class="overview-value-container">
              <div class="overview-value-left">
                <p>Total Investment:</p>
              </div>
              <div class="overview-value-right">
                <p>$36000</p>
              </div>
            </div>
            <div class="overview-value-container">
              <div class="overview-value-left">
                <p>Total Gain:</p>
              </div>
              <div class="overview-value-right">
                <p>$4000</p>
              </div>
            </div>
            <div class="overview-value-container">
              <div class="overview-value-left">
                <p>Date of Investment:</p>
              </div>
              <div class="overview-value-right">
                <p>{fund.dateOfInvestment}</p>
              </div>
            </div>
            <div class="overview-value-container">
              <div class="overview-value-left">
                <p>Percentage Gain:</p>
              </div>
              <div class="overview-value-right">
                <p>12.4%</p>
              </div>
            </div>
          </div>
          <div class="fund-overview-divider"></div>
          <div class="fund-overview-right">
            <div class="overview-value-container">
              <div class="overview-value-left">
                <p>Net Asset Value:</p>
              </div>
              <div class="overview-value-right">
                <p>$345.56</p>
              </div>
            </div>
            <div class="overview-value-container">
              <div class="overview-value-left">
                <p>All Time Value:</p>
              </div>
              <div class="overview-value-right">
                <p>$450</p>
              </div>
            </div>
            <div class="overview-value-container">
              <div class="overview-value-left">
                <p>All Time Low:</p>
              </div>
              <div class="overview-value-right">
                <p>$100</p>
              </div>
            </div>
            <div class="overview-value-container">
              <div class="overview-value-left">
                <p>Previous Value:</p>
              </div>
              <div class="overview-value-right">
                <p>$300.50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundDashboard;
