import { Card, CardFooter, CardBody, Typography, Button, Input } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";


export const SearchCard = ({ onClose }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([{ message: "No results found." }]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    const handleInputChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 10) {
            value = value.slice(0, 10);
        }

        setSearchTerm(value);

        if (value.length === 10) {
            fetchData(value);
        } else {
            setResults([{ message: "Please enter a 10-digit phone number." }]);
        }
    };

    const fetchData = async (number) => {
        setLoading(true);
        const phoneNumber = `91${number}`;
        try {
            const response = await fetch(`https://zohfy.in/wabot/service/get-single-customer?phone=${phoneNumber}`);
            const data = await response.json();


            if (!data) {
                setResults([{ message: "No results found." }]);
            } else {
                setResults(data);
            }
        } catch (error) {
            setResults([{ message: "Error fetching data." }]);
        }
        setLoading(false);
    };

    const handleBackgroundClick = (e) => {
        if (e.target.id === "overlay-background") {
            onClose();
        }
    };

    const cardMaxWidth = loading || (results.length > 0 && !results[0].message) ? " max-w-xs md:max-w-4xl" : "max-w-xs md:max-w-2xl";

    return (
        <div id="overlay-background" className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 min-h-full min-w-full overflow-y-auto" onClick={handleBackgroundClick}>
            <Card className={`w-full ${cardMaxWidth} p-4 mt-5 md:mt-20 transition-all duration-300 ease-in-out`}>
                <div className="w-full max-w-xl mt-2 mx-auto">
                    <Input
                        placeholder="Search..."
                        icon={<MagnifyingGlassIcon className="w-5 h-5 mr-4" />}
                        className="h-14 text-lg px-4 !border-t-blue-gray-200 focus:!border-blue-gray-300 placeholder:text-lg"
                        labelProps={{ className: "before:content-none after:content-none" }}
                        containerProps={{ className: "min-w-0" }}
                        value={searchTerm}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <CardBody className="max-h-[60vh] overflow-y-auto mt-7">
                    {loading ? (
                        [...Array(3)].map((_, index) => (
                            <div key={index} className="p-4 bg-gray-100 animate-pulse rounded-lg mb-3 shadow-md border px-5">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[...Array(2)].map((_, colIndex) => (
                                        <div key={colIndex}>
                                            <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className={`h-4 bg-gray-300 rounded mb-2 ${i % 2 === 0 ? 'w-1/2' : 'w-full'}`}></div>
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4">
                                    <div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                                        {[...Array(2)].map((_, pIndex) => (
                                            <div key={pIndex} className="p-2 bg-gray-200 rounded-lg shadow-sm border">
                                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        results.map((result, index) => (
                            result.message ? (
                                <Typography key={index} className="text-gray-500 text-center">{result.message}</Typography>
                            ) : (
                                <div key={result.id} className="p-3 bg-gray-50 bg-opacity-50 rounded-lg mb-3 shadow-md border px-5">

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                        <div>
                                            <Typography className="text-gray-700 font-semibold text-md md:text-lg">{result.customerName}</Typography>
                                            <Typography className="text-gray-600 text-sm md:text-md font-normal">Phn No: {result.phone}</Typography>
                                            <Typography className="text-gray-600 text-sm md:text-md font-normal">Address: {result.address}, {result.state}, {result.postcode}</Typography>
                                            <Typography className="text-gray-600 text-sm md:text-md  font-normal">Email: {result.email}</Typography>
                                            <Typography className="text-gray-600 text-sm md:text-md font-normal">Batch ID: {result.batchId}</Typography>
                                            <Typography className="text-gray-600 text-sm md:text-md  font-normal">Order In-Time: {result.orderIntime}</Typography>
                                        </div>

                                        <div>
                                            <Typography className="text-gray-600 text-sm md:text-md  font-semibold">Status: {result.status}</Typography>

                                            <Typography className="text-gray-600 text-sm md:text-md  font-normal">Order Time: {result.timestamp}</Typography>
                                            <Typography className="text-gray-600 text-sm md:text-md  font-normal">Quantity: {result.quantity}</Typography>
                                            <Typography className="text-gray-600 text-sm md:text-md font-normal">Weight: {result.weight} kg</Typography>
                                            <Typography className="text-gray-600 text-sm md:text-md  font-normal">Price: ₹{result.price}</Typography>
                                            <Typography className="text-gray-600 text-sm md:text-md  font-normal">Shipping Price: ₹{result.shippingPrice}</Typography>
                                        </div>
                                    </div>


                                    <div className="mt-4">
                                        <Typography className="text-gray-700 font-semibold text-md md:text-lg">Products:</Typography>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 font-normal">
                                            {result.productDetails.map((product, pIndex) => (
                                                <div key={pIndex} className="p-2 bg-gray-100 rounded-lg shadow-sm border">
                                                    <Typography className="text-gray-700 text-sm md:text-md font-normal">{product.productNameEN}</Typography>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                        ))
                    )}
                </CardBody>


                <CardFooter className="pt-3 w-full flex justify-center ">
                    <Button size="lg" className="w-96 mx-auto bg-blue-gray-800" onClick={onClose} >
                        Close
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SearchCard;
