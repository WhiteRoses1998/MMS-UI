export default function WorkOrderInfoSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
        Work Order
      </h2>

      <div className="grid grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Work Order
          </label>
          <input
            type="text"
            value="080319"
            readOnly
            className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Ref No.
          </label>
          <input
            type="text"
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            WO Gen Date
          </label>
          <input
            type="text"
            value="19/08/2025"
            readOnly
            className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Time
          </label>
          <input
            type="text"
            value="10:37"
            readOnly
            className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded"
          />
        </div>
      </div>
    </section>
  );
}