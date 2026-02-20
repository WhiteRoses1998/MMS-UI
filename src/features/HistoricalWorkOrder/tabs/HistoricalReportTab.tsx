// features/HistoricalWorkOrder/tabs/HistoricalReportTab.tsx
import { WorkOrder, MasterData } from '@/features/HistoricalWorkOrder/types';

const ReadField = ({ label, value }: { label: string; value?: string | number | null }) => (
  <div>
    <label className="block text-xs font-bold text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      readOnly
      value={value ?? '-'}
      className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-200 rounded text-gray-700 cursor-default"
    />
  </div>
);

const ReadTextArea = ({ label, value, rows = 3 }: { label: string; value?: string | null; rows?: number }) => (
  <div>
    <label className="block text-xs font-bold text-gray-700 mb-1">{label}</label>
    <textarea
      readOnly
      rows={rows}
      value={value ?? '-'}
      className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-200 rounded text-gray-700 cursor-default resize-none"
    />
  </div>
);

interface Props {
  workOrder: WorkOrder;
  masters: MasterData;
}

export default function HistoricalReportTab({ workOrder, masters }: Props) {
  const label = (list: { value: string; label: string }[], id?: string | null) =>
    list.find((o) => String(o.value) === String(id ?? ''))?.label || id || '-';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
          Error Classification
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <ReadField label="Error Class"    value={label(masters.errorClasses,   workOrder.errorclass_id)} />
          <ReadField label="Error Type"     value={label(masters.errorTypes,     workOrder.errortype_id)} />
          <ReadField label="Error Cause"    value={label(masters.errorCauses,    workOrder.errorcause_id)} />
          <ReadField label="Symptom"        value={label(masters.symptoms,       workOrder.symptom_id)} />
          <ReadField label="Perform Action" value={label(masters.performActions, workOrder.performaction_id)} />
          <ReadField label="Work Done"      value={workOrder.work_done} />
        </div>
      </div>

      <div>
        <h2 className="text-base font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
          Actual Dates
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ReadField label="Real Start"   value={workOrder.real_start_datetime} />
          <ReadField label="Real Finish"  value={workOrder.real_finish_datetime} />
          <ReadField label="Break Start"  value={workOrder.break_start_datetime} />
          <ReadField label="Break Finish" value={workOrder.break_finish_datetime} />
        </div>
      </div>

      <ReadTextArea label="Work Description (Report)" value={workOrder.work_desc} rows={4} />
    </div>
  );
}