import { useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { chartsConfig } from "@/configs";

const apiUrl = "https://zohfy.in/wabot/service/get-dashboard-data";

const transformData = (data) => {
  const last10Days = data.slice(0, 10).reverse();
  const categories = last10Days.map((item) => item.orderDay);

  console.log(last10Days)

  return [
    {
      color: "blue",
      title: "Total Orders",
      description: "Total orders in the last 10 days",

      chart: {
        type: "bar",
        height: 220,
        series: [{ name: "Orders", data: last10Days.map((item) => item.totalOrders) }],
        options: {
          ...chartsConfig,
          colors: ["#fff"],
          plotOptions: { bar: { columnWidth: "15%", borderRadius: 3 } },
          xaxis: { ...chartsConfig.xaxis, categories },
          grid: {
            borderColor: "rgba(255, 255, 255, 0.2)",
            xaxis: {
              lines: {
                show: true,
              },
            },
            yaxis: {
              lines: {
                show: true,
              },
            },
          }
        },
      },
    },
    {
      color: "green",
      title: "Total Revenue",
      description: "Total revenue in the last 10 days",

      chart: {
        type: "line",
        height: 220,
        series: [{ name: "Revenue", data: last10Days.map((item) => item.totalRevenue) }],
        options: {
          ...chartsConfig,
          colors: ["#fff"],
          stroke: { lineCap: "round" },
          markers: { size: 5 },
          xaxis: { ...chartsConfig.xaxis, categories },
          yaxis: {
            tickAmount: 4,
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
            borderColor: "rgba(255, 255, 255, 0.2)",
            xaxis: {
              lines: {
                show: true,
              },
            },
            yaxis: {
              lines: {
                show: true,
              },
            },
          }

        },
      },
    },
    {
      color: "black",
      title: "Total Products Sold",
      description: "Total products sold in the last 10 days",

      chart: {
        type: "line",
        height: 220,
        series: [{ name: "Products Sold", data: last10Days.map((item) => item.totalProductsSold) }],
        options: {
          ...chartsConfig,
          colors: ["#fff"],
          stroke: { lineCap: "round" },
          markers: { size: 5 },
          xaxis: { ...chartsConfig.xaxis, categories },
          grid: {
            borderColor: "rgba(255, 255, 255, 0.2)",
            xaxis: {
              lines: {
                show: true,
              },
            },
            yaxis: {
              lines: {
                show: true,
              },
            },
          }
        },
      },
    },
  ];
};

export const statisticsChartsData = () => {
  const { data } = useFetch(apiUrl, {}, transformData);

  return useMemo(() => data || [], [data]);
};

export default statisticsChartsData;