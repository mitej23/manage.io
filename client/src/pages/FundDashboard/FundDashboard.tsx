import React, { useState, useEffect } from "react";
import "./FundDashboard.styles.css";

import { useHistory, useLocation } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import LineChart from "../../components/LineChart/LineChart";
import GraphTimeLineContainer from "../../components/GraphTimelineContainer/GraphTimelineContainer";

import { useQuery } from "react-query";
import axios from "axios";
import moment from "moment";

type FundState = {
  amtInvested: number;
  code: number;
  currValue: number;
  dateOfInvestment: string;
  fundName: string;
  gain: number;
  percentGain: number;
};

type DataParams = {
  code: string;
  doi: string;
};

type DataResponse = {
  data: Data;
};

type Data = {
  data: MetaData;
  highest: string;
  indexOfDoi: number;
  lowest: string;
  threeYearIndex: number;
  timeOfInv: Array<TimeOfInv>;
  yearIndex: number;
};

type MetaData = {
  meta: FundMeta;
  data: Array<Fund>;
  status: string;
};

type TimeOfInv = {
  date: string;
  nav: string;
};

type Fund = {
  date: string;
  nav: string;
};

type FundMeta = {
  fund_house: string;
  scheme_category: string;
  scheme_code: number;
  scheme_name: string;
  scheme_type: string;
};

const FundDashboard = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const { state } = useLocation<FundState>();
  const code = pathname.split("-").pop();

  //usestate

  const [reversedData, setReversedData] = useState<Fund[]>([]);
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

  const { data, isLoading } = useQuery(code!, () => {
    return axios.get<DataParams, DataResponse>(
      `/api/fund?code=${code}&doi=${moment(state.dateOfInvestment).format(
        "DD-MM-yyyy"
      )}`
    );
  });

  useEffect(() => {
    if (data && state) {
      console.log(data);
      console.log(state);

      setYearGrowth(
        ((parseFloat(data.data.data.data[0].nav) -
          parseFloat(data.data.data.data[data.data.yearIndex].nav)) /
          parseFloat(data.data.data.data[data.data.yearIndex].nav)) *
          100
      );
      setYearInc(
        parseFloat(data.data.data.data[0].nav) -
          parseFloat(data.data.data.data[data.data.yearIndex].nav)
      );
      setCurrNavValue(parseFloat(data.data.data.data[0].nav));
      setPrevNavValue(parseFloat(data.data.data.data[1].nav));
      setOldNavValue(parseFloat(data.data.timeOfInv[0].nav));
      // remover prevnavvalue and substitute with time of investment
      setPercentageInc(
        ((currNavValue - parseFloat(data.data.timeOfInv[0].nav)) /
          parseFloat(data.data.timeOfInv[0].nav)) *
          100
      );
      setAmtInvested(state.amtInvested);
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
    state,
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

  if (!data || !state) {
    return (
      <div>
        <BackButton text={"Client's Dashboard"} />
        No data
      </div>
    );
  }

  if (data && state) {
    return (
      <div>
        <BackButton text={"Client's Dashboard"} />
        <div className="fund-head-section">
          <div className="fund-head-left">
            <p className="fund-name">{state.fundName}</p>
            <div className="fund-nav">
              <p className="fund-nav-value">${currNavValue.toFixed(2)}</p>
              <p
                className="fund-nav-growth"
                style={{ color: yearInc > 0 ? "#169b00de" : "red" }}
              >
                {yearInc > 0 ? "+" : ""} {yearInc.toFixed(2)} ({" "}
                {yearGrowth.toFixed(2)}% ) 1y{" "}
              </p>
            </div>
          </div>
          <div className="fund-head-right">
            <div className="fund-total-inv">
              <p>${(amtInvested + totalRet).toFixed(2)}</p>
            </div>

            {totalRet > 0 ? (
              <div className="total-inv-growth">
                <div className="up-arrow-icon"></div>
                <p style={{ color: "#169b00de" }}>{totalRet.toFixed(2)}</p>
              </div>
            ) : (
              <div className="total-inv-growth">
                <div className="bottom-arrow-icon"></div>
                <p style={{ color: "red" }}>{totalRet.toFixed(2)}</p>
              </div>
            )}
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
          <div className="heading">
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
                  <p>{`${moment(state.dateOfInvestment).format(
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
                  <p>${currNavValue.toFixed(2)}</p>
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
                  <p>${oldNavValue.toFixed(2)}</p>
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
