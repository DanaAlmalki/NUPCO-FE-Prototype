import React, { useState, useEffect } from "react";
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
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProductExpiryChart = () => {
  const [expiredProducts, setExpiredProducts] = useState(0);
  const [expiringSoon, setExpiringSoon] = useState(0);
  const [purchase, setAllPurchaseData] = useState([]);

  useEffect(() => {
    fetchPurchaseData();
  }, []);

  // Fetching Data of All Purchase items
  const fetchPurchaseData = () => {
    fetch(`http://localhost:3000/api/v1/purchase`)
      .then((response) => response.json())
      .then((data) => {
        setAllPurchaseData(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const expired = purchase.filter((product) =>
      moment(product.expireDate).isBefore(moment())
    );
    const expiring = purchase.filter((product) =>
      moment(product.expireDate).isBetween(moment(), moment().add(30, "days"))
    );

    setExpiredProducts(expired.length);
    setExpiringSoon(expiring.length);
  }, [purchase]);

  const data = {
    labels: ["Expired", "Expiring within 30 days"],
    datasets: [
      {
        label: "Product Count",
        data: [expiredProducts, expiringSoon],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(252, 185, 0, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(252, 185, 0, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProductExpiryChart;
