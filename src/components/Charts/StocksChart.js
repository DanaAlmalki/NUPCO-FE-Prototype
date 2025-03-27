import React, { useEffect, useState } from "react";
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

export default function StocksChart({ products }) {
  const [outStock, setOutStock] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [inStock, setInStock] = useState(products.length);

  useEffect(() => {
    fetchLowStock();
    fetchOutStock();
    setInStock(products.length - lowStock - outStock);
  }, [products]);

  const fetchLowStock = () => {
    fetch(`http://localhost:3000/api/v1/kpis/low-stock-items`)
      .then((response) => response.json())
      .then((data) => setLowStock(data.lowStockItems.length))
      .catch((err) => console.log(err));
  };

  const fetchOutStock = () => {
    fetch(`http://localhost:3000/api/v1/products/get/stock-out`)
      .then((response) => response.json())
      .then((data) => setOutStock(data.length))
      .catch((err) => console.log(err));
  };

  const data = {
    labels: ["Out of stock", "Low Stock", "In stock"],
    datasets: [
      {
        label: "# of items",
        data: [outStock, lowStock, inStock],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(0, 202, 128,0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(0, 202, 128,1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
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
    indexAxis: "y",
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
