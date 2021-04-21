import React, { useRef, useEffect } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
} from "chart.js";
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title
);

let myLineChart;

export default function LineGraph(props) {
  let chartRef = useRef();
  const { data, options } = props;

  useEffect(() => {
    buildChart();
    // eslint-disable-next-line
  });

  const buildChart = () => {
    chartRef = chartRef.current.getContext("2d");
    console.log(chartRef);

    if (typeof myLineChart !== "undefined") {
      myLineChart.destroy();
    }
    new Chart(chartRef, {
      type: "line",
      data: data,
      options: options,
    });
  };

  return (
    <div className="p-4 bg-white mt-4 rounded-md ">
     <h1 style={{color:"#009CA3"}} className="pt-2 pb-4 text-md font-bold ">Sales Activity</h1>
      <div>
        <canvas id="myChart" ref={chartRef}></canvas>
      </div>
    </div>
  );
}
