import React, { useState } from "react";
import { Card, CardHeader, CardBody, Typography, Select, Option } from "@material-tailwind/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { customersTableData } from "@/data";

export const CustomerTable = () => {
    const [customersPage, setCustomersPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: "id", direction: "ascending" });

    const { data, loading, error } = customersTableData(customersPage, rowsPerPage);
    const { customers = [], totalPages = 1, totalRecords = 0 } = data || {};

    const handleSort = (key) => {
        setSortConfig((prevConfig) => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === "ascending" ? "descending" : "ascending",
        }));
    };

    const sortedCustomers = [...customers].sort((a, b) => {
        if (!sortConfig.key) return 0;
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "ascending" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
    });

    const handleRowsChange = (value) => {
        setRowsPerPage(parseInt(value));
        setCustomersPage(1);
    };

    return (
        <Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                <Typography variant="h6" color="white">Customer Table</Typography>
            </CardHeader>
            <CardBody>
                {loading ? (
                    <Typography className="text-center text-blue-gray-500">Loading...</Typography>
                ) : error ? (
                    <Typography className="text-center text-red-500">Error: {error}</Typography>
                ) : (
                    <>
                        <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
                            <table className="w-full min-w-[640px] table-auto">
                                <thead>
                                    <tr>
                                        {["ID", "Name", "Address", "Phone", "Pincode"].map((el) => (
                                            <th key={el} className="border-b py-3 px-5 text-left cursor-pointer" onClick={() => handleSort(el.toLowerCase())}>
                                                <button className="flex items-center gap-1">
                                                    <Typography className="text-[11px] font-bold uppercase text-blue-gray-400">{el}</Typography>
                                                    {sortConfig.key === el.toLowerCase() && (
                                                        sortConfig.direction === "ascending" ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedCustomers.map(({ id, name, address, phone, postcode }) => (
                                        <tr key={id}>
                                            <td className="py-3 px-5 border-b">{id}</td>
                                            <td className="py-3 px-5 border-b">{name}</td>
                                            <td className="py-3 px-5 border-b">{address}</td>
                                            <td className="py-3 px-5 border-b">{phone}</td>
                                            <td className="py-3 px-5 border-b">{postcode}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between items-center mt-4 px-4">
                            <div>
                                <label className="mr-2 text-sm font-medium text-blue-gray-600">Rows per page:</label>
                                <Select value={rowsPerPage.toString()} className="w-full" onChange={handleRowsChange} >
                                    <Option value="10">10</Option>
                                    <Option value="25">25</Option>
                                </Select>
                            </div>
                            <div className="text-sm font-medium text-blue-gray-600">
                                Page {customersPage} of {totalPages} ||  Total Records: {totalRecords}
                            </div>
                            <nav aria-label="Table pagination">
                                <ul className="inline-flex items-center space-x-2">
                                    <li>
                                        <button
                                            onClick={() => setCustomersPage((prev) => Math.max(prev - 1, 1))}
                                            disabled={customersPage === 1}
                                            className="px-3 py-1 text-sm font-medium border rounded-lg disabled:opacity-50"
                                        >
                                            Prev
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setCustomersPage((prev) => Math.min(prev + 1, totalPages))}
                                            disabled={customersPage === totalPages}
                                            className="px-3 py-1 text-sm font-medium border rounded-lg disabled:opacity-50"
                                        >
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </>
                )}
            </CardBody>
        </Card>
    );
};

export default CustomerTable;
