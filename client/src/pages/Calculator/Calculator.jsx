import React, { useState } from "react";
import "./Calculator.styles.css";

import Slider from "react-input-slider";
import ClientPieChart from "../../components/PieChart/PieChart";

const Calculator = () => {
  const [amount, setAmount] = useState(500);
  const [rate, setRate] = useState(1);
  const [years, setYears] = useState(1);

  return (
    <div>
      <p className="heading">Calculator</p>
      <div className="calculator">
        <div className="calculations">
          <div className="var-container">
            <p className="var-header">Total Investment: </p>
            <div className="input-container">
              <input
                className="var-input"
                type="number"
                min={500}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <span className="var-unit">$</span>
            </div>
          </div>
          <Slider
            className="slider"
            axis="x"
            xstep={500}
            xmin={500}
            xmax={1000000}
            x={amount}
            onChange={({ x }) => setAmount(x)}
          />

          <div className="var-container">
            <p className="var-header">Expected return rate (p.a): </p>
            <div className="input-container">
              <input
                className="var-input number"
                type="number"
                value={rate}
                min={1}
                onChange={(e) => setRate(e.target.value)}
              />
              <span className="var-unit">%</span>
            </div>
          </div>
          <Slider
            className="slider"
            axis="x"
            xstep={0.1}
            xmin={0}
            xmax={50}
            x={rate}
            onChange={({ x }) => setRate(parseFloat(x.toFixed(2)))}
          />

          <div className="var-container">
            <p className="var-header">Years to invest:</p>
            <div className="input-container">
              <input
                className="var-input number"
                type="number"
                min={1}
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
              <span className="var-unit">Yr</span>
            </div>
          </div>
          <Slider
            className="slider"
            axis="x"
            xstep={1}
            xmin={1}
            xmax={30}
            x={years}
            onChange={({ x }) => setYears(x)}
          />
          <div className="result">
            <div className="result-container">
              <p className="result-header">Invested amount: </p>
              <p className="result-value">${amount}</p>
            </div>
            <div className="result-container">
              <p className="result-header">Expected return: </p>
              <p className="result-value">
                ${parseInt(amount * Math.pow(1 + rate / 100, years)) - amount}
              </p>
            </div>
            <div className="result-container">
              <p className="result-header">Estimated return: </p>
              <p className="result-value">
                ${parseInt(amount * Math.pow(1 + rate / 100, years))}
              </p>
            </div>
          </div>
        </div>

        <div className="calculator-pie">
          <ClientPieChart
            total={amount}
            gain={parseInt(amount * Math.pow(1 + rate / 100, years)) - amount}
          />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
