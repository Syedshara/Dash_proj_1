import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import { useFetch } from "@/hooks/useFetch";
import { useRef } from "react";

export const OverlayCard = ({ rowID, onClose }) => {
    const API_BASE_URL = import.meta.env.VITE_API_SERV_BASE_URL;
    const url = `${API_BASE_URL}/get-single-order?orderId=${rowID}`;
    const { data, loading, error } = useFetch(url);
    const sliderRef = useRef(null);

    const handleBackgroundClick = (e) => {
        if (e.target.id === "overlay-background") {
            onClose();
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (!data) return null;

    const products = Array.isArray(data.productDetails) ? data.productDetails : [];

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -250, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 250, behavior: "smooth" });
        }
    };

    return (
        <div
            id="overlay-background"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50   "
            onClick={handleBackgroundClick}
        >
            <Card className="relative  w-[90vw] md:w-[700px]  my-atuo max-h-[90vh] overflow-y-auto  space-y-4 px-0 md:px-4 scrollbar-hide snap-y snap-mandatory  bg-white shadow-2xl rounded-lg ">
                <CardHeader
                    variant="gradient"
                    color="blue-gray"
                    floated={false}
                    className=" text-white relative rounded-t-lg shadow-md  text-center bg-gradient-to-br from-blue-gray-900 to-blue-gray-700 min-h-[50px] first-letter flex items-center justify-center"
                >
                    <Typography variant="h6" className="text-white text-xl font-semibold">
                        Order Details
                    </Typography>

                </CardHeader>


                <CardBody className="p-0 md:p-6 pt-8">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-0 px-10 border-b pb-4">
                        {Object.entries(data).map(([key, value]) => (
                            key !== "productDetails" && (
                                <Typography key={key} className="text-[14px] font-bold uppercase p-2 text-blue-gray-700">
                                    <spanc className="text-blue-gray-400 text-[12px]">{key}: </spanc> <strong>{typeof value === "object" ? JSON.stringify(value) : value}</strong>
                                </Typography>
                            )
                        ))}
                    </div>

                    {products.length > 0 && (
                        <div className="mt-6">
                            <Typography className="text-lg font-semibold text-blue-gray-700 text-start ml-4  mb-3">
                                Products Details :
                            </Typography>

                            <div className="relative flex items-center">
                                <button onClick={scrollLeft} className="text-xl p-2 absolute left-0 z-10 bg-gray-300 rounded-full shadow-md opacity-60">
                                    ◀
                                </button>

                                <div ref={sliderRef} className="flex overflow-x-auto space-x-4 px-12 scrollbar-hide snap-x snap-mandatory">
                                    {products.map((product, index) => (
                                        <Card key={index} className="min-w-[220px] bg-gray-100 border p-1 rounded-lg shadow-lg snap-center">
                                            <CardBody>
                                                <Typography className="text-[12px] font-bold uppercase p-1 text-blue-gray-700">
                                                    <strong>Product Name:</strong> {product.productNameEN}
                                                </Typography>
                                                <Typography className="text-[12px] font-bold uppercase p-1 text-blue-gray-700">
                                                    <strong>Price:</strong> {product.price}
                                                </Typography>
                                                <Typography className="text-[12px] font-bold uppercase p-1 text-blue-gray-700">
                                                    <strong>Weight:</strong> {product.weight}g
                                                </Typography>
                                                <Typography className="text-[12px] font-bold uppercase p-1 text-blue-gray-700">
                                                    <strong>Quantity:</strong> {product.quantity}
                                                </Typography>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </div>

                                <button onClick={scrollRight} className="text-xl p-2 absolute right-0 z-10 bg-gray-300 rounded-full shadow-md opacity-60">
                                    ▶
                                </button>
                            </div>
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default OverlayCard;
