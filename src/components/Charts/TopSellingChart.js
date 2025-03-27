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

  const backgroundColor = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
  ];
  const borderColor = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
  ];

  const [donut, setDonut] = useState({
    labels: ["Apple", "Knorr", "Shoop", "Green", "Purple"],
    datasets: [
      {
        label: "# of items sold",
        data: [0, 1, 5, 8, 9],
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

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
    <div className="flex h-[400px] gap-x-[2rem] items-center">
      <Doughnut className="p-[2rem]" data={donut} options={options} />
      <div>
        {topProducts.map((product, index) => (
          <div
            key={product._id}
            className="flex gap-x-[1rem] border-b-[3px] p-[0.5rem]"
          >
            <div
              className="w-[1rem] p-[0.5rem]"
              style={{
                backgroundColor: backgroundColor[index],
                borderColor: borderColor[index],
                borderWidth: "1px",
              }}
            ></div>
            <div className="flex gap-x-[1rem] justify-between p-[0.3rem] text-sm flex-grow">
              <span>
                <div className="text-ellipsis font-bold">
                  {product.productName}
                </div>
                <div className="text-gray-500">
                  ${product.revenue / product.totalSold}
                </div>
              </span>
              <span className="text-custom-blue font-medium text-sm">
                <div>{product.totalSold}</div>
                <div>Sales</div>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
