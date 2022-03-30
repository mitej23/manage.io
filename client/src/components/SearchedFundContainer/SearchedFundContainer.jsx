import React, { useEffect, useState } from "react";
import "./SearchedFundContainer.styles.css";

import LineChart from "../../components/LineChart/LineChart";

const SearchedFundContainer = ({ data, isLoading }) => {
  const [fundName, setFundName] = useState("");
  const [currNav, setCurrNav] = useState("");
  const [oneDayInc, setOneDayInc] = useState("");
  const [oneDayGrowth, setOneDayGrowth] = useState("");
  const [yearGrowth, setYearGrowth] = useState("");
  const [threeYearGrowth, setThreeYearGrowth] = useState("");
  const [allTimeGrowth, setAllTimeGrowth] = useState("");
  const [reversedData, setReversedData] = useState([]);

  useEffect(() => {
    if (data) {
      setFundName(
        data.data.meta.fund_house + " - " + data.data.meta.scheme_name
      );
      setCurrNav(data.data.data[0].nav);
      setOneDayInc(data.data.data[0].nav - data.data.data[1].nav);
      setOneDayGrowth(
        ((data.data.data[0].nav - data.data.data[1].nav) /
          data.data.data[1].nav) *
          100
      );
      setYearGrowth(
        ((data.data.data[0].nav - data.data.data[data.yearIndex].nav) /
          data.data.data[data.yearIndex].nav) *
          100
      );
      setThreeYearGrowth(
        ((data.data.data[0].nav - data.data.data[data.threeYearIndex].nav) /
          data.data.data[data.threeYearIndex].nav) *
          100
      );
      setAllTimeGrowth(
        ((data.data.data[0].nav -
          data.data.data[data.data.data.length - 1].nav) /
          data.data.data[data.data.data.length - 1].nav) *
          100
      );
      setReversedData(data.data.data.slice().reverse());
      console.log(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div>
        <div className="center">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <div className="center">No Fund is selected</div>
      </div>
    );
  }

  return (
    <div>
      <div className="fund-header-container">
        <p className="fund-name">{fundName}</p>
        <div className="fund-nav">
          <p className="fund-nav-value">${parseFloat(currNav).toFixed(2)}</p>
          <p
            className="fund-nav-growth"
            style={{ color: oneDayInc > 0 ? "#169b00de" : "red" }}
          >
            {oneDayInc > 0 ? "+" : ""} {parseFloat(oneDayInc).toFixed(2)} (
            {parseFloat(oneDayGrowth).toFixed(2)}%) 1d
          </p>
        </div>
      </div>
      <div className="fund-graph">
        <LineChart data={reversedData} />
      </div>
      <div className="fund-stats">
        <p
          className="heading"
          style={{ marginBottom: "1.5rem", marginTop: "1.5rem" }}
        >
          Fund Performance
        </p>
        <div className="overview-value-container">
          <p className="stat-value-left">1y Return % :</p>
          <p
            className="stat-value-right"
            style={{ color: yearGrowth > 0 ? "#169b00de" : "red" }}
          >
            {yearGrowth > 0 ? "+" : ""}
            {parseFloat(yearGrowth).toFixed(2)}%
          </p>
        </div>
        <div className="overview-value-container">
          <p className="stat-value-left">3y Return %:</p>
          <p
            className="stat-value-right"
            style={{ color: threeYearGrowth > 0 ? "#169b00de" : "red" }}
          >
            {threeYearGrowth > 0 ? "+" : ""}
            {parseFloat(threeYearGrowth).toFixed(2)}%
          </p>
        </div>
        <div className="overview-value-container">
          <p className="stat-value-left">All time Return %:</p>
          <p
            className="stat-value-right"
            style={{ color: allTimeGrowth > 0 ? "#169b00de" : "red" }}
          >
            {allTimeGrowth > 0 ? "+" : ""}
            {parseFloat(allTimeGrowth).toFixed(2)}%
          </p>
        </div>
        <div className="overview-value-container">
          <p className="stat-value-left">All time low:</p>
          <p className="stat-value-right">
            ${parseFloat(data.lowest).toFixed(2)}
          </p>
        </div>
        <div className="overview-value-container">
          <p className="stat-value-left">All time high:</p>
          <p className="stat-value-right">
            ${parseFloat(data.highest).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchedFundContainer;
