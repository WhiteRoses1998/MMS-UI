import { Input } from "@/components/ui";

interface Props {
  data: any;
  onChange: (key: string, value: any) => void;
}

export default function WorkOrderInfoSection({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Work Order Information</h3>

      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Work Order No."
          value={data.work_order_no || ""}
          onChange={(e) => onChange("work_order_no", e.target.value)}
        />

        <Input
          placeholder="Job Reference"
          value={data.job_reference || ""}
          onChange={(e) => onChange("job_reference", e.target.value)}
        />

        <Input
          placeholder="Department"
          value={data.department || ""}
          onChange={(e) => onChange("department", e.target.value)}
        />

        <Input
          placeholder="Location"
          value={data.location || ""}
          onChange={(e) => onChange("location", e.target.value)}
        />
      </div>
    </div>
  );
}
