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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MonthlySales({ salesData }) {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "# of items",
        data: salesData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(0, 202, 128,0.2)",
          "rgba(6,147,227,0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(0, 202, 128,0.2)",
          "rgba(6,147,227,0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(0, 202, 128,0.2)",
          "rgba(6,147,227,0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(0, 202, 128,0.2)",
          "rgba(6,147,227,0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(0, 202, 128,1)",
          "rgba(6,147,227,1)",
          "rgba(255, 99, 132, 1)",
          "rgba(0, 202, 128,1)",
          "rgba(6,147,227,1)",
          "rgba(255, 99, 132, 1)",
          "rgba(0, 202, 128,1)",
          "rgba(6,147,227,1)",
          "rgba(255, 99, 132, 1)",
          "rgba(0, 202, 128,1)",
          "rgba(6,147,227,1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
}
