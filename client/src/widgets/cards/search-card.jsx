import { Card, CardFooter, CardBody, Typography, Button, Input } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { searchData } from "@/data";

export const SearchCard = ({ onClose }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const { data } = searchData();

    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    useEffect(() => {
        if (!data || !data.customers) {
            setResults([{ message: "No results found." }]);
            return;
        }

        if (searchTerm === "") {
            setResults([{ message: "No results found." }]);
            return;
        }

        if (!/^[0-9]*$/.test(searchTerm)) {
            setResults([{ message: "Please enter a valid phone number." }]);
            return;
        }

        if (searchTerm.length > 10) {
            setResults([{ message: "Invalid phone number." }]);
            return;
        }

        setLoading(true);

        const filteredResults = data.customers.filter(customer =>
            customer.phone.startsWith(searchTerm)
        );

        setResults(filteredResults.length > 0 ? filteredResults : [{ message: "No results found." }]);
        setLoading(false);


    }, [searchTerm, data]);

    const handleBackgroundClick = (e) => {
        if (e.target.id === "overlay-background") {
            onClose();
        }
    };

    return (
        <div id="overlay-background" className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 min-h-full min-w-full overflow-y-auto" onClick={handleBackgroundClick}>
            <Card className="w-full max-w-xs md:max-w-2xl p-4 mt-5 md:mt-20">
                <div className="w-full max-w-xl mt-2 mx-auto">
                    <Input
                        placeholder="Search..."
                        icon={<MagnifyingGlassIcon className="w-7 h-8 mr-4" />}
                        className="h-14 text-lg px-4 !border-t-blue-gray-200 focus:!border-blue-gray-300 placeholder:text-lg"
                        labelProps={{ className: "before:content-none after:content-none" }}
                        containerProps={{ className: "min-w-0" }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <CardBody className="max-h-96 overflow-y-auto mt-7">
                    {loading ? (
                        [...Array(3)].map((_, index) => (
                            <div key={index} className="p-2 bg-gray-100 animate-pulse rounded-lg mb-2 flex">
                                <div className="w-1/3 pr-2">
                                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                                </div>
                                <div className="w-px bg-gray-200"></div>
                                <div className="w-1/2 pl-2">
                                    <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        results.map((result, index) => (
                            result.message ? (
                                <Typography key={index} className="text-gray-500 text-center">{result.message}</Typography>
                            ) : (
                                <div key={result.id} className="p-2 bg-gray-50 bg-opacity-90 rounded-lg mb-1 flex flex-col md:flex-row  ">
                                    <div className="md:w-1/3 pr-2 ">
                                        <Typography className="text-gray-700 font-semibold">{result.name}</Typography>
                                        <Typography className="text-gray-600 text-sm md:text-md font-normal">{result.phone}</Typography>
                                    </div>
                                    <div className="w-px bg-gray-100"></div>
                                    <div className="md:w-1/2 mt-2 md:pl-2 md:mt-0">
                                        <Typography className="text-gray-600 text-sm md:text-md font-normal">{result.address}</Typography>
                                        <Typography className="text-gray-600 text-sm md:text-md font-normal">{result.postcode}</Typography>
                                    </div>
                                </div>
                            )
                        ))
                    )}
                </CardBody>
                <CardFooter className="pt-3">
                    <Button size="lg" fullWidth={true} onClick={onClose} className="bg-blue-gray-800">
                        Close
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SearchCard;
