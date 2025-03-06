import { useFetch } from "@/hooks/useFetch";


const apiUrl = "https://zohfy.in/wabot/service/get-dashboard-data";

const transformCustomers = (apiResponse) => ({
    month_stats: apiResponse.map(c => ({
        orderDay: c.orderDay,
        totalOrders: c.totalOrders,
        totalPaidOrders: c.totalPaidOrders,
        totalProductsSold: c.totalProductsSold,
        totalRevenue: c.totalRevenue,
        paidRevenue: c.paidRevenue,
        pendingRevenue: c.pendingRevenue,
    })),
});


export const statisticsMonthlyCardsData = () => {
    return useFetch(apiUrl, {}, transformCustomers);
};

export default statisticsMonthlyCardsData;
