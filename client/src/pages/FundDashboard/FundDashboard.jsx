import React, { useState, useEffect } from "react";
import "./FundDashboard.styles.css";

import { useHistory } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import LineChart from "../../components/LineChart/LineChart";
import GraphTimeLineContainer from "../../components/GraphTimelineContainer/GraphTimelineContainer";

import { useQuery } from "react-query";
import axios from "axios";
import moment from "moment";

const FundDashboard = () => {
  const history = useHistory();
  const { pathname, fund } = history.location;
  const code = pathname.split("-").pop();

  //usestate

  const [reversedData, setReversedData] = useState([]);
  const [currNavValue, setCurrNavValue] = useState(0);
  const [prevNavValue, setPrevNavValue] = useState(0);
  const [oldNavValue, setOldNavValue] = useState(0);
  const [percentageInc, setPercentageInc] = useState(0);
  const [amtInvested, setAmtInvested] = useState(0);
  const [totalRet, setTotalRet] = useState(0);
  const [threeYearIndex, setThreeYearIndex] = useState(0);
  const [yearIndex, setYearIndex] = useState(0);
  const [indexOfDoi, setIndexOfDoi] = useState(0);
  const [chartIndex, setChartIndex] = useState(0);
  const [yearInc, setYearInc] = useState(0);
  const [yearGrowth, setYearGrowth] = useState(0);

  //react query

  const { data, isLoading } = useQuery(code, () => {
    return axios.get(
      `/api/fund?code=${code}&doi=${moment(fund.dateOfInvestment).format(
        "DD-MM-yyyy"
      )}`
    );
  });

  useEffect(() => {
    if (data && fund) {
      setYearGrowth(
        ((data.data.data.data[0].nav -
          data.data.data.data[data.data.yearIndex].nav) /
          data.data.data.data[data.data.yearIndex].nav) *
          100
      );
      setYearInc(
        data.data.data.data[0].nav -
          data.data.data.data[data.data.yearIndex].nav
      );
      setCurrNavValue(data.data.data.data[0].nav);
      setPrevNavValue(data.data.data.data[1].nav);
      setOldNavValue(data.data.timeOfInv[0].nav);
      setPercentageInc(((currNavValue - prevNavValue) / prevNavValue) * 100);
      setAmtInvested(parseFloat(fund.amtInvested));
      setTotalRet((percentageInc * amtInvested) / 100);
      setThreeYearIndex(data.data.threeYearIndex);
      setYearIndex(data.data.yearIndex);
      setIndexOfDoi(data.data.indexOfDoi);
      setChartIndex(data.data.indexOfDoi);
      setReversedData(
        data.data.data.data.slice(0, data.data.indexOfDoi).reverse()
      );
    }

    return () => {};
  }, [
    data,
    fund,
    amtInvested,
    currNavValue,
    prevNavValue,
    percentageInc,
    indexOfDoi,
    threeYearIndex,
    yearIndex,
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || !fund) {
    return (
      <div>
        <BackButton text={"Client's Dashboard"} />
        No data
      </div>
    );
  }

  if (data && fund) {
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
              <p className="fund-nav-growth">
                + {parseFloat(yearInc).toFixed(2)} ({" "}
                {parseFloat(yearGrowth).toFixed(2)}% ) 1y{" "}
              </p>
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
          <LineChart data={reversedData} />
        </div>
        <GraphTimeLineContainer
          props={{
            data,
            yearIndex,
            chartIndex,
            setChartIndex,
            threeYearIndex,
            setReversedData,
            indexOfDoi,
          }}
        />
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
                  <p>At time of Inv.:</p>
                </div>
                <div className="overview-value-right">
                  <p>${parseFloat(oldNavValue).toFixed(2)}</p>
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
