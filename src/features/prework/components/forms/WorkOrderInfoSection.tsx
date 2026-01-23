export default function WorkOrderInfoSection() {
  return (
    <section className="border rounded-md p-4 space-y-4">
      <h3 className="font-semibold text-gray-700">Work Order</h3>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="text-sm">Work Order</label>
          <input className="input" value="080319" disabled />
        </div>

        <div>
          <label className="text-sm">Ref No.</label>
          <input className="input" />
        </div>

        <div>
          <label className="text-sm">WO Gen Date</label>
          <input className="input" value="19/08/2025" disabled />
        </div>

        <div>
          <label className="text-sm">Time</label>
          <input className="input" value="10:37" disabled />
        </div>
      </div>
    </section>
  );
}
