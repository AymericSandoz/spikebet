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
  const data = [
    {
      name: "Paris classique",
      successRate: betSuccessRate.betSuccessRate,
      nbParis: betSuccessRate.betsNb,
    },
    {
      name: "Combinés",
      successRate: betSuccessRate.combinedBetSuccessRate,
      nbParis: betSuccessRate.combinedBetsNb,
    },
    {
      name: "Top 5",
      successRate: betSuccessRate.rankedBetSuccessRate,
      nbParis: betSuccessRate.rankedBetsNb,
    },
  ];

  console.log(data);
  const totalParis = data.reduce((sum, item) => sum + item.nbParis, 0);
  const colors = ["#FFD700", "#4169E1", "green"];
  return (
    <div>
      <h2 className="centered-h2">Taux de réussite</h2>
      <BarChart
        width={300}
        height={200}
        options={{ maintainAspectRatio: false }}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fill: "gold" }} />
        <YAxis tick={{ fill: "gold" }} />
        <Tooltip />
        <Bar dataKey="successRate" fill="gold" />
        {/* <Bar dataKey="nbParis" fill="green" /> */}
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
