import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartjsLineChart = (props) => {
  const {
    white = "#ffffff",
    primary = "#3b82f6",
    success = "#22c55e",
    warning = "#f59e0b",
    labelColor = "#9ca3af",
    borderColor = "#e5e7eb",
    legendColor = "#374151",
  } = props;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: labelColor },
        grid: {
          drawOnChartArea: false, // Hides the vertical grid lines
          drawTicks: false, // Hides the ticks on the x-axis
          drawBorder: false, // Hides the border line along the x-axis
        },
      },
      y: {
        min: 0,
        max: 400,
        ticks: {
          stepSize: 100,
          color: labelColor,
        },
        grid: {
          color: borderColor,
        },
      },
    },
    plugins: {
      legend: {
        align: "end",
        position: "top",
        labels: {
          padding: 25,
          boxWidth: 10,
          color: legendColor,
          usePointStyle: true,
        },
      },
    },
    layout: {
      padding: {
        left: 10, // Add padding to the chart to prevent overflow
        right: 10,
      },
    },
  };

  const data = {
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140],
    datasets: [
      {
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: "Europe",
        pointHoverRadius: 5,
        pointStyle: "circle",
        borderColor: primary,
        backgroundColor: primary,
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: white,
        pointBorderColor: "transparent",
        pointHoverBackgroundColor: primary,
        data: [
          80, 150, 180, 270, 210, 160, 160, 202, 265, 210, 270, 255, 290, 360,
          375,
        ],
      },
      {
        fill: false,
        tension: 0.5,
        label: "Asia",
        pointRadius: 1,
        pointHoverRadius: 5,
        pointStyle: "circle",
        borderColor: warning,
        backgroundColor: warning,
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: white,
        pointBorderColor: "transparent",
        pointHoverBackgroundColor: warning,
        data: [
          80, 125, 105, 130, 215, 195, 140, 160, 230, 300, 220, 170, 210, 200,
          280,
        ],
      },
      {
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: "Africa",
        pointHoverRadius: 5,
        pointStyle: "circle",
        borderColor: success,
        backgroundColor: success,
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: white,
        pointBorderColor: "transparent",
        pointHoverBackgroundColor: success,
        data: [
          80, 99, 82, 90, 115, 115, 74, 75, 130, 155, 125, 90, 140, 130, 180,
        ],
      },
    ],
  };

  return (
    <div className="card shadow-lg bg-base-100">
      <div className="card-body">
        <h2 className="card-title text-lg font-bold text-gray-800">
          New Technologies Data
        </h2>
        <p className="text-sm text-gray-500">
          Commercial networks & enterprises
        </p>
        <div className="mt-6">
          <div className="h-96">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartjsLineChart;
