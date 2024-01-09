import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data, showAllTeams }) => {
  const scoresArray = Object.entries(data).map(([team, score]) => ({
    team,
    score,
  }));
  const sortedScores = scoresArray.sort((a, b) => b.score - a.score);

  // Déterminer le nombre d'équipes à afficher
  const topTeams = showAllTeams ? sortedScores : sortedScores.slice(0, 5);

  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

  const chartData = {
    labels: topTeams.map((item) => item.team),
    datasets: [
      {
        label: "Score",
        data: topTeams.map((item) => item.score),
        backgroundColor: topTeams.map(
          (item, index) => colors[index % colors.length]
        ),
        borderColor: topTeams.map(
          (item, index) => colors[index % colors.length]
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    plugins: {
      datalabels: {
        color: "#000",
        anchor: "end",
        align: "end",
        formatter: (value, context) => value,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
      },
    },
    maintainAspectRatio: false,
  };

  // Calculer la hauteur basée sur le nombre d'équipes
  const barHeight = 20; // Hauteur en pixels pour chaque barre
  const chartHeight = topTeams.length * barHeight;

  return (
    <div style={{ height: `${chartHeight}px` }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
