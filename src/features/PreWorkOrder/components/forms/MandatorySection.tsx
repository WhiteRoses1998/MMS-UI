import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

interface Props {
  data: any;
  priorities: any[];
  jobStatuses: any[];
  onChange: (key: string, value: any) => void;
}

export default function MandatorySection({
  data,
  priorities,
  jobStatuses,
  onChange,
}: Props) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Mandatory</h3>

      <Select
        value={data.priority_id || ""}
        onValueChange={(v) => onChange("priority_id", v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          {priorities.map((p) => (
            <SelectItem key={p.id} value={String(p.id)}>
              {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={data.job_status_id || ""}
        onValueChange={(v) => onChange("job_status_id", v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Job Status" />
        </SelectTrigger>
        <SelectContent>
          {jobStatuses.map((s) => (
            <SelectItem key={s.id} value={String(s.id)}>
              {s.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
