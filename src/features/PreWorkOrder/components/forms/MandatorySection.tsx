import { PreWorkOrder, Priority, JobStatus } from "@/features/PreWorkOrder/types";

interface Props {
  data: PreWorkOrder;
  priorities: Priority[];
  jobStatuses: JobStatus[];
  onChange: (key: string, value: any) => void;
}

export default function MandatorySection({ 
  data, 
  priorities, 
  jobStatuses, 
  onChange 
}: Props) {
  return (
    <section className="border rounded-md p-4 space-y-4">
      <h3 className="font-semibold text-gray-700">Mandatory</h3>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label>Priority</label>
          <select 
            className="input"
            value={data.priority_id || ""}
            onChange={(e) => onChange("priority_id", e.target.value)}
          >
            <option value="">Please Select</option>
            {priorities.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Job Status</label>
          <select 
            className="input"
            value={data.jobstatus_id || ""}
            onChange={(e) => onChange("jobstatus_id", Number(e.target.value) || null)}
          >
            <option value="">Please Select</option>
            {jobStatuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Department</label>
          <select 
            className="input"
            value={data.dep_id || ""}
            onChange={(e) => onChange("dep_id", e.target.value)}
            disabled
          >
            <option value="">Please Select</option>
            {/* Department จะถูกเลือกใน WorkOrderInfoSection */}
          </select>
        </div>
      </div>
    </section>
  );
}