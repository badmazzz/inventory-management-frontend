import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { StoreContext } from "../context/StoreContext";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Apple", "Knorr", "Shoop", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [0, 1, 5, 8, 9, 15],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

function Home() {
  const [chart, setChart] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
    },
    series: [
      {
        name: "series",
        data: [10, 20, 40, 50, 60, 20, 10, 35, 45, 70, 25, 70],
      },
    ],
  });

  const updateChartData = (salesData) => {
    setChart({
      ...chart,
      series: [
        {
          name: "Monthly Sales Amount",
          data: [...salesData],
        },
      ],
    });
  };

  const {
    saleAmount,
    purchaseAmount,
    stores,
    products,
    sellAmount,
    monthlySellsData,
    fetchMonthlySellsData,
    fetchProductsData,
    fetchStoresData,
    fetchTotalPurchaseAmount,
    fetchTotalSellAmount,
  } = useContext(StoreContext);

  useEffect(() => {
    fetchMonthlySellsData();
    fetchProductsData();
    fetchStoresData();
    fetchTotalPurchaseAmount();
    fetchTotalSellAmount();
  }, []);

  useEffect(() => {
    updateChartData(monthlySellsData);
  }, [monthlySellsData]);

  return (
    <>
      <div className="grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-3 lg:grid-cols-4 p-4">
        <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            <span className="text-xs font-medium"> 67.81% </span>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Sell
            </strong>
            <p>
              <span className="text-2xl font-medium text-gray-900">
                ${sellAmount}
              </span>
              <span className="text-xs text-gray-500"> from $240.94 </span>
            </p>
          </div>
        </article>

        <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>
            <span className="text-xs font-medium"> 67.81% </span>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Purchase
            </strong>
            <p>
              <span className="text-2xl font-medium text-gray-900">
                ${purchaseAmount}
              </span>
              <span className="text-xs text-gray-500"> from $404.32 </span>
            </p>
          </div>
        </article>

        <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>
            <span className="text-xs font-medium"> 67.81% </span>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Total Products
            </strong>
            <p>
              <span className="text-2xl font-medium text-gray-900">
                {products.length}
              </span>
              {/* <span className="text-xs text-gray-500"> from $404.32 </span> */}
            </p>
          </div>
        </article>

        <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>
            <span className="text-xs font-medium"> 67.81% </span>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Total Stores
            </strong>
            <p>
              <span className="text-2xl font-medium text-gray-900">
                {stores.length}
              </span>
              {/* <span className="text-xs text-gray-500"> from 0 </span> */}
            </p>
          </div>
        </article>

        <div className="flex justify-around bg-white rounded-lg py-8 col-span-full justify-center">
          <div>
            <Chart
              options={chart.options}
              series={chart.series}
              type="bar"
              width="500"
            />
          </div>
          <div>
            <Doughnut data={data} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
