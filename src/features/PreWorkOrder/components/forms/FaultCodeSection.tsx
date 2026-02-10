import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

interface Props {
  data: any;
  faultCodes: any[];
  onChange: (key: string, value: any) => void;
}

export default function FaultCodeSection({
  data,
  faultCodes,
  onChange,
}: Props) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Fault Code</h3>

      <Select
        value={data.fault_code_id || ""}
        onValueChange={(v) => onChange("fault_code_id", v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Fault Code" />
        </SelectTrigger>
        <SelectContent className="max-h-64 overflow-y-auto">
          {faultCodes.map((f) => (
            <SelectItem key={f.id} value={String(f.id)}>
              {f.code} - {f.description}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
