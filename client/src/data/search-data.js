import { useFetch } from "@/hooks/useFetch";

const apiUrl = "https://zohfy.in/wabot/service/get-all-customers";

const transformCustomers = (apiResponse) => ({
    customers: apiResponse.content.map(c => ({
        id: c.id,
        phone: c.phone,
        name: c.firstName + " " + (c.lastName === null ? "" : c.lastName),
        address: c.address,
        postcode: c.postcode,
    })),
});

export const searchData = (page = 1, size = 10) => {
    return useFetch(`${apiUrl}?page=${page}&size=${size}`, {}, transformCustomers);
};

export default searchData;
