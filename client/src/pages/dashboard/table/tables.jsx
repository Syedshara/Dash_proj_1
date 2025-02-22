import React from "react";
import { OrdersTable, CustomerTable } from "@/pages/dashboard/table/table-widget";


export function Tables() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <OrdersTable />
      <CustomerTable />
    </div>
  );
}

export default Tables;
