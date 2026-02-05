import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
} from "@/components/ui";
import { cn } from "@/lib/cn";
import { WorkOrder } from "@/features/WorkOrder/types";
import { SearchFilters } from "@/components/common/SearchBox";

interface WorkOrderTableProps {
  data: WorkOrder[];
  mode: "active" | "history";
  onSelect?: (order: WorkOrder) => void;
  filters?: SearchFilters;
}

/* ===== Column Config ===== */
type Column = {
  key: keyof WorkOrder;
  label: string;
};

const ACTIVE_COLUMNS: Column[] = [
  { key: "workOrder", label: "Work Order" },
  { key: "faultDesc", label: "Fault Description" },
  { key: "errorDesc", label: "Error Description" },
  { key: "equipment", label: "Equipment" },
  { key: "symptom", label: "Symptom" },
  { key: "customerCode", label: "Customer Code" },
  { key: "workMaster", label: "Work Master" },
  { key: "workType", label: "Work Type" },
  { key: "department", label: "Department" },
  { key: "planStartDate", label: "Plan Start" },
  { key: "planFinishDate", label: "Plan Finish" },
  { key: "status", label: "Status" },
  { key: "woGenDate", label: "WO Gen Date" },
  { key: "priority", label: "Priority" },
  { key: "siteId", label: "Site ID" },
];

const HISTORY_COLUMNS: Column[] = [
  { key: "workOrder", label: "Work Order" },
  { key: "workOrderGroup", label: "Work Order Group" },
  { key: "faultDescription", label: "Fault Description" },
  { key: "equipment", label: "Equipment" },
  { key: "workMaster", label: "Work Master" },
  { key: "workType", label: "Work Type" },
  { key: "department", label: "Department" },
  { key: "status", label: "WO Gen Status" },
  { key: "woGenDate", label: "Date" },
  { key: "siteId", label: "Site ID" },
];

/* ===== Status Badge ===== */
const getStatusBadge = (status: string, mode: "active" | "history") => {
  const s = status.toLowerCase();
  if (mode === "history") {
    return s === "close job"
      ? "bg-red-100 text-red-800"
      : "bg-gray-100 text-gray-800";
  }
  if (s.includes("done") || s === "completed" || s === "close job")
    return "bg-teal-600 text-white";
  if (s.includes("progress") || s === "departure")
    return "bg-blue-500 text-white";
  if (s.includes("waiting") || s === "open" || s === "scheduled")
    return "bg-orange-400 text-white";
  return "bg-gray-500 text-white";
};

/* ===== Component ===== */
export default function UnifiedWorkOrderTable({
  data,
  mode,
  onSelect,
  filters = { workOrder: "", equipment: "", siteId: "" },
}: WorkOrderTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const columns = mode === "active" ? ACTIVE_COLUMNS : HISTORY_COLUMNS;

  const filteredData = data.filter((item) => {
    if (
      filters.workOrder &&
      !item.workOrder?.toLowerCase().includes(filters.workOrder.toLowerCase())
    )
      return false;

    if (
      filters.equipment &&
      item.equipment?.toLowerCase() !== filters.equipment.toLowerCase()
    )
      return false;

    if (
      filters.siteId &&
      !item.siteId?.toLowerCase().includes(filters.siteId.toLowerCase())
    )
      return false;

    return true;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const start = (currentPage - 1) * entriesPerPage;
  const currentData = filteredData.slice(start, start + entriesPerPage);

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4">
      <div className="overflow-x-auto border border-gray-300 rounded-md">
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="bg-[#d1ecf1] border px-3 py-3 font-bold">#</TableHead>
              {columns.map((c) => (
                <TableHead
                  key={c.key as string}
                  className="bg-[#d1ecf1] border px-3 py-3 font-bold"
                >
                  {c.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentData.map((row, i) => (
              <TableRow
                key={row.id}
                onClick={() => onSelect?.(row)}
                className="cursor-pointer hover:bg-gray-200"
              >
                <TableCell className="border px-2 py-2">
                  {start + i + 1}
                </TableCell>

                {columns.map((c) => {
                  const value = row[c.key];
                  if (c.key === "status") {
                    return (
                      <TableCell key={c.key as string} className="border px-2 py-2">
                        <span
                          className={cn(
                            "px-3 py-1 text-xs rounded-full",
                            getStatusBadge(String(value ?? ""), mode)
                          )}
                        >
                          {value ?? "-"}
                        </span>
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell
                      key={c.key as string}
                      className="border px-2 py-2 truncate"
                      title={String(value ?? "-")}
                    >
                      {String(value ?? "-")}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}

            {currentData.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center py-8 text-gray-500 border"
                >
                  ไม่พบข้อมูล
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <div>
          Showing {totalEntries ? start + 1 : 0} to{" "}
          {Math.min(start + entriesPerPage, totalEntries)} of {totalEntries}
        </div>

        <div className="flex gap-2 items-center">
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <Button
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </Button>

          <Button
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}