import "./PieChart.styles.css";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const ClientPieChart = ({ total, gain }) => {
  const data = [
    { value: total, name: "Total", color: "#7166f9" },
    { value: gain, name: "Gain", color: "#57C84D" },
  ];
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default ClientPieChart;
