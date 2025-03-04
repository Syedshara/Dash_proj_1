export const chartsConfig = {
  chart: {
    toolbar: {
      show: false,
    },
    borderWidth: 2,
  },
  title: {
    show: "",
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: true,
    },
    labels: {
      style: {
        colors: "#fff",
        fontSize: "11px",
        fontFamily: "inherit",
        fontWeight: 300,
      },
    },
  },
  yaxis: {
    axisBorder: {
      show: true,
    },


    labels: {
      style: {
        colors: "#fff",
        fontSize: "11px",
        fontFamily: "inherit",
        fontWeight: 300,
      },
    },
  },

  fill: {
    opacity: 0.9,
  },
  tooltip: {
    theme: "dark",
  },
};

export default chartsConfig;
