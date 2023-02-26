import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function SuccessRatesChart({ betSuccessRate }) {
  console.log("betSuccessRate.rankedBetsNb", betSuccessRate);
  const data = [
    {
      name: "Paris classique",
      successRate: betSuccessRate.betSuccessRate,
      nbParis: betSuccessRate.betsNb,
    },
    {
      name: "Combinés",
      successRate: betSuccessRate.combinedBetNb,
      nbParis: betSuccessRate.combinedBetNb,
    },
    {
      name: "Top 5",
      successRate: betSuccessRate.rankedBetsNb,
      nbParis: betSuccessRate.rankedBetsNb,
    },
  ];
  const totalParis = data.reduce((sum, item) => sum + item.nbParis, 0);

  return (
    <div>
      <h2>Taux de réussite</h2>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="successRate" fill="#8884d8" />
      </BarChart>

      {/* <h2>Nombre de paris</h2>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="nbParis" fill="#82ca9d" />
      </BarChart>
      <p>Nombre total de paris : {totalParis}</p> */}
    </div>
  );
}

export default SuccessRatesChart;
