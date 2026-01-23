export default function FaultCodeSection() {
  return (
    <section className="border rounded-md p-4 space-y-4">
      <h3 className="font-semibold text-gray-700">Fault Code</h3>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label>Impact (IT)</label>
          <select className="input">
            <option>Please Select</option>
          </select>
        </div>

        <div>
          <label>Error Symptom</label>
          <select className="input">
            <option>Please Select</option>
          </select>
        </div>

        <div>
          <label>Priority</label>
          <select className="input">
            <option>C-งานไม่เร่งด่วนดำเนินงานภายใน 5 วัน</option>
          </select>
        </div>
      </div>
    </section>
  );
}
