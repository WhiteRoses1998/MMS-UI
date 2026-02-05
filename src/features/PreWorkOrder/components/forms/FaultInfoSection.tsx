export default function FaultInfoSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
        Information about the Fault
      </h2>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Equipment
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value="40000019-0000"
              readOnly
              className="flex-1 px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded"
            />
            <button className="px-3 py-1.5 bg-teal-500 text-white text-sm font-medium rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500">
              …
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Equipment Description
          </label>
          <input
            type="text"
            value="รถกวาด-ดูดฝุ่น ยี่ห้อ JOHNSTON รุ่น VT 650"
            readOnly
            className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Customer
          </label>
          <input
            type="text"
            readOnly
            className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Fault Description
          </label>
          <textarea
            rows={3}
            defaultValue="RP68/110 614
-เช็คสัญญาณไฟอุตร"
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="space-y-3">
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
              value="CR-00-002-รถปฏิบัติการ-ฝ่ายซ่อมบำรุงรักษา"
              readOnly
              className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
}