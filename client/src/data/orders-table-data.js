import { useFetch } from "@/hooks/useFetch";

const apiUrl = `https://zohfy.in/wabot/service/get-all-orders`;


const transformOrders = (apiResponse) => ({
  orders: apiResponse.content.map(o => ({
    id: o.id,
    phone: o.phone,
    name: o.customerName,
    address: o.address,
    postcode: o.postcode,
    price: o.price,
    status: o.status,
  })),
  totalPages: apiResponse.totalPages,
  totalRecords: apiResponse.totalElements,
});

export const ordersTableData = (page = 1, size = 10) => {
  return useFetch(`${apiUrl}?page=${page}&size=${size}`, {}, transformOrders);
};

export default ordersTableData;
