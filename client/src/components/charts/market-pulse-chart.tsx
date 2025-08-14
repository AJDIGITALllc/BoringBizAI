import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export function MarketPulseChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        // Destroy existing chart
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: ["Emergency", "Service", "Local", "Problem"],
            datasets: [
              {
                data: [35, 30, 20, 15],
                backgroundColor: ["#ef4444", "#3b82f6", "#10b981", "#f59e0b"],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} style={{ height: "200px" }} />;
}
