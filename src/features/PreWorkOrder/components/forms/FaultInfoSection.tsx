export default function FaultInfoSection() {
  return (
    <section className="border rounded-md p-4 space-y-4">
      <h3 className="font-semibold text-gray-700">
        Information about the Fault
      </h3>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label>Equipment</label>
          <div className="flex gap-2">
            <input className="input flex-1" value="40000019-0000" disabled />
            <button className="bg-teal-700 text-white px-3 rounded">…</button>
          </div>
        </div>

        <div>
          <label>Equipment Description</label>
          <input
            className="input"
            value="รถกวาด-ดูดฝุ่น ยี่ห้อ JOHNSTON รุ่น VT 650"
            disabled
          />
        </div>

        <div>
          <label>Customer</label>
          <input className="input" disabled />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <label>Fault Description</label>
          <textarea
            className="input h-28"
            defaultValue="RP68/110 614
-เช็คสัญญาณไฟอุตร"
          />
        </div>

        <div className="space-y-4">
          <div>
            <label>Breakdown</label>
            <select className="input">
              <option>NO</option>
              <option>YES</option>
            </select>
          </div>

          <div>
            <label>Location No.</label>
            <input
              className="input"
              value="CR-00-002-รถปฏิบัติการ-ฝ่ายซ่อมบำรุงรักษา"
              disabled
            />
          </div>
        </div>
      </div>
    </section>
  );
}
