import { useFetch } from "@/hooks/useFetch";

const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/orders`;


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
