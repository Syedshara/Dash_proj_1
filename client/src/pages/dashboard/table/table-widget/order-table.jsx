import React, { useState, useRef } from "react";
import { Card, CardHeader, CardBody, Typography, Select, Option } from "@material-tailwind/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { ordersTableData } from "@/data";
import { OverlayCard } from "@/widgets/table/table-card";


export const OrdersTable = () => {
    const [ordersPage, setOrdersPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: "id", direction: "ascending" });
    const [selectedRow, setSelectedRow] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const tableRef = useRef(null);
    const { data } = ordersTableData(ordersPage, rowsPerPage);
    const { orders = [], totalPages = 1, totalRecords = 0 } = data || {};

    const handleSort = (key) => {
        setSortConfig((prevConfig) => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === "ascending" ? "descending" : "ascending",
        }));
    };

    const sortedOrders = [...orders].sort((a, b) => {
        if (!sortConfig.key) return 0;
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "ascending" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
    });

    const handleEditClick = (rowData) => {
        setSelectedRow(rowData);
    };


    const handlePageChange = (newPage) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setOrdersPage(newPage);
            setIsTransitioning(false);
        }, 300);
    };

    return (
        <>
            <Card>
                <CardHeader variant="gradient" color="blue-gray" className="p-6 bg-gradient-to-br from-blue-gray-900 to-blue-gray-700">
                    <Typography variant="h6" color="white">Orders Table</Typography>
                </CardHeader>
                <CardBody>
                    <div ref={tableRef} className="overflow-y-auto" style={{ maxHeight: "400px" }}>
                        <table className="w-full min-w-[640px] table-auto">
                            <thead className="sticky top-0 bg-gray-100 z-10">
                                <tr>
                                    {["ID", "Name", "Address", "Price", "Status"].map((el) => (
                                        <th key={el} className="border-b py-3 px-5 text-left cursor-pointer" onClick={() => handleSort(el.toLowerCase())}>
                                            <button className="flex items-center gap-1">
                                                <Typography className="text-[12px] font-bold uppercase p-2 text-blue-gray-400">{el}</Typography>
                                                {sortConfig.key === el.toLowerCase() && (
                                                    sortConfig.direction === "ascending" ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                                                )}
                                            </button>
                                        </th>
                                    ))}
                                    <th className="border-b py-3 px-5 text-left cursor-pointer">
                                        <Typography className="text-[11px] font-bold uppercase text-blue-gray-400">Actions</Typography>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={`transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
                                {sortedOrders.map((row) => (
                                    <tr key={row.id}>
                                        <td className="py-3 px-5 border-b">{row.id}</td>
                                        <td className="py-3 px-5 border-b">{row.name}</td>
                                        <td className="py-3 px-5 border-b">{row.address}</td>
                                        <td className="py-3 px-5 border-b">{row.price}</td>
                                        <td className="py-3 px-5 border-b">{row.status}</td>
                                        <td className="py-3 px-5 border-b">
                                            <button className="px-3 py-1 text-sm font-medium border rounded-lg hover:bg-gray-200" onClick={() => handleEditClick(row)}>
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between items-center mt-4 px-4">
                        <div>
                            <label className="mr-2 text-sm font-medium text-blue-gray-600">Rows per page:</label>
                            <Select value={rowsPerPage.toString()} className="w-full" onChange={(value) => setRowsPerPage(parseInt(value))}>
                                <Option value="10">10</Option>
                                <Option value="25">25</Option>
                            </Select>
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className="text-sm font-medium text-blue-gray-600">
                                <span className="ml-4">
                                    {`${(ordersPage - 1) * rowsPerPage + 1}-${Math.min(ordersPage * rowsPerPage, totalRecords)}`}
                                </span> of {totalRecords}
                            </div>
                            <nav aria-label="Table pagination">
                                <ul className="inline-flex items-center space-x-2">
                                    <li>
                                        <button
                                            onClick={() => handlePageChange(Math.max(ordersPage - 1, 1))}
                                            disabled={ordersPage === 1}
                                            className="px-3 py-1 text-sm font-medium border rounded-lg disabled:opacity-50"
                                        >
                                            Prev
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => handlePageChange(Math.min(ordersPage + 1, totalPages))}
                                            disabled={ordersPage === totalPages}
                                            className="px-3 py-1 text-sm font-medium border rounded-lg disabled:opacity-50"
                                        >
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {selectedRow && (
                <OverlayCard rowID={selectedRow.id} onClose={() => setSelectedRow(null)} />
            )}
        </>
    );
};

export default OrdersTable;