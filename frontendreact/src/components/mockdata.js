


// let gradient = Chart.createLinearGradient(0, 0, 0, 450);


// gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
// gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
// gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

export const datass = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Custom Label Name",
    //   backgroundColor: gradient,
      pointBackgroundColor: "white",
      borderWidth: 1,
      borderColor: "#009CA3",
      data: [50, 55, 80, 81, 54, 50],
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  animation: {
    easing: "easeInOutQuad",
    duration: 520,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "rgba(200, 200, 200, 0.05)",
          lineWidth: 1,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          color: "rgba(200, 200, 200, 0.08)",
          lineWidth: 1,
        },
      },
    ],
  },
  elements: {
    line: {
      tension: 0.4,
    },
  },
  legend: {
    display: false,
  },
  point: {
    backgroundColor: "white",
  },
  tooltips: {
    titleFontFamily: "Open Sans",
    backgroundColor: "rgba(0,0,0,0.3)",
    titleFontColor: "red",
    caretSize: 5,
    cornerRadius: 2,
    xPadding: 10,
    yPadding: 10,
  },
};
