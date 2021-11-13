import React, { useEffect } from "react";
import "./ClientDashbaord.styles.css";
import { useHistory, Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import BackButton from "../../components/BackButton/BackButton";
import ClientPieChart from "../../components/PieChart/PieChart";
import ClientStats from "../../components/ClientStats/ClientStats";

const ClientDashboard = ({ auth }) => {
  const history = useHistory();
  const { pathname } = history.location;
  const lastPath = pathname.split("/").pop() + ".com";

  //local state

  const [totalInvestment, setTotalInvestment] = React.useState(0);
  const [currInvValue, setCurrInvValue] = React.useState(0);
  const [totalGain, setTotalGain] = React.useState(0);
  const [absReturnPercent, setAbsReturnPercent] = React.useState(0);
  const [totalFunds, setTotalFunds] = React.useState(0);

  const { data, isLoading, isSuccess } = useQuery(
    ["client-data", lastPath],
    () => {
      return axios.get(
        `/api/agents/clientDetail?agentEmail=${auth.user.email}&clientEmail=${lastPath}`
      );
    },
    {
      cacheTime: 1000 * 60 * 60 * 24,
    }
  );

  useEffect(() => {
    console.log(data);
    if (isSuccess) {
      if (data?.data?.data.length !== 0) {
        let totalInv = 0;
        let currVal = 0;
        let totGain = 0;
        let absReturn = 0;
        data.data.data.forEach((element) => {
          totalInv += element.amtInvested;
          currVal += parseInt(element.currValue);
          totGain += parseInt(element.gain);
        });
        absReturn = ((totGain / totalInv) * 100).toFixed(2);
        setTotalInvestment(totalInv);
        setCurrInvValue(currVal);
        setTotalGain(totGain);
        setAbsReturnPercent(absReturn);
        setTotalFunds(data.data.data.length);
      }
    }

    return () => {};
  }, [data, isSuccess]);

  console.log(totalInvestment, currInvValue, totalGain, absReturnPercent);

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
          <ClientStats
            gain={totalGain}
            totalInv={totalInvestment}
            currInvValue={currInvValue}
            absReturnPercent={absReturnPercent}
            funds={totalFunds}
          />
        </div>
        <div className="dashboard-overview-pie">
          <div className="pie-chart-text-inside">
            <span className="pie-chart-text-total">${currInvValue}</span>
            {/* <Br /> */}
            <span className="pie-chart-text-growth">
              {totalGain > 0 ? "+" : ""}${totalGain}
            </span>
          </div>

          <ClientPieChart
            id="pie-chart"
            total={totalInvestment}
            gain={totalGain}
          />
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
          {data.data.data.map((fund) => {
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
                <p
                  className="portfolio-fund-right"
                  style={{ color: "#57C84D" }}
                >
                  {fund.gain > 0 ? "+" : ""}${`${fund.gain}`}
                </p>
                <p className="portfolio-fund-right">${fund.currValue}</p>
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
