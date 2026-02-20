// features/HistoricalWorkOrder/tabs/HistoricalPrepareTab.tsx
// Layout เหมือน PrepareTab ของ Activity ทุกจุด แต่ทุก field เป็น readOnly
import { WorkOrder, MasterData } from '@/features/HistoricalWorkOrder/types';

const RF = ({ label, value }: { label: string; value?: string | number | null }) => (
  <div>
    <label className="block text-xs font-bold text-gray-700 mb-1">{label}</label>
    <input type="text" readOnly value={value ?? '-'}
      className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded text-gray-700 cursor-default" />
  </div>
);

const RTA = ({ label, value, rows = 3 }: { label: string; value?: string | null; rows?: number }) => (
  <div>
    <label className="block text-xs font-bold text-gray-700 mb-1">{label}</label>
    <textarea readOnly rows={rows} value={value ?? '-'}
      className="w-full max-w-2xl px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded text-gray-700 cursor-default resize-none" />
  </div>
);

interface Props { workOrder: WorkOrder; masters: MasterData; }

export default function HistoricalPrepareTab({ workOrder, masters }: Props) {
  const lbl = (list: { value: string; label: string }[], id?: string | null) =>
    list.find((o) => String(o.value) === String(id ?? ''))?.label || String(id ?? '-') || '-';

  return (
    <div className="space-y-6">
      {/* ส่วนบน: Standard Job ID + Work Description (ซ้าย) / Insp. Note (ขวา) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <RF label="Standard Job ID" value={lbl(masters.standardJobs, workOrder.standard_jobs)} />
            </div>
          </div>
          <RTA label="Work Description" value={workOrder.work_des} />
        </div>
        <div className="space-y-4">
          <RTA label="Insp. Note" value={workOrder.insp_note} />
        </div>
      </div>

      {/* ส่วนล่าง: PM Info (ซ้าย) + Prepare Codes (ขวา) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ซ้าย: Preventive Maintenance Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            Preventive Maintenance Information
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <RF label="PM No."    value={lbl(masters.pmList, workOrder.pm_no)} />
            <RF label="Insp. Note" value="-" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <RF label="Action ID"     value={lbl(masters.actions,       workOrder.actions_id)} />
            <RF label="Customer Code" value={lbl(masters.customerCodes, workOrder.cuscode_id)} />
          </div>
          <RTA label="PM Desc" value={workOrder.pm_desc} rows={2} />
        </div>

        {/* ขวา: Prepare Codes */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            Prepare Codes
          </h2>
          <RF label="System Type (IT)" value={lbl(masters.systemTypes,    workOrder.systemtype_id)} />
          <RF label="Events"           value={lbl(masters.events,         workOrder.events_id)} />
          <RF label="Issue Type (IT)"  value={lbl(masters.issueTypes,     workOrder.issuetype_id)} />
          <RF label="Pending Reason"   value={lbl(masters.pendingReasons, workOrder.pending_id)} />
        </div>
      </div>

      {/* Employee ID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">Employee ID</h2>
          <div className="grid grid-cols-2 gap-3">
            <RF label="Work Leader Sign" value={lbl(masters.workLeaders, workOrder.em_workleader_id)} />
            <RF label="Prepared By"      value={lbl(masters.preparedBy,  workOrder.em_prepare_id)} />
          </div>
        </div>
        <div />
      </div>
    </div>
  );
}