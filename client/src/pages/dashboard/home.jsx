import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
} from "@/data";
import { ClockIcon } from "@heroicons/react/24/solid";
import card from "@material-tailwind/react/theme/components/card";

export function Home() {
  const cardData = statisticsCardsData();
  const chartData = statisticsChartsData();



  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {cardData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-6 text-white grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {chartData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
          // footer={
          //   <Typography
          //     variant="small"
          //     className="flex items-center font-normal text-blue-gray-600"
          //   >
          //     <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
          //     &nbsp;{props.footer}
          //   </Typography>
          // }
          />
        ))}
      </div>

    </div>
  );
}

export default Home;
