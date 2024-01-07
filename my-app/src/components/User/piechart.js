import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function BetCountChart({ betSuccessRate }) {
  const pureData = [
    {
      name: "Paris classique",
      value: betSuccessRate.betsNb,
    },
    {
      name: "Combinés",
      value: betSuccessRate.combinedBetNb,
    },
    { name: "Top 5", value: betSuccessRate.rankedBetsNb },
  ];

  const data = pureData.filter(
    (item) => item.value !== undefined && item.value !== 0
  );

  const totalParis = data.reduce((sum, item) => sum + item.value, 0);
  const COLORS = ["gold", "#00C49F", "#FFBB28"];

  return (
    <div>
      <h2>Nombre de paris</h2>
      <PieChart width={300} height={200}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={70}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default BetCountChart;
