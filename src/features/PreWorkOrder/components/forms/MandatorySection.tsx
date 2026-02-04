export default function MandatorySection() {
  return (
    <section className="border rounded-md p-4 space-y-4">
      <h3 className="font-semibold text-gray-700">Mandatory</h3>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label>Report By</label>
          <select className="input">
            <option>01283-ธีรพล ศรีสวา</option>
          </select>
        </div>

        <div>
          <label>Short Description</label>
          <input className="input" />
        </div>

        <div>
          <label>Department</label>
          <select className="input">
            <option>FPA000-แผนกธุรการและจัดซื้อ</option>
          </select>
        </div>
      </div>
    </section>
  );
}
