// WorkOrderTable.tsx
import { Wrench, User } from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";

import { WorkOrder } from "@/features/workorder/types";

interface Props {
  onSelect: (order: WorkOrder) => void;
}

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
    faultDesc: "วันที่ 30-7-68 สายพลาสติก ชายเคอร์เบลูง ข้อ 6.21 กับ 6.18 ยอดเงียงเลอนไม่ตรงกัน",
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
  {
    id: "3",
    breakdown: false,
    usageAlert: true,
    workOrder: "080019",
    faultDesc: "ระบบไฟฟ้าขัดข้อง ไม่สามารถเปิดเครื่องได้",
    errorDesc: "ตรวจสอบแล้วพบว่า Circuit Breaker trip",
    equipment: "999999922",
    symptom: "STW32",
    customerCode: "01750 - สมชาย วงศ์ใหญ่",
    workMaster: "WM001",
    workType: "PM",
    department: "PTET01",
    planStartDate: "07-08-2025",
    planFinishDate: "07-08-2025",
    status: "In Progress",
    woGenDate: "06-08-2025 17:30:00",
    priority: "งานเร่งด่วนต้องแก้ไขภายใน 4 ชั่วโมง",
    planRespondMins: "240",
    respondMins: "180",
    siteId: "BKK",
  },
  {
    id: "4",
    breakdown: true,
    usageAlert: false,
    workOrder: "080020",
    faultDesc: "มอเตอร์มีเสียงดังผิดปกติ และมีอุณหภูมิสูง",
    errorDesc: "Bearing อาจชำรุด ต้องเปลี่ยน",
    equipment: "999999923",
    symptom: "STW33",
    customerCode: "01751 - วิชัย แสงสว่าง",
    workMaster: "WM002",
    workType: "CM",
    department: "PTET02",
    planStartDate: "07-08-2025",
    planFinishDate: "08-08-2025",
    status: "Waiting",
    woGenDate: "06-08-2025 18:45:00",
    priority: "งานปกติต้องดำเนินการภายใน 2 วัน",
    planRespondMins: "2880",
    respondMins: null,
    siteId: "CNX",
  },
  {
    id: "5",
    breakdown: false,
    usageAlert: false,
    workOrder: "080021",
    faultDesc: "ตรวจสอบประจำปี Preventive Maintenance",
    errorDesc: "",
    equipment: "999999924",
    symptom: "STW34",
    customerCode: "01752 - นภา สุขสันต์",
    workMaster: "WM003",
    workType: "PM",
    department: "PTET00",
    planStartDate: "08-08-2025",
    planFinishDate: "09-08-2025",
    status: "Scheduled",
    woGenDate: "06-08-2025 19:00:00",
    priority: "งานตามแผนประจำปี",
    planRespondMins: "5760",
    respondMins: null,
    siteId: "DMT",
  },
  {
    id: "6",
    breakdown: true,
    usageAlert: true,
    workOrder: "080022",
    faultDesc: "เครื่องหยุดทำงานกระทันหัน ไม่มีสัญญาณไฟเลย",
    errorDesc: "ตรวจพบว่า Main Power Supply ขัดข้อง",
    equipment: "999999925",
    symptom: "STW35",
    customerCode: "01753 - ประยุทธ สมบูรณ์",
    workMaster: "",
    workType: "CM",
    department: "PTET03",
    planStartDate: "06-08-2025",
    planFinishDate: "06-08-2025",
    status: "Departure",
    woGenDate: "06-08-2025 20:15:00",
    priority: "งานฉุกเฉินต้องแก้ไขทันที ภายใน 2 ชั่วโมง",
    planRespondMins: "120",
    respondMins: "90",
    siteId: "PKT",
  },
];

