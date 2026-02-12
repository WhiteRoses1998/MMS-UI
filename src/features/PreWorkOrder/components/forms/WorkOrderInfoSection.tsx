import { PreWorkOrder, Personnel, Department, Location } from "@/features/PreWorkOrder/types";

interface Props {
  data: PreWorkOrder;
  onChange: (key: string, value: any) => void;
  personnel: Personnel[];
  departments: Department[];
  locations: Location[];
}

export default function WorkOrderInfoSection({
  data,
  onChange,
  personnel = [],
  departments = [],
  locations = [],
}: Props) {
  return (
    <section className="border rounded-md p-4 space-y-4">
      <h3 className="font-semibold text-gray-700">Work Order</h3>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="text-sm">Work Order</label>
          <input 
            className="input" 
            value={String(data.workorder_id || "")}
            disabled
            type="text"
          />
        </div>

        <div>
          <label className="text-sm">Ref No.</label>
          <input 
            className="input" 
            value={data.job_reference || ""} 
            disabled
            type="text"
          />
        </div>

        <div>
          <label className="text-sm">Requester</label>
          <select 
            className="input"
            value={data.requester_id || ""}
            onChange={(e) => onChange("requester_id", e.target.value)}
          >
            <option value="">Please Select</option>
            {personnel.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm">Department</label>
          <select 
            className="input"
            value={data.dep_id || ""}
            onChange={(e) => onChange("dep_id", e.target.value)}
          >
            <option value="">Please Select</option>
            {departments.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm">Location</label>
          <select 
            className="input"
            value={data.location_id || ""}
            onChange={(e) => onChange("location_id", e.target.value)}
          >
            <option value="">Please Select</option>
            {locations.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}