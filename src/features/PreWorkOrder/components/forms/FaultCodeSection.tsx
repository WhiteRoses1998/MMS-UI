import { PreWorkOrder, FaultCode, Impact, Symptom } from "@/features/PreWorkOrder/types";

interface Props {
  data: PreWorkOrder;
  faultCodes: FaultCode[];
  impacts?: Impact[];
  symptoms?: Symptom[];
  onChange: (key: string, value: any) => void;
}

export default function FaultCodeSection({ 
  data, 
  faultCodes, 
  impacts = [],
  symptoms = [],
  onChange 
}: Props) {
  return (
    <section className="border rounded-md p-4 space-y-4">
      <h3 className="font-semibold text-gray-700">Fault Code</h3>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label>Fault Code</label>
          <select 
            className="input"
            value={data.fault_code_id || ""}
            onChange={(e) => onChange("fault_code_id", e.target.value)}
          >
            <option value="">Please Select</option>
            {faultCodes.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Impact (IT)</label>
          <select 
            className="input"
            disabled
          >
            <option value="">Please Select</option>
            {impacts.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Error Symptom</label>
          <select 
            className="input"
            disabled
          >
            <option value="">Please Select</option>
            {symptoms.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}