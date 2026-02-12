import { PreWorkOrder, Symptom } from "@/features/PreWorkOrder/types";

interface Props {
  data: PreWorkOrder;
  faultTypes: Symptom[];  // symptoms = faultTypes
  onChange: (key: string, value: any) => void;
}

export default function FaultInfoSection({ 
  data, 
  faultTypes, 
  onChange 
}: Props) {
  return (
    <section className="border rounded-md p-4 space-y-4">
      <h3 className="font-semibold text-gray-700">
        Information about the Fault
      </h3>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label>Fault Type</label>
          <select 
            className="input"
            value={data.fault_type_id || ""}
            onChange={(e) => onChange("fault_type_id", e.target.value)}
          >
            <option value="">Please Select</option>
            {faultTypes.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Equipment</label>
          <div className="flex gap-2">
            <input 
              className="input flex-1" 
              value={data.equipment_id || ""} 
              disabled 
            />
            <button 
              type="button"
              className="bg-teal-700 text-white px-3 rounded hover:bg-teal-800"
            >
              ...
            </button>
          </div>
        </div>

        <div>
          <label>Equipment Description</label>
          <input
            className="input"
            value={data.equipment || ""}
            disabled
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <label>Fault Description</label>
          <textarea
            className="input h-28"
            value={data.detail_report || ""}  
            onChange={(e) => onChange("detail_report", e.target.value)}
            placeholder="Enter fault description..."
          />
        </div>

        <div className="space-y-4">
          <div>
            <label>Breakdown</label>
            <select className="input">
              <option value="NO">NO</option>
              <option value="YES">YES</option>
            </select>
          </div>

          <div>
            <label>Location No.</label>
            <input
              className="input"
              value={data.location_id || ""}   
              onChange={(e) => onChange("location_id", e.target.value)}
              disabled
            />
          </div>
        </div>
      </div>
    </section>
  );
}