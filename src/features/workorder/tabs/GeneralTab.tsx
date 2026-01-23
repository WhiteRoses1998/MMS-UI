// src/features/workorder/tabs/GeneralTab.tsx
import { WorkOrder } from '../types';

interface Props {
  workOrder: WorkOrder;
}

export default function GeneralTab({ workOrder }: Props) {
  return (
    <div className="space-y-4">
      {/* Section 1: General Data + Planning Schedule */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column: General Data */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            General Data
          </h2>

          {/* Row 1: Report By + Post Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Report By
              </label>
              <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>01372-ทำงานสรุป บุกสิงห์</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Post Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                defaultValue="2025-10-20"
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Row 2: Creation Date + Test Point ID */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Creation Date
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value="03/10/2025"
                  readOnly
                  className="flex-1 px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  value="18:08"
                  readOnly
                  className="w-16 px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded text-center"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Test Point ID
              </label>
              <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>Please Select</option>
              </select>
            </div>
          </div>

          {/* Row 3: Directive */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Directive
            </label>
            <textarea
              value="ตามหนังสือสั่งการเข้าตรวจเก็บข้อมูล SCW ไม่ได้"
              rows={2}
              className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Row 4: Fund Center + Fund */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Fund Center
              </label>
              <input
                type="text"
                className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Fund <span className="text-red-500">*</span>
              </label>
              <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>Please Select</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Planning Schedule */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            Planning Schedule
          </h2>

          {/* Alert Message */}
          <div className="bg-red-50 border-l-4 border-red-500 p-2">
            <p className="text-red-700 text-xs font-medium">
              Please input Plan Start - Plan Finish before Assigning Work Master.
            </p>
          </div>

          {/* Row 1: Plan Start Date + Required Start */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Plan Start Date
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  defaultValue="2025-10-10"
                  className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="time"
                  defaultValue="10:32"
                  className="w-24 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Required Start
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  defaultValue="2025-10-10"
                  className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="time"
                  defaultValue="10:31"
                  className="w-24 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Plan Finish Date + Required Finish */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Plan Finish Date
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  defaultValue="2025-10-10"
                  className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="time"
                  defaultValue="10:32"
                  className="w-24 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Required Finish
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  defaultValue="2025-10-10"
                  className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="time"
                  defaultValue="10:31"
                  className="w-24 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Row 3: Plan (Hrs) + Plan Manday (Hrs) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Plan (Hrs)
              </label>
              <input
                type="text"
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Plan Manday (Hrs)
              </label>
              <input
                type="text"
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Planning Information + Fault Report Information */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column: Planning Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            Planning Information
          </h2>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Department
            </label>
            <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>FRTD2-บริษัท ทางด่วน ถนนด่วนหลวงพิเศษและทางพิเศษกรุงเทพมหานครจำกัด ภาคตะวันตก</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Work Type <span className="text-red-500">*</span>
              </label>
              <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>CM-Corrective Maintenance</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Include Inspection
              </label>
              <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>NO</option>
                <option>YES</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Priority
              </label>
              <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>A-งานด่วนเร่ง (ยานยนต์เข้าทำงาน 1 วัน)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Criticality
              </label>
              <input
                type="text"
                className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Work Master
            </label>
            <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>01693-กฤษฎ์ ฉัตรไชยนาม</option>
            </select>
          </div>

        </div>

        {/* Right Column: Fault Report Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            Fault Report Information
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Impact (IT)
              </label>
              <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>Please Select</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Error Symptom
              </label>
              <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>SME01-ไม่ทราบสาเหตุ</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Fault Description
            </label>
            <textarea
              value="เข้าตรวจไม่ได้ SCW ไม่ได้ (ลั่งทอ)"
              rows={3}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Breakdown
              </label>
              <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>NO</option>
                <option>YES</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Location No.
              </label>
              <input
                type="text"
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Bottom Row - Additional WO Info */}
      <div className="flex justify-between items-end pt-4 border-t-2">
        {/* Left Side: Form Fields */}
        <div className="grid grid-cols-4 gap-3 flex-1">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Ref No.
            </label>
            <input
              type="text"
              value="OTD-88-000464"
              readOnly
              className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Main WO No.
            </label>
            <input
              type="text"
              className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Child WO No.
            </label>
            <input
              type="text"
              className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Work Order Group
            </label>
            <input
              type="text"
              className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Right Side: Buttons */}
        <div className="flex gap-3 ml-6">
          <button className="px-6 py-2 bg-white text-teal-600 text-sm font-medium rounded border border-teal-600 hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500">
            Close
          </button>
          <button className="px-6 py-2 bg-teal-600 text-white text-sm font-medium rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}