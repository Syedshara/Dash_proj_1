import React, { useState } from "react";
import { Typography, Card, Select, Option } from "@material-tailwind/react";
import { statisticsMonthlyCardsData } from "@/data";
import { StatisticsMonCard } from "@/widgets/cards";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().toLocaleString("en-US", { month: "short" }).toUpperCase();

export function StatisticsMonthly() {
    const { data, error } = statisticsMonthlyCardsData();

    const [selectedYear, setSelectedYear] = useState(currentYear.toString());
    const [selectedMonth, setSelectedMonth] = useState(currentMonth.toString());


    const filteredData = data?.month_stats?.filter((item) => item.orderDay.startsWith(selectedMonth)) || [];

    const totalOrders = filteredData.reduce((sum, item) => sum + item.totalOrders, 0);
    const totalProductsSold = filteredData.reduce((sum, item) => sum + item.totalProductsSold, 0);
    const totalPaidRevenue = filteredData.reduce((sum, item) => sum + item.totalRevenue, 0);

    return (

        <div className="mb-12">
            <div className="w-full flex justify-end px-12 ">
                <div className="  w-40 ">
                    <Select
                        value={selectedMonth}
                        label="Month"
                        onChange={(value) => setSelectedMonth(value)}
                    >
                        {["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"].map((month) => (
                            <Option key={month} value={month}>
                                {month}
                            </Option>
                        ))}
                    </Select>
                </div>


            </div>



            {filteredData.length > 0 ? (
                <StatisticsMonCard
                    title={`Details for ${selectedMonth}, ${selectedYear}`}
                    totalOrders={totalOrders}
                    totalProductsSold={totalProductsSold}
                    totalRevenue={totalPaidRevenue}
                />
            ) : (
                <Typography className="text-center text-gray-500">No Data Available</Typography>
            )}

        </div>
    );
}

export default StatisticsMonthly;
