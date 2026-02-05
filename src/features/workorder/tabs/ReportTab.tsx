import { WorkOrder } from '../types';

export default function ReportTab({ workOrder }: { workOrder: WorkOrder }) {
  return (
    <div className="p-4 bg-white">
      {/* Header button สำหรับบันทึก */}
      <div className="flex justify-end mb-4">
        <button className="bg-teal-600 text-white px-4 py-2 rounded flex items-center">
          <span className="mr-2">บันทึกข้อมูล</span>
        </button>
      </div>

      {/* แถวแรก: Error fields + Photos */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* ฝั่งซ้าย */}
        <div className="flex-1">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Error Class / Incident</label>
            <select className="mt-1 block w-full p-2 bg-gray-100 border border-gray-300 rounded">
              <option>Please Select</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Perform Action ID</label>
            <select className="mt-1 block w-full p-2 bg-gray-100 border border-gray-300 rounded">
              <option>Please Select</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Error Symptom</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 bg-gray-100 border border-gray-300 rounded"
              placeholder="SME01:บำรุงรักษา"
            />
          </div>
        </div>

        {/* ฝั่งขวา */}
        <div className="flex-1">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Error Type</label>
            <select className="mt-1 block w-full p-2 bg-gray-100 border border-gray-300 rounded">
              <option>Please Select</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Error Cause</label>
            <select className="mt-1 block w-full p-2 bg-gray-100 border border-gray-300 rounded">
              <option>Please Select</option>
            </select>
          </div>
        </div>
      </div>

      {/* แถวที่สอง */}
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        {/* ฝั่งซ้าย */}
        <div className="flex-1">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Work Done *</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 bg-gray-100 border border-gray-300 rounded"
              placeholder="สรุปงานที่ทำ"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Real Start Date *</label>
            <div className="grid grid-cols-2 gap-2">
              <input type="date" className="p-2 bg-gray-100 border border-gray-300 rounded" />
              <input type="time" className="p-2 bg-gray-100 border border-gray-300 rounded" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Real Finish Date *</label>
            <div className="grid grid-cols-2 gap-2">
              <input type="date" className="p-2 bg-gray-100 border border-gray-300 rounded" />
              <input type="time" className="p-2 bg-gray-100 border border-gray-300 rounded" />
            </div>
          </div>
        </div>

        {/* ฝั่งขวา */}
        <div className="flex-1">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Work Description</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 bg-gray-100 border border-gray-300 rounded"
              placeholder="รายละเอียดเพิ่มเติม..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Break Start Date</label>
            <div className="grid grid-cols-2 gap-2">
              <input type="date" className="p-2 bg-gray-100 border border-gray-300 rounded" />
              <input type="time" className="p-2 bg-gray-100 border border-gray-300 rounded" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Break Finish Date</label>
            <div className="grid grid-cols-2 gap-2">
              <input type="date" className="p-2 bg-gray-100 border border-gray-300 rounded" />
              <input type="time" className="p-2 bg-gray-100 border border-gray-300 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}