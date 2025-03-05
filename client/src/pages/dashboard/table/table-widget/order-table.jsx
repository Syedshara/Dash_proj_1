import React, { useState } from "react";
import { Card, CardHeader, CardBody, Typography, Select, Option } from "@material-tailwind/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { ordersTableData } from "@/data";
import { OverlayCard } from "@/widgets/table/table-card";
import { useMaterialTailwindController } from "@/context";

export const OrdersTable = () => {
    const [controller] = useMaterialTailwindController();
    const { sidenavColor } = controller;
    const [ordersPage, setOrdersPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: "id", direction: "ascending" });
    const [selectedRow, setSelectedRow] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [statusFilter, setStatusFilter] = useState("All");

    const { data } = ordersTableData(ordersPage, rowsPerPage);
    const { orders = [], totalPages = 1, totalRecords = 0 } = data || {};

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "ascending" ? "descending" : "ascending",
        }));
    };

    const sortedOrders = [...orders].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];

        if (typeof valueA === "number" && typeof valueB === "number") {
            return sortConfig.direction === "ascending" ? valueA - valueB : valueB - valueA;
        }
        return sortConfig.direction === "ascending"
            ? String(valueA).localeCompare(String(valueB))
            : String(valueB).localeCompare(String(valueA));
    });

    const filteredOrders = statusFilter === "All" ? sortedOrders : sortedOrders.filter(order => order.status === statusFilter);

    const handlePageChange = (newPage) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setOrdersPage(newPage);
            setIsTransitioning(false);
        }, 300);
    };

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
                <CardHeader
                    variant="gradient"
                    color="blue-gray"
                    className={`p-6 bg-gradient-to-br ${sidenavColors[sidenavColor]}`}
                >
                    <Typography variant="h6" color={`${sidenavColor === "white" ? "black" : "white"}`}>
                        Orders Table
                    </Typography>

                </CardHeader>
                <div className="relative max-w-full  pl-7 md:pl-11 bg-transparent">
                    <div className="md:absolute mt-10 md:mt-0 md:-top-14 md:right-20 w-16 md:w-40 bg-transparent">
                        <Select
                            value={statusFilter}
                            onChange={(value) => setStatusFilter(value)}
                            color="blue-gray"
                            className="text-blue-gray-600 md:text-white"

                        >
                            <Option value="All">All</Option>
                            <Option value="PAID">Paid</Option>
                            <Option value="PENDING">Pending</Option>
                        </Select>
                    </div>
                </div>




                <CardBody>
                    <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
                        <table className="w-full min-w-[640px] table-auto">
                            <thead className="sticky top-0 bg-gray-100 z-10">
                                <tr>
                                    {["ID", "Batch Id", "Name", "Address", "Price", "Status"].map((el) => (
                                        <th key={el} className="border-b py-3 px-5 text-left cursor-pointer " onClick={() => handleSort(el.toLowerCase())}>
                                            <button
                                                className="flex items-center gap-1"
                                                disabled={el === "Batch Id"}
                                            >
                                                <Typography className={`text-[12px] font-bold uppercase p-2 text-blue-gray-400 whitespace-nowrap ${el === "Batch Id" ? "cursor-not-allowed" : ""}`}>
                                                    {el}
                                                </Typography>
                                                {el !== "Batch Id" && sortConfig.key === el.toLowerCase() && (
                                                    sortConfig.direction === "ascending" ?
                                                        <ChevronUpIcon className="w-4 h-4" /> :
                                                        <ChevronDownIcon className="w-4 h-4" />
                                                )}
                                            </button>
                                        </th>
                                    ))}
                                    <th className="border-b py-3 px-5 text-left">
                                        <Typography className="text-[11px] font-bold uppercase text-blue-gray-400">Actions</Typography>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={`transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
                                {filteredOrders.map((row) => (
                                    <tr key={row.id}>
                                        {["id", "batchId", "name", "address", "price", "status"].map((field) => (
                                            <td key={field} className="py-3 text-sm md:text-md px-5 border-b">{row[field]}</td>
                                        ))}
                                        <td className="py-3 px-5 border-b">
                                            <button className="px-3 py-1 text-sm font-medium border rounded-lg hover:bg-gray-200" onClick={() => setSelectedRow(row)}>
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-col gap-y-5 lg:flex-row justify-center lg:justify-between items-center mt-4 px-4">
                        <div>
                            <label className="mr-2 text-sm font-medium text-blue-gray-600">Rows per page:</label>
                            <Select value={rowsPerPage.toString()} className="w-full" onChange={(value) => setRowsPerPage(parseInt(value))}>
                                {[10, 25].map((num) => (
                                    <Option key={num} value={num.toString()}>{num}</Option>
                                ))}
                            </Select>
                        </div>
                        <div className="flex  gap-3 items-center justify-center">
                            <div className="text-sm font-medium text-blue-gray-600">
                                {`${(ordersPage - 1) * rowsPerPage + 1}-${Math.min(ordersPage * rowsPerPage, totalRecords)}`} of {totalRecords}
                            </div>
                            <nav aria-label="Table pagination">
                                <ul className="inline-flex items-center space-x-2">
                                    {["Prev", "Next"].map((btn, idx) => (
                                        <li key={btn}>
                                            <button
                                                onClick={() => handlePageChange(idx === 0 ? Math.max(ordersPage - 1, 1) : Math.min(ordersPage + 1, totalPages))}
                                                disabled={idx === 0 ? ordersPage === 1 : ordersPage === totalPages}
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
                </CardBody>
            </Card >

            {selectedRow && <OverlayCard rowID={selectedRow.id} onClose={() => setSelectedRow(null)} />}
        </>
    );
};

export default OrdersTable;
