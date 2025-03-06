import { useFetch } from "@/hooks/useFetch";

const apiUrl = "https://zohfy.in/wabot/service/get-single-customer";

const transformData = (apiResponse) => ({
    customers: apiResponse.map(c => ({
        id: c.id,
        phone: c.phone,
        orderIntime: c.orderIntime,
        status: c.status,
        weight: c.weight,
        quantity: c.quantity,
        price: c.price,
        shippingPrice: c.shippingPrice,
        batchId: c.batchId,
        customerName: c.customerName,
        postcode: c.postcode,
        state: c.state,
        address: c.address,
        timestamp: c.timestamp,
        email: c.email,
        productDetails: c.productDetails.map(p => ({
            productId: p.productId,
            productNameEN: p.productNameEN,
            productNameTA: p.productNameTA,
            price: p.price,
            weight: p.weight,
            quantity: p.quantity
        }))
    }))
});

export const searchData = (phNO) => {
    return useFetch(`${apiUrl}?phone=${phNO}`, {}, transformData);
};

export default searchData;
