import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

const bets = [
  {
    _id: 1,
    gameId: "game1",
    betType: "type1",
    mise: 10,
    score: 20,
    state: "fermé",
  },
  {
    _id: 2,
    gameId: "game1",
    betType: "type2",
    mise: 20,
    score: 0,
    state: "ouvert",
  },
  {
    _id: 3,
    gameId: "game1",
    betType: "type3",
    mise: 30,
    score: 50,
    state: "fermé",
  },
  {
    _id: 4,
    gameId: "game1",
    betType: "type4",
    mise: 40,
    score: 0,
    state: "ouvert",
  },
];

const BetChart = () => {
  const [totalGains, setTotalGains] = useState([50]);
  const [previousSum, setPreviousSum] = useState(50);
  const chartRef = useRef(null); // chart reference

  useEffect(() => {
    let currentTotalGains = 50;
    let totalGainsArray = [50];

    for (let i = 0; i < bets.length; i++) {
      if (bets[i].state === "fermé") {
        currentTotalGains += bets[i].score - bets[i].mise;
        totalGainsArray.push(currentTotalGains);
      }
    }

    console.log(totalGainsArray);
    setTotalGains(totalGainsArray);

    const chartData = {
      labels: Array.from({ length: totalGainsArray.length }, (_, i) =>
        i.toString()
      ),
      datasets: [
        {
          label: "Total Gains",
          data: totalGainsArray,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.4)",
        },
      ],
    };
    const options = {
      scales: {
        x: {
          type: "category",
          labels: chartData.labels,
          color: "white",
          ticks: {
            color: "white", // changer la couleur des valeurs sur l'axe y en blanc
          },
          grid: {
            display: false,
            color: "white",
          },
        },
        y: {
          type: "linear",
          color: "white",
          ticks: {
            color: "white", // changer la couleur des valeurs sur l'axe y en blanc
          },
          grid: {
            drawBorder: false,
          },
          title: {
            display: true,
            text: "Unité monétaire",
            color: "white",
            ticks: {
              color: "white", // changer la couleur des valeurs sur l'axe y en blanc
            },
            font: {
              size: 14,
            },
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          color: "white",
          labels: {
            font: {
              size: 14,
            },
            color: "white",
          },
        },
      },
    };

    Chart.register(CategoryScale);

    if (chartRef.current) {
      // destroy previous chart
      chartRef.current.destroy();
    }

    // create new chart
    const ctx = document.getElementById("myChart").getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: chartData,
      options: options,
    });
  }, []);

  return <canvas id="myChart" />;
};

export default BetChart;
