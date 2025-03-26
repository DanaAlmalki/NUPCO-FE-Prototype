import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default function TopSellingChart({ topProducts }) {
  useEffect(() => {
    updateDonutData(topProducts);
  }, [topProducts]);

  const [donut, setDonut] = useState({
    labels: ["Apple", "Knorr", "Shoop", "Green", "Purple"],
    datasets: [
      {
        label: "# of items sold",
        data: [0, 1, 5, 8, 9],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  // Update Chart Data
  const updateDonutData = (topProducts) => {
    const updatedLabels = topProducts.map((p) => p.productName);
    const updatedData = topProducts.map((p) => p.totalSold);
    setDonut((prevDonut) => ({
      ...prevDonut,
      labels: updatedLabels,
      datasets: [
        {
          ...prevDonut.datasets[0],
          data: updatedData,
        },
      ],
    }));
  };

  return (
    <div>
      <Doughnut data={donut} />
      <div>
        {topProducts.map((product) => (
          <div
            key={product._id}
            className="flex gap-x-[1rem] border-b-[3px] p-[0.5rem]"
          >
            <div className="w-[1rem] bg-black p-[0.5rem]"></div>
            <div className="flex gap-x-[1rem] justify-between p-[0.5rem] text-sm">
              <span>
                <div className="text-ellipsis">{product.productName}</div>
                <div>${product.revenue / product.totalSold}</div>
              </span>
              <span>
                <div>{product.totalSold}</div>
                <div>sales</div>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
