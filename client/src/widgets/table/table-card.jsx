import { useEffect } from "react";
import { Card, CardHeader, CardBody, Typography, IconButton } from "@material-tailwind/react";
import { useFetch } from "@/hooks/useFetch";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useMaterialTailwindController } from "@/context";


export const OverlayCard = ({ rowID, onClose }) => {
    const [controller] = useMaterialTailwindController();
    const { sidenavColor } = controller;
    const API_BASE_URL = import.meta.env.VITE_API_SERV_BASE_URL;
    const url = `${API_BASE_URL}/get-single-order?orderId=${rowID}`;

    const { data, loading, error } = useFetch(url);

    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    const handleBackgroundClick = (e) => {
        if (e.target.id === "overlay-background") {
            onClose();
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (!data) return null;

    const products = Array.isArray(data.productDetails) ? data.productDetails : [];
    const fieldMapping = {
        customerName: "Customer Name",
        orderIntime: "Order In-Time",
        phone: "Phone",
        postcode: "Postcode",
        price: "Price",
        quantity: "Quantity",
        shippingPrice: "Shipping Price",
        state: "State",
        status: "Status",
        weight: "Weight",
        timestamp: "Created At",
        address: "Address",
        batchId: "Batch ID",
        id: "Order ID"
    };
    const sidenavColors = {
        white: "from-gray-200 to-gray-300 border-gray-400",
        dark: "from-blue-gray-900 to-blue-gray-700",
        green: "from-green-400 to-green-600",
        orange: "from-orange-700 to-orange-800",
        red: "from-red-400 to-red-600",
        pink: "from-pink-400 to-pink-600",
    };

    return (
        <div
            id="overlay-background"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 min-h-full min-w-full overflow-y-auto"

            onClick={handleBackgroundClick}
        >
            <Card className="relative max-w-xs md:max-w-xl lg:max-w-2xl pb-5 space-y-4 px-0 md:px-2 bg-white shadow-2xl rounded-lg overflow-hidden overflow-y-auto max-h-[calc(100vh-32px)]">

                <IconButton
                    variant="text"
                    color="black"
                    size="sm"
                    ripple={false}
                    className="absolute -top-1 -right-1 font-bold text-gray-600 bg-transparent mb-7 hover:bg-transparent"
                    onClick={() => onClose()}
                >
                    <XMarkIcon strokeWidth={2.5} className="h-4 w-4 md:h-5 md:w-5 text-black" />
                </IconButton>

                <CardHeader
                    variant="gradient"
                    color="blue-gray"
                    floated={false}


                    className={`text-white relative rounded-t-lg shadow-md text-center  bg-gradient-to-br ${sidenavColors[sidenavColor]} min-h-[50px] flex items-center justify-center `}
                >
                    <Typography variant="h6" color={`${sidenavColor == "white" ? "black" : "white"}`} className=" text-xl font-semibold">
                        Order Details
                    </Typography>
                </CardHeader>

                <CardBody className="p-0 md:p-4 pt-4">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-0 px-10 border-b pb-4">
                        {Object.entries(data).map(([key, value]) => (
                            key !== "productDetails" && (
                                <Typography key={key} className="text-[14px] font-bold p-1 text-blue-gray-700">
                                    <span className="text-blue-gray-400 uppercase text-[10px] md:text-[12px]">{fieldMapping[key]}: </span>
                                    <strong>{typeof value === "object" ? JSON.stringify(value) : value}{key == "weight" ? "g" : ""}</strong>
                                </Typography>
                            )
                        ))}
                    </div>

                    {products.length > 0 && (
                        <div className="mt-3 px-4">
                            <Typography className="text-md font-semibold text-blue-gray-700 text-start ml-2 mb-1">
                                Product Details:
                            </Typography>

                            <div className=" overflow-x-auto  overflow-y-auto" style={{ maxHeight: "300px" }}>
                                <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
                                    <thead className=" text-blue-gray-700 sticky top-0 bg-gray-100 z-10">
                                        <tr>
                                            <th className="border px-4 py-2 text-left">#</th>
                                            <th className="border px-4 py-2 text-left">Name</th>
                                            <th className="border px-4 py-2 text-left">Price</th>
                                            <th className="border px-4 py-2 text-left">Weight</th>
                                            <th className="border px-4 py-2 text-left">Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product, index) => (
                                            <tr key={index} className={`py-3 text-sm md:text-md px-5 border-b ${index % 2 === 1 ? "bg-gray-100" : ""}`}>
                                                <td className=" px-4 py-2">{index + 1}</td>
                                                <td className=" px-4 py-2">{product.productNameEN}</td>
                                                <td className=" px-4 py-2">{product.price}</td>
                                                <td className=" px-4 py-2">{product.weight}g</td>
                                                <td className=" px-4 py-2">{product.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                </CardBody>
            </Card>
        </div>
    );
};
