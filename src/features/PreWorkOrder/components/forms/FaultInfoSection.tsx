import { Textarea } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

interface Props {
  data: any;
  faultTypes: any[];
  onChange: (key: string, value: any) => void;
}

export default function FaultInfoSection({
  data,
  faultTypes,
  onChange,
}: Props) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Information about the Fault</h3>

      <Select
        value={data.fault_type_id || ""}
        onValueChange={(v) => onChange("fault_type_id", v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Fault Type" />
        </SelectTrigger>
        <SelectContent>
          {faultTypes.map((f) => (
            <SelectItem key={f.id} value={String(f.id)}>
              {f.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Textarea
        placeholder="Fault Description"
        value={data.fault_description || ""}
        onChange={(e) => onChange("fault_description", e.target.value)}
      />
    </div>
  );
}
