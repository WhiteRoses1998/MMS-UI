// WorkOrderTable.tsx
import { useState } from "react";
import { Wrench, User } from "lucide-react";

import { WorkOrder } from "@/features/workorder/types"; // ปรับ path ตามโครงสร้างโปรเจคจริงของคุณ

interface Props {
  onSelect: (order: WorkOrder) => void;
}

// Mock data (ใส่ข้อมูลตัวอย่าง 2-3 รายการ เพื่อไม่ให้โค้ดยาวเกินไป คุณสามารถเพิ่มทั้งหมดจาก joblist_box.tsx ได้)
const mockWorkOrders: WorkOrder[] = [
  {
    id: "1",
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
    siteId: "DMT",
  },
  {
    id: "2",
    breakdown: true,
    usageAlert: true,
    workOrder: "080018",
    faultDesc:
      "วันที่ 30-7-68 สายพลาสติก ชายเคอร์เบลูง ข้อ 6.21 กับ 6.18 ยอดเงียงเลอนไม่ตรงกัน",
    errorDesc: "",
    equipment: "999999921",
    symptom: "STW31",
    customerCode: "01693 - ณัฐวสี จันทร์เจ้ม",
    workMaster: "",
    workType: "CM",
    department: "PTET00",
    planStartDate: "06-08-2025",
    planFinishDate: "06-08-2025",
    status: "Work Done",
    woGenDate: "06-08-2025 16:28:00",
    priority: "งานรองคำสลำเนื้องามาขใน 1 วน",
    planRespondMins: "999999",
    respondMins: null,
    siteId: "DMT",
  },
  // เพิ่มรายการอื่น ๆ ตามต้องการ
];

export default function WorkOrderTable({ onSelect }: Props) {
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const displayedOrders = mockWorkOrders.slice(0, entriesPerPage);

  const getStatusBadge = (status: string) => {
    const lower = status.toLowerCase();
    if (lower.includes("done") || lower === "completed") {
      return "bg-teal-600 text-white";
    }
    if (lower.includes("progress") || lower === "departure") {
      return "bg-blue-500 text-white";
    }
    if (lower.includes("waiting") || lower.includes("pending")) {
      return "bg-orange-400 text-white";
    }
    return "bg-gray-500 text-white";
  };

  const getRespondMinsStyle = (mins: string | null) => {
    if (mins === null || mins === "null") {
      return "bg-orange-400 text-white";
    }
    return "bg-yellow-500 text-gray-800";
  };

  return (
    <div className="p-5 bg-gray-50 min-h-screen space-y-6">
      {/* Search Box - ปรับให้เหมือนระบบเดิมมากขึ้น */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5">
          {/* แถวแรก: ช่อง input และ dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work Order
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Work Order"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Equipment
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                <option>Select</option>
                {/* เพิ่ม option จริงตามข้อมูล */}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Breakdown
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                <option>Select All</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usage Alert
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                <option>Select All</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>

          {/* แถวสอง: Site ID (tag-style input) */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Site ID
            </label>
            <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md bg-white min-h-[42px]">
              {/* Tag ตัวอย่าง (ในชีวิตจริงใช้ state จัดการ tag) */}
              <div className="flex items-center gap-1 bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
                DMT-คลังย่อยอมปารุจ
                <button className="text-teal-600 hover:text-teal-800">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {/* ช่อง input สำหรับเพิ่ม tag ใหม่ */}
              <input
                type="text"
                className="flex-1 min-w-[200px] outline-none text-sm"
                placeholder="พิมพ์ Site ID แล้วกด Enter..."
              />
            </div>
          </div>

          {/* ปุ่ม Clear + Search + Advanced */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex gap-3">
              <button className="px-6 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition">
                Clear
              </button>
              <button className="px-6 py-2 bg-teal-600 text-white rounded-md text-sm hover:bg-teal-700 transition shadow-sm">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* กล่อง List / ตาราง */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">
            รายการ Work Order
          </h2>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm min-w-[1800px]">
            <thead className="bg-cyan-50 border-b sticky top-0 z-10">
              <tr>
                <th className="px-3 py-3 text-left font-medium text-gray-700 w-10">
                  #
                </th>
                <th className="px-3 py-3 text-center font-medium text-gray-700 w-16">
                  Breakdown
                </th>
                <th className="px-3 py-3 text-center font-medium text-gray-700 w-16">
                  Usage Alert
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 min-w-[100px]">
                  Work Order
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 min-w-[220px]">
                  Fault Description
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 min-w-[180px]">
                  Error Description
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 min-w-[110px]">
                  Equipment
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 min-w-[90px]">
                  Symptom
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 min-w-[180px]">
                  Customer Code
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 min-w-[110px]">
                  Work Master
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 min-w-[90px]">
                  Work Type
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 min-w-[100px]">
                  Department
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 min-w-[110px]">
                  Plan Start
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 min-w-[110px]">
                  Plan Finish
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 min-w-[100px]">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 min-w-[140px]">
                  WO Gen Date
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 min-w-[220px]">
                  Priority
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 min-w-[130px]">
                  Plan Respond Mins
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 min-w-[110px]">
                  Respond Mins
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 min-w-[80px]">
                  Site ID
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedOrders.map((row, index) => (
                <tr
                  key={row.workOrder}
                  onClick={() => onSelect(row)}
                  className={`border-b hover:bg-gray-50 transition-colors cursor-pointer ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-3 py-3 text-gray-700">{index + 1}</td>
                  <td className="px-3 py-3 text-center">
                    {row.breakdown && (
                      <Wrench
                        className="inline-block text-orange-500"
                        size={20}
                      />
                    )}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {row.usageAlert && (
                      <User
                        className="inline-block text-orange-400"
                        size={20}
                      />
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-700 font-medium">
                    {row.workOrder}
                  </td>
                  <td className="px-4 py-3 text-gray-700 max-w-[220px] truncate">
                    {row.faultDesc}
                  </td>
                  <td className="px-4 py-3 text-gray-700 max-w-[180px] truncate">
                    {row.errorDesc}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{row.equipment}</td>
                  <td className="px-4 py-3 text-gray-700">{row.symptom}</td>
                  <td className="px-4 py-3 text-gray-700 max-w-[180px] truncate">
                    {row.customerCode}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{row.workMaster}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-1 bg-red-500 text-white rounded text-xs font-bold">
                      {row.workType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{row.department}</td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                    {row.planStartDate}
                  </td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                    {row.planFinishDate}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium text-white whitespace-nowrap ${getStatusBadge(
                        row.status,
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                    {row.woGenDate}
                  </td>
                  <td className="px-4 py-3 text-gray-700 max-w-[220px] truncate">
                    {row.priority}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-1 bg-yellow-400 text-gray-800 rounded text-xs font-bold">
                      {row.planRespondMins}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-bold ${getRespondMinsStyle(row.respondMins)}`}
                    >
                      {row.respondMins ?? "null"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{row.siteId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-700 bg-gray-50">
          <div>
            แสดง 1 ถึง {Math.min(entriesPerPage, mockWorkOrders.length)} จาก{" "}
            {mockWorkOrders.length} รายการ
          </div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-teal-600">
              ก่อนหน้า
            </button>
            <button className="px-3 py-1 bg-teal-600 text-white rounded-md">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
              ...
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-teal-600">
              ถัดไป
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
