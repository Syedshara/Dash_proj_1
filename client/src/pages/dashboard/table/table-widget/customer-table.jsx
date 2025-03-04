import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardBody, Typography, Select, Option } from "@material-tailwind/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { customersTableData } from "@/data";
import { OverlayCard } from "@/widgets/table/table-card";
import { useMaterialTailwindController } from "@/context";

export const CustomerTable = () => {
    const [controller] = useMaterialTailwindController();
    const { sidenavColor } = controller;
    const [customersPage, setCustomersPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: "id", direction: "ascending" });
    const [selectedRow, setSelectedRow] = useState(null);
    const tableRef = useRef(null);

    const { data, error } = customersTableData(customersPage, rowsPerPage);
    const { customers = [], totalPages = 1, totalRecords = 0 } = data || {};

    useEffect(() => {
        if (tableRef.current) tableRef.current.scrollTop = 0;
    }, [customers]);

    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === "ascending" ? "descending" : "ascending",
        }));
    };

    const sortedCustomers = [...customers].sort((a, b) => {
        if (!sortConfig.key) return 0;
        return sortConfig.direction === "ascending"
            ? String(a[sortConfig.key]).localeCompare(String(b[sortConfig.key]))
            : String(b[sortConfig.key]).localeCompare(String(a[sortConfig.key]));
    });

    const sidenavColors = {
        white: "from-gray-200 to-gray-300 border-gray-200",
        dark: "from-blue-gray-900 to-blue-gray-700",
        green: "from-green-400 to-green-600",
        orange: "from-orange-700 to-orange-800",
        red: "from-red-400 to-red-600",
        pink: "from-pink-400 to-pink-600",
    };


    return (
        <>
            <Card>
                <CardHeader variant="gradient" color="gray" className={`p-6 bg-gradient-to-br ${sidenavColors[sidenavColor]} `}>
                    <Typography variant="h6" color={`${sidenavColor == "white" ? "black" : "white"}`}>Customer Table</Typography>
                </CardHeader>
                <CardBody>
                    {error ? (
                        <Typography className="text-center text-red-500">Error: {error}</Typography>
                    ) : (
                        <>
                            <div ref={tableRef} className="overflow-y-auto" style={{ maxHeight: "400px" }}>
                                <table className="w-full min-w-[640px] table-auto">
                                    <thead className="sticky top-0 bg-gray-100 z-10 ">
                                        <tr>
                                            {["ID", "Name", "Address", "Phone", "Pincode"].map(el => (
                                                <th key={el} className="border-b py-3 px-5 text-left cursor-pointer" onClick={() => handleSort(el.toLowerCase())}>
                                                    <button className="flex items-center gap-1">
                                                        <Typography className="text-[12px] font-bold uppercase p-2 text-blue-gray-400">{el}</Typography>
                                                        {sortConfig.key === el.toLowerCase() && (sortConfig.direction === "ascending" ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />)}
                                                    </button>
                                                </th>
                                            ))}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedCustomers.map(row => (
                                            <tr key={row.id}>
                                                {["id", "name", "address", "phone", "postcode"].map(field => (
                                                    <td key={field} className="py-3 text-sm md:text-md px-5 border-b">{row[field]}</td>
                                                ))}
                                                {/* <td className="py-3 px-5 border-b">
                                                    <button className="px-3 py-1 text-sm font-medium border rounded-lg hover:bg-gray-200" onClick={() => setSelectedRow(row)}>
                                                        Edit
                                                    </button>
                                                </td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex flex-col gap-y-5 md:flex-row justify-between items-center mt-4 px-4">
                                <div>
                                    <label className="mr-2 text-sm font-medium text-blue-gray-600">Rows per page:</label>
                                    <Select value={rowsPerPage.toString()} className="w-full" onChange={value => setRowsPerPage(parseInt(value))}>
                                        {[10, 25].map(num => <Option key={num} value={num.toString()}>{num}</Option>)}
                                    </Select>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Typography className="text-sm font-medium text-blue-gray-600">
                                        {`${(customersPage - 1) * rowsPerPage + 1}-${Math.min(customersPage * rowsPerPage, totalRecords)}`} of {totalRecords}
                                    </Typography>
                                    <nav aria-label="Table pagination">
                                        <ul className="inline-flex items-center space-x-2">
                                            {["Prev", "Next"].map((btn, idx) => (
                                                <li key={btn}>
                                                    <button
                                                        onClick={() => setCustomersPage(idx === 0 ? Math.max(customersPage - 1, 1) : Math.min(customersPage + 1, totalPages))}
                                                        disabled={idx === 0 ? customersPage === 1 : customersPage === totalPages}
                                                        className="px-3 py-1 text-sm font-medium border rounded-lg disabled:opacity-50"
                                                    >
                                                        {btn}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </>
                    )}
                </CardBody>
            </Card>
            {selectedRow && <OverlayCard rowData={selectedRow} onClose={() => setSelectedRow(null)} />}
        </>
    );
};

export default CustomerTable;