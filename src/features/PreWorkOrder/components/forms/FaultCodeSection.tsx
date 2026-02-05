export default function FaultCodeSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
        Fault Code
      </h2>

      <div className="grid grid-cols-3 gap-3">
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
            <option>Please Select</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Priority
          </label>
          <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>C-งานไม่เร่งด่วนดำเนินงานภายใน 5 วัน</option>
          </select>
        </div>
      </div>
    </section>
  );
}