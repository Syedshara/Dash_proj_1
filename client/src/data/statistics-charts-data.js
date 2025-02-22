import { useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { chartsConfig } from "@/configs";

const apiUrl = "http://127.0.0.1:3004/api/chart-data";

const transformData = (data) => [
  {
    color: "blue",
    title: data?.websiteViewsTitle || "Website View",
    description: data?.websiteViewsDescription || "Last Campaign Performance",
    footer: data?.websiteViewsFooter || "campaign sent 2 days ago",
    chart: {
      type: "bar",
      height: 220,
      series: [{ name: "Views", data: data?.websiteViews || [] }],
      options: {
        ...chartsConfig,
        colors: "#fff",
        plotOptions: { bar: { columnWidth: "15%", borderRadius: 3 } },
        xaxis: { ...chartsConfig.xaxis, categories: data?.categories || [] },
      },
    },
  },
  {
    color: "green",
    title: data?.dailySalesTitle || "Daily Sales",
    description: data?.dailySalesDescription || "15% increase in today sales",
    footer: data?.dailySalesFooter || "updated 4 min ago",
    chart: {
      type: "line",
      height: 220,
      series: [{ name: "Sales", data: data?.dailySales || [] }],
      options: {
        ...chartsConfig,
        colors: ["#fff"],
        stroke: { lineCap: "round" },
        markers: { size: 5 },
        xaxis: { ...chartsConfig.xaxis, categories: data?.months || [] },
      },
    },
  },
  {
    color: "black",
    title: data?.completedTasksTitle || "Completed Tasks",
    description: data?.completedTasksDescription || "Last Campaign Performance",
    footer: data?.completedTasksFooter || "just updated",
    chart: {
      type: "line",
      height: 220,
      series: [{ name: "Tasks", data: data?.completedTasks || [] }],
      options: {
        ...chartsConfig,
        colors: ["#fff"],
        stroke: { lineCap: "round" },
        markers: { size: 5 },
        xaxis: { ...chartsConfig.xaxis, categories: data?.months || [] },
      },
    },
  },
];

export const statisticsChartsData = () => {
  const { data, loading, error } = useFetch(apiUrl, {}, transformData);

  return useMemo(() => ({ data, loading, error }), [data, loading, error]);
};

export default statisticsChartsData;
