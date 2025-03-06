import { useMemo, useState, useEffect } from "react";
import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import dayjs from "dayjs";

const apiUrl = "https://zohfy.in/wabot/service/get-dashboard-data";

export const statisticsCardsData = () => {
  const [data, setData] = useState([]);
  const [todayKey, setTodayKey] = useState("");
  const [yesterdayKey, setYesterday] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setData(response.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const localDate = dayjs();
    const monthAbbr = localDate.format("MMM").toUpperCase();
    const day = localDate.format("DD");
    setTodayKey(`${monthAbbr}${day}`);
  }, []);


  return useMemo(() => {
    if (!data.length || !todayKey) return [];

    let todayData = data.find((entry) => entry.orderDay === todayKey);
    if (!todayData) {
      let prevDate = dayjs().subtract(1, "day");
      while (!todayData) {
        const prevKey = `${prevDate.format("MMM").toUpperCase()}${prevDate.format("DD")}`;
        todayData = data.find((entry) => entry.orderDay === prevKey);
        setYesterday(true);
        if (todayData) break;
        prevDate = prevDate.subtract(1, "day");
      }
    }
    const val = yesterdayKey ? "Yesterday :" : "Today :"


    return todayData
      ? [
        {
          color: "gray",
          icon: UsersIcon,
          title: "Total Orders",
          value: todayData.totalOrders || "0",
          footer: {
            color: "text-green-500",
            value: val,
            label: "Order count",
          },
        },
        {
          color: "blue",
          icon: UserPlusIcon,
          title: "Paid Orders",
          value: todayData.totalPaidOrders || "0",
          footer: {
            color: "text-green-500",
            value: val,
            label: "Successful orders",
          },
        },
        {
          color: "green",
          icon: BanknotesIcon,
          title: "Total Revenue",
          value: `${todayData.totalRevenue || "0"}`,
          footer: {
            color: "text-green-500",
            value: val,
            label: "Earnings ",
          },
        },
        {
          color: "pink",
          icon: ChartBarIcon,
          title: "Total Products Sold",
          value: `${todayData.totalProductsSold || "0"}`,
          footer: {
            color: "text-green-500",
            value: "Today :",
            label: "No of Products Sold",
          },
        },
      ]
      : [];
  }, [data, todayKey]);
};

export default statisticsCardsData;