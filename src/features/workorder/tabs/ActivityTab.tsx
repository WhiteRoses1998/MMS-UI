// src/features/workorder/tabs/ActivityTab.tsx
import { WorkOrder } from '../types';

export default function ActivityTab({ workOrder }: { workOrder: WorkOrder }) {
  return (
    <div className="space-y-6">
      {/* ส่วนที่ 1: Activity + Employee + Craft */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Activity
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="กรอกกิจกรรม..."
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Employee
          </label>
          <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option value="">-- เลือกพนักงาน --</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Craft
          </label>
          <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option value="">-- เลือก Craft --</option>
          </select>
        </div>
      </div>

      {/* ส่วนที่ 2: Tools + Date From + Date To + ปุ่ม Clear & Add (แถวเดียวกัน) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* Tools - กว้างพอประมาณ */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Tools
          </label>
          <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option value="">-- เลือก --</option>
          </select>
        </div>

        {/* Date From - วันที่ + เวลา (เวลาสั้นลง) */}
        <div className="md:col-span-4">
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Date From
          </label>
          <div className="grid grid-cols-5 gap-2">
            <input
              type="date"
              className="col-span-3 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="time"
              step="900" // 15 นาที (ทำให้เลือกเวลาสั้นลง)
              className="col-span-2 px-2 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Date To - วันที่ + เวลา (เวลาสั้นลง) */}
        <div className="md:col-span-4">
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Date To
          </label>
          <div className="grid grid-cols-5 gap-2">
            <input
              type="date"
              className="col-span-3 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="time"
              step="900" // 15 นาที
              className="col-span-2 px-2 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* ปุ่ม Clear + Add ชิดขวา ในแถวเดียวกับส่วนวันที่ */}
        <div className="md:col-span-2 flex gap-3 justify-end md:justify-end">
          <button className="px-5 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition">
            Clear
          </button>
          <button className="px-5 py-2 bg-teal-600 text-white text-sm font-medium rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition">
            Add
          </button>
        </div>
      </div>

      {/* ปุ่ม Update all date ชิดขวา แยกอีกบรรทัด */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-teal-700 text-white text-sm font-medium rounded hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition">
          Update all date
        </button>
      </div>

      {/* ตารางผลลัพธ์ */}
      <div className="mt-6 overflow-x-auto border border-gray-200 rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Alert</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Activity</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Employee</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Tools</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Craft</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Plan Start</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Plan Finish</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td colSpan={7} className="px-4 py-6 text-center text-sm text-gray-500">
                No matching records found
              </td>
            </tr>
          </tbody>
        </table>

        <div className="px-4 py-3 flex justify-between items-center text-sm text-gray-500 bg-gray-50">
          <span>Showing 0 to 0 of 0 entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">Previous</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}