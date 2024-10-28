// components/MyBarChart.tsx
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  BarElement,
} from "chart.js";

// Register ChartJS components using ChartJS.register
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const chartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.8)",
      },
    },
    y: {
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.8)",
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

const BarChart = () => {
  return (
    <div className="m-auto mt-6 h-96 w-[100%] xl:container">
      <Bar
        options={chartOptions}
        data={{
          labels: [
            "2023-01",
            "2023-02",
            "2023-03",
            "2023-04",
            "2023-05",
            "2023-06",
            "2023-07",
          ],
          datasets: [
            {
              label: "Dataset 1",
              data: [100, 120, 115, 134, 190, 132, 200],
              backgroundColor: "#a3e635",
              borderColor: "#a3e635",
            },
            {
              label: "Dataset 2",
              data: [90, 110, 176, 124, 158, 122, 190],
              backgroundColor: "white",
              borderColor: "#f5f5f5",
            },
          ],
        }}
      />
    </div>
  );
};

export default BarChart;