export default function WorkOrderTable({ onSelect }: Props) {
  const { isOpen: isSidebarOpen } = useSidebar();

  // แสดงข้อมูลทั้งหมด (ไม่ใช้ pagination state)
  const displayedOrders = mockWorkOrders;

  // คำนวณความกว้างของตารางตาม sidebar state ขนาดตารางของ WorkOrderList
  const tableContainerWidth = isSidebarOpen 
    ? 'calc(100vw - 230px - 3rem)' 
    : 'calc(100vw - 70px - 3rem)';

  const getStatusBadge = (status: string) => {
    const lower = status.toLowerCase();
    if (lower.includes("done") || lower === "completed") return "bg-teal-600 text-white";
    if (lower.includes("progress") || lower === "departure") return "bg-blue-500 text-white";
    if (lower.includes("waiting") || lower.includes("pending") || lower === "scheduled") 
      return "bg-orange-400 text-white";
    return "bg-gray-500 text-white";
  };

  const getRespondMinsStyle = (mins: string | null) => {
    if (mins === null || mins === "null") return "bg-orange-400 text-white";
    return "bg-yellow-500 text-gray-800";
  };

  return (
    <div className="p-5 bg-gray-50 min-h-screen space-y-6">
      {/* Search Box */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Work Order</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Work Order"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Equipment</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>Select</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Breakdown</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>Select All</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Usage Alert</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>Select All</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">Site ID</label>
            <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md bg-white min-h-[42px]">
              <div className="flex items-center gap-1 bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
                DMT-คลังย่อยอมปารุจ
                <button className="text-teal-600 hover:text-teal-800">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <input
                type="text"
                className="flex-1 min-w-[200px] outline-none text-sm"
                placeholder="พิมพ์ Site ID แล้วกด Enter..."
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex gap-3">
              <button className="px-6 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                Clear
              </button>
              <button className="px-6 py-2 bg-teal-600 text-white rounded-md text-sm hover:bg-teal-700">
                Search
              </button>
            </div>
            <a href="#" className="text-sm text-teal-600 hover:underline">Advanced search</a>
          </div>
        </div>
      </div>

      {/* List Box / ตาราง - ขยายตามพื้นที่ที่เหลือ */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-full overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">รายการ Work Order</h2>
            <p className="text-xs text-gray-500 mt-1">
              ⬅️➡️ เลื่อนซ้าย-ขวาเพื่อดูคอลัมน์ทั้งหมด | ⬆️⬇️ เลื่อนขึ้น-ลงเพื่อดูข้อมูลเพิ่มเติม
            </p>
          </div>
        </div>

        {/* Container สำหรับ Scroll - ขยายอัตโนมัติตาม sidebar */}
        <div 
          className="overflow-auto border transition-all duration-300"
          style={{ 
            maxHeight: '450px',
            maxWidth: tableContainerWidth,
          }}
        >
          {/* Table ต้องมี minWidth ที่กว้างกว่า container เพื่อให้เกิด scroll */}
          <table className="border-collapse text-sm table-fixed" style={{ minWidth: '2000px' }}>
            <thead>
              <tr className="bg-cyan-50 border-b sticky top-0 z-10">
                <th className="px-3 py-3 text-left font-semibold text-gray-700 bg-cyan-50 border-r" style={{ minWidth: '60px' }}>
                  #
                </th>
                <th className="px-3 py-3 text-center font-semibold text-gray-700 bg-cyan-50 border-r" style={{ minWidth: '100px' }}>
                  Breakdown
                </th>
                <th className="px-3 py-3 text-center font-semibold text-gray-700 bg-cyan-50 border-r" style={{ minWidth: '100px' }}>
                  Usage Alert
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 bg-cyan-50 border-r" style={{ minWidth: '120px' }}>
                  Work Order
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 bg-cyan-50 border-r" style={{ minWidth: '300px' }}>
                  Fault Description
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 bg-cyan-50 border-r" style={{ minWidth: '250px' }}>
                  Error Description
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 bg-cyan-50 border-r" style={{ minWidth: '120px' }}>
                  Equipment
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 bg-cyan-50 border-r" style={{ minWidth: '100px' }}>
                  Symptom
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 bg-cyan-50 border-r" style={{ minWidth: '200px' }}>
                  Customer Code
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 bg-cyan-50 border-r" style={{ minWidth: '130px' }}>
                  Work Master
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 bg-cyan-50 border-r" style={{ minWidth: '100px' }}>
                  Work Type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 bg-cyan-50 border-r" style={{ minWidth: '120px' }}>
                  Department
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 bg-cyan-50 border-r" style={{ minWidth: '130px' }}>
                  Plan Start
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 bg-cyan-50 border-r" style={{ minWidth: '130px' }}>
                  Plan Finish
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 bg-cyan-50 border-r" style={{ minWidth: '120px' }}>
                  Status
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 bg-cyan-50 border-r" style={{ minWidth: '170px' }}>
                  WO Gen Date
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 bg-cyan-50 border-r" style={{ minWidth: '280px' }}>
                  Priority
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 bg-cyan-50 border-r" style={{ minWidth: '150px' }}>
                  Plan Respond Mins
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 bg-cyan-50 border-r" style={{ minWidth: '130px' }}>
                  Respond Mins
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 bg-cyan-50" style={{ minWidth: '90px' }}>
                  Site ID
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedOrders.map((row, index) => (
                <tr
                  key={row.workOrder}
                  onClick={() => onSelect(row)}
                  className={`border-b hover:bg-teal-50 cursor-pointer transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-3 py-3 border-r">{index + 1}</td>
                  <td className="px-3 py-3 text-center border-r">
                    {row.breakdown && <Wrench className="text-orange-500 mx-auto" size={20} />}
                  </td>
                  <td className="px-3 py-3 text-center border-r">
                    {row.usageAlert && <User className="text-orange-400 mx-auto" size={20} />}
                  </td>
                  <td className="px-4 py-3 font-medium whitespace-nowrap border-r">{row.workOrder}</td>
                  <td className="px-4 py-3 border-r">
                    <div className="max-w-[300px] truncate" title={row.faultDesc}>
                      {row.faultDesc}
                    </div>
                  </td>
                  <td className="px-4 py-3 border-r">
                    <div className="max-w-[250px] truncate" title={row.errorDesc}>
                      {row.errorDesc || '-'}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap border-r">{row.equipment}</td>
                  <td className="px-4 py-3 whitespace-nowrap border-r">{row.symptom}</td>
                  <td className="px-4 py-3 border-r">
                    <div className="max-w-[200px] truncate" title={row.customerCode}>
                      {row.customerCode}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap border-r">{row.workMaster || '-'}</td>
                  <td className="px-4 py-3 border-r">
                    <span className="inline-block px-2 py-1 bg-red-500 text-white rounded text-xs font-bold whitespace-nowrap">
                      {row.workType}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap border-r">{row.department}</td>
                  <td className="px-4 py-3 whitespace-nowrap border-r">{row.planStartDate}</td>
                  <td className="px-4 py-3 whitespace-nowrap border-r">{row.planFinishDate}</td>
                  <td className="px-4 py-3 border-r">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getStatusBadge(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap border-r">{row.woGenDate}</td>
                  <td className="px-4 py-3 border-r">
                    <div className="max-w-[280px] truncate" title={row.priority}>
                      {row.priority}
                    </div>
                  </td>
                  <td className="px-4 py-3 border-r">
                    <span className="inline-block px-2 py-1 bg-yellow-400 text-gray-800 rounded text-xs font-bold whitespace-nowrap">
                      {row.planRespondMins}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-r">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-bold whitespace-nowrap ${getRespondMinsStyle(row.respondMins)}`}>
                      {row.respondMins ?? "null"}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{row.siteId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-700 bg-gray-50">
          <div>
            แสดง 1 ถึง {mockWorkOrders.length} จาก {mockWorkOrders.length} รายการ
          </div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-teal-600">
              ก่อนหน้า
            </button>
            <button className="px-3 py-1 bg-teal-600 text-white rounded-md">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">...</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-teal-600">
              ถัดไป
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}