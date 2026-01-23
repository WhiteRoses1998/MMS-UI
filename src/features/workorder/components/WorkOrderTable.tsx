// WorkOrderTable.tsx
import { useState } from "react";
import { Wrench, User } from "lucide-react";

import { WorkOrder } from '@/features/workorder/types';  // สมมติว่าคุณมี type นี้อยู่แล้ว

interface Props {
  onSelect: (order: WorkOrder) => void;
}

// Mock data แบบเต็ม (จาก joblist_box.tsx ของคุณ)
const mockWorkOrders: WorkOrder[] = [
  {
    id: '1',
    breakdown: false,
    usageAlert: false,
    workOrder: "080017",
    faultDesc: "เครื่อง TOD ไปรแกรม MTS ไม่สมบูรณ์",
    errorDesc: "RP อาคารสาม-เครื่อง TOD ไป",
    equipment: "999999921",
    symptom: "STW31",
    customerCode: "01749 - ณรงค์ชัย มณฑุ",
    workMaster: "",
    workType: "CM",
    department: "PTET00",
    planStartDate: "06-08-2025",
    planFinishDate: "06-08-2025",
    status: "Work Done",
    woGenDate: "06-08-2025 16:26:00",
    priority: "งานรองคำสลำเนื้องามาขใน 1 วน",
    planRespondMins: "999999",
    respondMins: null,
    siteId: "DMT"
  },
  // ... ใส่ข้อมูลตัวอื่น ๆ ต่อได้เลย (ผมใส่แค่ตัวแรกเป็นตัวอย่าง เพื่อไม่ให้ยาวเกิน)
  // คุณสามารถ copy mockData ทั้งหมดจาก joblist_box.tsx มาใส่ตรงนี้
];

export default function WorkOrderTable({ onSelect }: Props) {
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const displayedOrders = mockWorkOrders.slice(0, entriesPerPage); // ในชีวิตจริงใช้ pagination จริง + API

  const getStatusBadge = (status: string) => {
    const lower = status.toLowerCase();
    if (lower.includes('done') || lower === 'completed') {
      return 'bg-teal-600 text-white';
    }
    if (lower.includes('progress') || lower === 'departure') {
      return 'bg-blue-500 text-white';
    }
    if (lower.includes('waiting') || lower.includes('pending')) {
      return 'bg-orange-400 text-white';
    }
    return 'bg-gray-500 text-white';
  };

  const getRespondMinsStyle = (mins: string | null) => {
    if (mins === null || mins === 'null') {
      return 'bg-orange-400 text-white';
    }
    return 'bg-yellow-500 text-gray-800';
  };

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">

        {/* Controls */}
        <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-sm text-gray-700">Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-700">entries</span>
          </div>

          {/* Search (ยัง mock เหมือนเดิม แต่ layout ดีขึ้น) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
            <input className="border p-2 rounded text-sm w-full" placeholder="Work Order" />
            <input className="border p-2 rounded text-sm w-full" placeholder="Equipment" />
            <select className="border p-2 rounded text-sm w-full">
              <option>Breakdown: All</option>
            </select>
            <select className="border p-2 rounded text-sm w-full">
              <option>Usage Alert: All</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              Clear
            </button>
            <button className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm hover:bg-teal-700">
              Search
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-max">
            <thead className="bg-cyan-50 border-b sticky top-0">
              <tr>
                <th className="px-3 py-3 text-left font-medium text-gray-700 w-10">#</th>
                <th className="px-3 py-3 text-center font-medium text-gray-700 w-16">Breakdown</th>
                <th className="px-3 py-3 text-center font-medium text-gray-700 w-16">Usage Alert</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Work Order</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Fault Description</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Error Description</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Equipment</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Symptom</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Customer Code</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Work Master</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Work Type</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Department</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Plan Start</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Plan Finish</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">WO Gen Date</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Priority</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Plan Respond Mins</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Respond Mins</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Site ID</th>
              </tr>
            </thead>
            <tbody>
              {displayedOrders.map((row, index) => (
                <tr
                  key={row.workOrder}
                  onClick={() => onSelect(row)}
                  className={`border-b hover:bg-gray-50 transition-colors cursor-pointer ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="px-3 py-3 text-gray-700">{index + 1}</td>
                  <td className="px-3 py-3 text-center">
                    {row.breakdown && <Wrench className="inline-block text-orange-500" size={20} />}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {row.usageAlert && <User className="inline-block text-orange-400" size={20} />}
                  </td>
                  <td className="px-4 py-3 text-gray-700 font-medium">{row.workOrder}</td>
                  <td className="px-4 py-3 text-gray-700 max-w-xs truncate">{row.faultDesc}</td>
                  <td className="px-4 py-3 text-gray-700 max-w-xs truncate">{row.errorDesc}</td>
                  <td className="px-4 py-3 text-gray-700">{row.equipment}</td>
                  <td className="px-4 py-3 text-gray-700">{row.symptom}</td>
                  <td className="px-4 py-3 text-gray-700 max-w-xs truncate">{row.customerCode}</td>
                  <td className="px-4 py-3 text-gray-700">{row.workMaster}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-1 bg-red-500 text-white rounded text-xs font-bold">
                      {row.workType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{row.department}</td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{row.planStartDate}</td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{row.planFinishDate}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium text-white whitespace-nowrap ${getStatusBadge(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{row.woGenDate}</td>
                  <td className="px-4 py-3 text-gray-700 max-w-xs truncate">{row.priority}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-1 bg-yellow-400 text-gray-800 rounded text-xs font-bold">
                      {row.planRespondMins}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${getRespondMinsStyle(row.respondMins)}`}>
                      {row.respondMins ?? 'null'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{row.siteId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 flex flex-col sm:flex-row items-center justify-between border-t gap-4 text-sm text-gray-700">
          <div>
            Showing 1 to {Math.min(entriesPerPage, mockWorkOrders.length)} of {mockWorkOrders.length} entries
          </div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-teal-600">
              Previous
            </button>
            <button className="px-3 py-1 bg-teal-600 text-white rounded-md">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">...</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-teal-600">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}