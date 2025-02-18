import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { ordersTableData, projectsTableData } from "@/data";
import { OverlayCard } from "@/widgets/table/table-card"

export function Tables() {
  const [ordersPage, setOrdersPage] = useState(1);
  const [projectsPage, setProjectsPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6); // Default is 6
  const [rowsPerPage2, setRowsPerPage2] = useState(6); // Default is 6

  const renderPagination = (currentPage, totalPages, tableType) => {
    const pages = [];
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (startPage > 1) pages.push(1);
    if (startPage > 2) pages.push("...");
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (endPage < totalPages - 1) pages.push("...");
    if (endPage < totalPages) pages.push(totalPages);

    return (
      <ul className="inline-flex items-center space-x-2">
        <li>
          <button
            onClick={() => paginate(currentPage - 1, tableType)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm font-medium border rounded-lg disabled:opacity-50"
          >
            Prev
          </button>
        </li>
        {pages.map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="px-3 py-1 text-sm font-medium">{page}</span>
            ) : (
              <button
                onClick={() => paginate(page, tableType)}
                className={`px-3 py-1 text-sm font-medium border rounded-lg ${currentPage === page ? "bg-gray-200 font-bold" : ""}`}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        <li>
          <button
            onClick={() => paginate(currentPage + 1, tableType)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm font-medium border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </li>
      </ul>
    );
  };

  const handleRowsChange = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value) || value <= 0) {
      value = 6;
    }
    setRowsPerPage(value);
  };
  const handleRowsChange2 = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value) || value <= 0) {
      value = 6;
    }
    setRowsPerPage2(value);
  };

  const paginate = (pageNumber, tableType) => {
    if (tableType === "orders") {
      setOrdersPage(pageNumber);
    } else {
      setProjectsPage(pageNumber);
    }
  };

  const paginatedOrders = ordersTableData.slice(
    (ordersPage - 1) * rowsPerPage,
    ordersPage * rowsPerPage
  );

  const paginatedProjects = projectsTableData.slice(
    (projectsPage - 1) * rowsPerPage,
    projectsPage * rowsPerPage
  );

  const [selectedRow, setSelectedRow] = useState(null);
  const [orders, setOrders] = useState([...ordersTableData]); // Maintain table state

  const handleEditClick = (row) => {
    setSelectedRow(row);
  };

  const handleSave = (updatedRow) => {
    setOrders((prevOrders) =>
      prevOrders.map((row) => (row.id === updatedRow.id ? updatedRow : row))
    );
    setSelectedRow(null);
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {/* Orders Table */}
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Orders Table
          </Typography>
        </CardHeader>
        <CardBody className={rowsPerPage > 6 ? "overflow-y-scroll max-h-[400px]" : "overflow-x-scroll"}>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Id", "Name", "Address", "Price", "Status", ""].map((el) => (
                  <th key={el} className="border-b py-3 px-5 text-left">
                    <Typography className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((row) => {
                const { id, name, address, price, status } = row;
                return (
                  <tr key={id}>
                    <td className="py-3 px-5 border-b">{id}</td>
                    <td className="py-3 px-5 border-b">{name}</td>
                    <td className="py-3 px-5 border-b">{address}</td>
                    <td className="py-3 px-5 border-b">{price}</td>
                    <td className="py-3 px-5 border-b">{status}</td>
                    <td className="py-3 px-5 border-b">
                      <button
                        className="px-3 py-1 text-sm font-medium border rounded-lg hover:bg-gray-200"
                        onClick={() => handleEditClick(row)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}

            </tbody>
          </table>
          {selectedRow && (
            <OverlayCard
              rowData={selectedRow}
              onClose={() => setSelectedRow(null)}
              onSave={handleSave}
            />
          )}

          <div className="flex justify-between items-center mt-4 px-4">
            <div>
              <label className="mr-2 text-sm font-medium text-blue-gray-600">
                Rows per page:
              </label>
              <input
                type="text"
                className="border border-gray-300 px-2 py-1 text-sm rounded-md w-12 text-center"
                onChange={handleRowsChange}
                placeholder="6"
              />
            </div>
            <nav aria-label="Table pagination">
              {renderPagination(ordersPage, Math.ceil(ordersTableData.length / rowsPerPage), "orders")}
            </nav>
          </div>
        </CardBody>
      </Card>

      {/* Projects Table */}
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Projects Table
          </Typography>
        </CardHeader>
        <CardBody className={rowsPerPage > 6 ? "overflow-y-scroll max-h-[400px]" : "overflow-x-scroll"}>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Companies", "Members", "Budget", "Completion", ""].map((el) => (
                  <th key={el} className="border-b py-3 px-5 text-left">
                    <Typography className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedProjects.map(({ img, name, members, budget, completion }, key) => (
                <tr key={name}>
                  <td className="py-3 px-5 border-b">
                    <div className="flex items-center gap-4">
                      <Avatar src={img} alt={name} size="sm" />
                      {name}
                    </div>
                  </td>
                  <td className="py-3 px-5 border-b">
                    {members.map(({ img, name }, key) => (
                      <Tooltip key={name} content={name}>
                        <Avatar src={img} alt={name} size="xs" variant="circular" className="cursor-pointer border-2 border-white -ml-2.5" />
                      </Tooltip>
                    ))}
                  </td>
                  <td className="py-3 px-5 border-b">{budget}</td>
                  <td className="py-3 px-5 border-b">
                    <Progress value={completion} variant="gradient" color={completion === 100 ? "green" : "gray"} className="h-1" />
                  </td>
                  <td className="py-3 px-5 border-b">...</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4 px-4">
            <div>
              <label className="mr-2 text-sm font-medium text-blue-gray-600">
                Rows per page:
              </label>
              <input
                type="text"
                className="border border-gray-300 px-2 py-1 text-sm rounded-md w-12 text-center"
                onChange={handleRowsChange2}
                placeholder="6"
              />
            </div>
            <nav aria-label="Table pagination">
              {renderPagination(projectsPage, Math.ceil(projectsTableData.length / rowsPerPage2), "projects")}
            </nav>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;
