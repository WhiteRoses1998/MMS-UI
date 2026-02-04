// src/pages/WorkOrderGroupPage.tsx
import { useState, useEffect } from "react";
import { Search, Plus, FileDown, Printer, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

interface WorkOrderGroup {
  id: string;
  usageAlert: string;
  workOrderGroup: string;
  errorDescription: string;
  faultDescription: string;
  workMaster: string;
  workType: string;
  department: string;
  status: string;
  statusColor: "green" | "red";
}

export default function WorkOrderGroupPage() {
  const [data, setData] = useState<WorkOrderGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // ฟังก์ชันดึงข้อมูล
  const fetchData = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      // TODO: เปลี่ยนเป็น API endpoint จริง
      // const response = await fetch(`/api/work-order-groups?page=${page}&limit=${pageSize}`);
      // const result = await response.json();

      // ข้อมูลตัวอย่าง
      const mockData: WorkOrderGroup[] = [
        {
          id: "1",
          usageAlert: "",
          workOrderGroup: "G001326",
          errorDescription: "",
          faultDescription: "PM3 - Check Status DC, DR, Plaza Weekly - 1",
          workMaster: "01693 - กฤษณชัย จันทร์ทิแสน",
          workType: "PM",
          department: "PTET00",
          status: "Assign Job",
          statusColor: "green",
        },
        {
          id: "2",
          usageAlert: "",
          workOrderGroup: "G001327",
          errorDescription: "",
          faultDescription: "PM2 - Remote Check Status and Clean DC, DR, Plaza and Lane Switch",
          workMaster: "01693 - กฤษณชัย จันทร์ทิแสน",
          workType: "PM",
          department: "PTET00",
          status: "Assign Job",
          statusColor: "green",
        },
        {
          id: "3",
          usageAlert: "",
          workOrderGroup: "G001328",
          errorDescription: "",
          faultDescription: "PM3 - Check Status DC, DR, Plaza Weekly - 2",
          workMaster: "01749 - ณรงศักดิ์ นุชนา",
          workType: "PM",
          department: "PTET00",
          status: "Close Job",
          statusColor: "red",
        },
        {
          id: "4",
          usageAlert: "",
          workOrderGroup: "G001333",
          errorDescription: "",
          faultDescription: "PM3 - Check Status DC, DR, Plaza Weekly - 3",
          workMaster: "01749 - ณรงศักดิ์ นุชนา",
          workType: "PM",
          department: "PTET00",
          status: "Assign Job",
          statusColor: "green",
        },
        {
          id: "5",
          usageAlert: "",
          workOrderGroup: "G001334",
          errorDescription: "",
          faultDescription: "PM3 - Check Status DC, DR, Plaza Weekly - 4",
          workMaster: "01693 - กฤษณชัย จันทร์ทิแสน",
          workType: "PM",
          department: "PTET00",
          status: "Assign Job",
          statusColor: "green",
        },
        {
          id: "6",
          usageAlert: "",
          workOrderGroup: "G001335",
          errorDescription: "",
          faultDescription: "PM1 - Remote Check Status DC, DR, Plaza and Lane Switch -",
          workMaster: "01749 - ณรงศักดิ์ นุชนา",
          workType: "PM",
          department: "PTET00",
          status: "Close Job",
          statusColor: "red",
        },
        {
          id: "7",
          usageAlert: "",
          workOrderGroup: "G001353",
          errorDescription: "",
          faultDescription: "PM3 - Check Status DC, DR, Plaza Weekly - 1",
          workMaster: "01749 - ณรงศักดิ์ นุชนา",
          workType: "PM",
          department: "PTET00",
          status: "Assign Job",
          statusColor: "green",
        },
        {
          id: "8",
          usageAlert: "",
          workOrderGroup: "G001354",
          errorDescription: "",
          faultDescription: "PM3 - Check Status DC, DR, Plaza Weekly - 2",
          workMaster: "01693 - กฤษณชัย จันทร์ทิแสน",
          workType: "PM",
          department: "PTET00",
          status: "Assign Job",
          statusColor: "green",
        },
      ];

      setData(mockData);
      setPagination({
        current: page,
        pageSize: pageSize,
        total: 8,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, []);

  const handlePageChange = (newPage: number) => {
    fetchData(newPage, pagination.pageSize);
  };

  const handlePageSizeChange = (newPageSize: string) => {
    const size = parseInt(newPageSize);
    setPagination({ ...pagination, pageSize: size });
    fetchData(1, size);
  };

  const totalPages = Math.ceil(pagination.total / pagination.pageSize);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Work Order Group</h2>

      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
        <Button variant="outline" size="sm">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
        <Button variant="outline" size="sm">
          <FileDown className="h-4 w-4 mr-2" />
          Export Excel
        </Button>
        <Button variant="outline" size="sm">
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
      </div>

      {/* Show entries selector */}
      <div className="flex items-center gap-2 text-sm">
        <span>Show</span>
        <Select value={pagination.pageSize.toString()} onValueChange={handlePageSizeChange}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
        <span>entries</span>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Usage Alert</TableHead>
              <TableHead className="w-36">Work Order Group ▲</TableHead>
              <TableHead className="w-36">Error Description</TableHead>
              <TableHead className="w-80">Fault Description</TableHead>
              <TableHead className="w-48">Work Master</TableHead>
              <TableHead className="w-24">Work Type *</TableHead>
              <TableHead className="w-28">Department</TableHead>
              <TableHead className="w-32">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow key={row.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>{row.usageAlert}</TableCell>
                  <TableCell className="font-medium">{row.workOrderGroup}</TableCell>
                  <TableCell>{row.errorDescription}</TableCell>
                  <TableCell className="max-w-80 truncate" title={row.faultDescription}>
                    {row.faultDescription}
                  </TableCell>
                  <TableCell>{row.workMaster}</TableCell>
                  <TableCell>{row.workType}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      className={`w-full ${
                        row.statusColor === "green"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {row.status}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm">
        <div>
          Showing {(pagination.current - 1) * pagination.pageSize + 1} to{" "}
          {Math.min(pagination.current * pagination.pageSize, pagination.total)} of{" "}
          {pagination.total} entries
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.current - 1)}
            disabled={pagination.current === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === pagination.current ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="w-8"
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.current + 1)}
            disabled={pagination.current === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}