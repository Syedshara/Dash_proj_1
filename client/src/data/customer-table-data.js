import { useFetch } from "@/hooks/useFetch";

const apiUrl = "http://103.91.186.65:30045/service/get-all-customers";

const transformCustomers = (apiResponse) => ({
  customers: apiResponse.content.map(c => ({
    id: c.id,
    phone: c.phone,
    name: c.firstName + " " + (c.lastName === null ? "" : c.lastName),
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
