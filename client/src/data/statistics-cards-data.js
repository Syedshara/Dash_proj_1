import { useMemo } from "react";
import useFetch from "@/hooks/useFetch";
import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

const apiUrl = "http://127.0.0.1:3001/api/dash-data";

export const statisticsCardsData = () => {
  const { data } = useFetch(apiUrl);

  return useMemo(() => {
    if (!data) return []; // Ensure no errors when data is initially null

    return [
      {
        color: "gray",
        icon: UsersIcon,
        title: "Total Users",
        value: data.totalUsers || "0",
        footer: {
          color: "text-green-500",
          value: "+0%",
          label: "since last update",
        },
      },
      {
        color: "blue",
        icon: UserPlusIcon,
        title: "Bookings",
        value: data.bookings || "0",
        footer: {
          color: "text-green-500",
          value: "+0%",
          label: "since last update",
        },
      },
      {
        color: "green",
        icon: BanknotesIcon,
        title: "Revenue",
        value: `${data.revenue || "0"}`,
        footer: {
          color: "text-green-500",
          value: "+0%",
          label: "since last update",
        },
      },
      {
        color: "pink",
        icon: ChartBarIcon,
        title: "Followers",
        value: data.followers || "0",
        footer: {
          color: "text-green-500",
          value: "+0%",
          label: "since last update",
        },
      },
    ];
  }, [data]);
};

export default statisticsCardsData;
