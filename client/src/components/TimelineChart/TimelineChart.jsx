import "./TimelineChart.styles.css";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const TimelineChart = ({ data }) => {
  console.log(data);

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            // show 4 ticks on x axis
            tick={{ fontSize: "12px" }}
          />
          <YAxis
            dataKey="totalInvested"
            tickLine={false}
            axisLine={false}
            tickCount={5}
            width={35}
            style={{
              fontSize: "12px",
            }}
          />
          <Bar
            dataKey="totalInvested"
            fill="#57C84D"
            background={{ fill: "#fefefe" }}
          >
            <LabelList
              dataKey="totalInvested"
              position="top"
              style={{
                fontSize: "8px",
              }}
              content={<CustomLabel />}
            />
          </Bar>
          <Tooltip
            cursor={{ fill: "transparent" }}
            content={<CustomTooltip data={data} />}
          />
        </BarChart>
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
      fontSize={10}
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
