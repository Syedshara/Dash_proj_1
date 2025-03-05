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

  grid: {
    show: true,
    borderColor: "#DCE0E3",
    borderWidth: 0.5,
    opacity: 0.5,

    yaxis: {
      lines: {
        show: true,
        opacity: 0.5,
      },
      style: {
        opacity: 0.5,
      }
    },
    xaxis: {
      lines: {
        show: true,
        opacity: 0.5,
      },
      style: {
        opacity: 0.5,
      }
    },
    padding: {
      top: 5,
      right: 20,
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
