export default function MandatorySection() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
        Mandatory
      </h2>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Report By
          </label>
          <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>01283-ธีรพล ศรีสวา</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Short Description
          </label>
          <input
            type="text"
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Department
          </label>
          <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>FPA000-แผนกธุรการและจัดซื้อ</option>
          </select>
        </div>
      </div>
    </section>
  );
}