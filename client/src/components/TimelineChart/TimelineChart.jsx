import "./TimelineChart.styles.css";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";

const TimelineChart = ({ data }) => {
  console.log(data);

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        {data.length > 0 ? (
          <BarChart data={data}>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: "11px" }}
            />
            <YAxis
              dataKey="totalInvested"
              tickLine={false}
              axisLine={false}
              width={38}
              style={{
                fontSize: "11px",
              }}
              tickFormatter={(number) => `$${number.toFixed(0)}`}
            />
            <Bar
              dataKey="totalInvested"
              fill="#57C84D"
              background={{ fill: "#fefefe" }}
            >
              {/* <LabelList
              // dataKey="totalInvested"
              position="top"
              style={{
                fontSize: "8px",
              }}
              // content={<CustomLabel />}
            /> */}
            </Bar>
            <Tooltip
              cursor={{ fill: "transparent" }}
              content={<CustomTooltip data={data} />}
            />
          </BarChart>
        ) : (
          <div className="no-data">
            <p>No data to display</p>
          </div>
        )}
      </ResponsiveContainer>
    </>
  );
};

function CustomLabel({ x, y, stroke, value }) {
  return (
    <text
      x={x}
      y={y}
      dy={-2}
      dx={5}
      fill={stroke}
      textAnchor="middle"
      fontSize={8}
    >
      ${value}
    </text>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active) {
    console.log(payload[0].payload.totalInvested);
    return (
      <div className="tooltip">
        <p className="date">Date: {label}</p>
        <p className="nav">
          Invested:{" "}
          <span className="value">${payload[0].payload.totalInvested}</span>
        </p>
      </div>
    );
  }
  return null;
}

export default TimelineChart;
