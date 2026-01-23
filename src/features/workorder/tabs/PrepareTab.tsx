// src/features/workorder/tabs/PrepareTab.tsx
import { WorkOrder } from '../types';

export default function PrepareTab({ workOrder }: { workOrder: WorkOrder }) {
  return (
    <div className="space-y-6">
      {/* ส่วนบน: แบ่ง 2 ฝั่ง */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ฝั่งซ้าย: Standard Job ID + View Detail + Work Description */}
        <div className="space-y-4">
          {/* Standard Job ID + View Detail */}
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Standard Job ID
              </label>
              <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>Please Select</option>
              </select>
            </div>
            <button className="px-4 py-1.5 bg-teal-500 text-white text-sm font-medium rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 whitespace-nowrap">
              View Detail
            </button>
          </div>

          {/* Work Description - ขนาด textbox เท่าตัวอื่น ๆ (ไม่กว้างเต็ม) */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Work Description
            </label>
            <textarea
              rows={3}
              className="w-full max-w-2xl px-2 py-1.5 text-sm border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* ฝั่งขวา: Insp. Note (ขนาด textbox เท่าตัวอื่น ๆ) */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Insp. Note
            </label>
            <textarea
              rows={3}
              className="w-full max-w-2xl px-2 py-1.5 text-sm border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* ส่วนล่าง: Preventive Maintenance Information (ซ้าย) + Prepare Codes (ขวา) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ซ้าย: Preventive Maintenance Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            Preventive Maintenance Information
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                PM No.
              </label>
              <input
                type="text"
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Insp. Note
              </label>
              <input
                type="text"
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Action ID
              </label>
              <input
                type="text"
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Customer Code
              </label>
              <input
                type="text"
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              PM Desc
            </label>
            <textarea
              rows={2}
              className="w-full max-w-2xl px-2 py-1.5 text-sm border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* ขวา: Prepare Codes */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            Prepare Codes
          </h2>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              System Type (IT)
            </label>
            <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>Please Select</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Events
            </label>
            <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>Please Select</option>
            </select>
            <p className="text-red-500 text-xs mt-1">
              The selected event has occurred 0 time(s).
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Issue Type (IT)
            </label>
            <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>Please Select</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Pending Reason
            </label>
            <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>Please Select</option>
            </select>
          </div>
        </div>
      </div>

      {/* ส่วน Employee ID (ฝั่งซ้ายคนเดียว) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            Employee ID
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Work Leader Sign
              </label>
              <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>Please Select</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Prepared By
              </label>
              <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>Please Select</option>
              </select>
            </div>
          </div>
        </div>

        {/* ฝั่งขวาเว้นว่าง */}
        <div></div>
      </div>
    </div>
  );
}