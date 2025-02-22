import { useFetch } from "@/hooks/useFetch";

const apiUrl = "http://127.0.0.1:3002/api/customers";

const transformCustomers = (apiResponse) => ({
  customers: apiResponse.content.map(c => ({
    id: c.id,
    phone: c.phone,
    name: c.customerName,
    address: c.address,
    postcode: c.postcode,
  })),
  totalPages: apiResponse.totalPages,
  totalRecords: apiResponse.totalElements,
});

export const customersTableData = (page = 1, size = 10) => {
  return useFetch(`${apiUrl}?page=${page}&size=${size}`, {}, transformCustomers);
};

export default customersTableData;
