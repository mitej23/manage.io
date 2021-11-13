import React from "react";
import "./LineChart.styles.css";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";

function processDate(date) {
  var parts = date.split("-");
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

const LineChart = ({ data }) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#57C84D" stopOpacity={1} />
              <stop offset="100%" stopColor="#57C84D" stopOpacity={0.25} />
            </linearGradient>
          </defs>
          <Area dataKey="nav" stroke="#57C84D" fill="url(#color)" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            // show 4 ticks on x axis
            tick={{ fontSize: "12px" }}
            tickFormatter={(value) => {
              const date = processDate(value);
              const month = date.getMonth();
              const year = date.getFullYear();
              return `${monthNames[month]}'${year % 100}`;
            }}
          />
          <YAxis
            dataKey="nav"
            tickLine={false}
            axisLine={false}
            width={28}
            style={{
              fontSize: "12px",
            }}
            tickFormatter={(number) => `$${number.toFixed(0)}`}
          />
          <Tooltip content={<CustomTooltip data={data} />} />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="tooltip">
        <p className="date">Date: {label}</p>
        <p className="nav">
          NAV: ${parseFloat(payload[0].payload.nav).toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
}

export default LineChart;
