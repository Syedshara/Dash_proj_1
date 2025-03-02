import { useEffect } from "react";
import { Card, CardHeader, CardBody, Typography, IconButton } from "@material-tailwind/react";
import { useFetch } from "@/hooks/useFetch";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const OverlayCard = ({ rowID, onClose }) => {
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

    return (
        <div
            id="overlay-background"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 min-h-full min-w-full"
            onClick={handleBackgroundClick}
        >
            <Card className="relative max-w-xs md:max-w-xl lg:max-w-2xl pb-5 space-y-4 px-0 md:px-2 bg-white shadow-2xl rounded-lg">

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
                    className="text-white relative rounded-t-lg shadow-md text-center bg-gradient-to-br from-blue-gray-900 to-blue-gray-700 min-h-[50px] flex items-center justify-center"
                >
                    <Typography variant="h6" className="text-white text-xl font-semibold">
                        Order Details
                    </Typography>
                </CardHeader>

                <CardBody className="p-0 md:p-4 pt-4">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-0 px-10 border-b pb-4">
                        {Object.entries(data).map(([key, value]) => (
                            key !== "productDetails" && (
                                <Typography key={key} className="text-[14px] font-bold p-1 text-blue-gray-700">
                                    <span className="text-blue-gray-400 uppercase text-[12px]">{key}: </span>
                                    <strong>{typeof value === "object" ? JSON.stringify(value) : value}</strong>
                                </Typography>
                            )
                        ))}
                    </div>

                    {products.length > 0 && (
                        <div className="mt-6">
                            <Typography className="text-lg font-semibold text-blue-gray-700 text-start ml-4 mb-3">
                                Products Details:
                            </Typography>

                            <div className="max-h-[250px] overflow-y-auto px-4 scrollbar-hide space-y-1">
                                {products.map((product, index) => (
                                    <div key={index} className=" pb-1">
                                        <div className="grid grid-cols-2 gap-x-4 bg-gray-100 rounded-lg py-2 px-3">
                                            <div>
                                                <Typography className="text-[13px] font-bold uppercase text-blue-gray-700">
                                                    <strong>Name:</strong> {product.productNameEN}
                                                </Typography>
                                                <Typography className="text-[13px] font-bold uppercase text-blue-gray-700">
                                                    <strong>Price:</strong> {product.price}
                                                </Typography>
                                            </div>

                                            <div className="border-l border-gray-300 pl-3">
                                                <Typography className="text-[13px] font-bold uppercase text-blue-gray-700">
                                                    <strong>Product Name TA:</strong> {product.productNameTA}
                                                </Typography>
                                                <Typography className="text-[13px] font-bold uppercase text-blue-gray-700">
                                                    <strong>Weight:</strong> {product.weight}g
                                                </Typography>
                                                <Typography className="text-[13px] font-bold uppercase text-blue-gray-700">
                                                    <strong>Qty:</strong> {product.quantity}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};
