// features/HistoricalWorkOrder/tabs/HistoricalGeneralTab.tsx
// Layout เหมือน GeneralTab ของ Activity ทุกจุด แต่ทุก field เป็น readOnly
import { WorkOrder, MasterData } from '@/features/HistoricalWorkOrder/types';

// Helper components — เหมือน input/select ของ Activity แต่ readOnly + bg-gray-100
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
      className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded text-gray-700 cursor-default resize-none" />
  </div>
);

// Date split helper
const splitDT = (dt?: string | null) => {
  if (!dt) return { date: '-', time: '-' };
  const d = new Date(dt);
  if (isNaN(d.getTime())) return { date: dt, time: '' };
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return { date: `${year}-${month}-${day}`, time: d.toTimeString().slice(0, 5) };
};

const RDate = ({ label, value }: { label: string; value?: string | null }) => {
  const { date, time } = splitDT(value);
  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 mb-1">{label}</label>
      <div className="flex gap-2">
        <input type="text" readOnly value={date}
          className="flex-1 px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded text-gray-700 cursor-default" />
        {time && <input type="text" readOnly value={time}
          className="w-16 px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded text-gray-700 cursor-default text-center" />}
      </div>
    </div>
  );
};

interface Props { workOrder: WorkOrder; masters: MasterData; }

export default function HistoricalGeneralTab({ workOrder, masters }: Props) {
  const lbl = (list: { value: string; label: string }[], id?: string | number | null) =>
    list.find((o) => String(o.value) === String(id ?? ''))?.label || String(id ?? '-') || '-';

  return (
    <div className="space-y-4">
      {/* Section 1: General Data + Planning Schedule — layout เหมือน GeneralTab */}
      <div className="grid grid-cols-2 gap-6">

        {/* Left: General Data */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">General Data</h2>

          <div className="grid grid-cols-2 gap-3">
            <RF label="Report By"  value={workOrder.requester_name || workOrder.requester_user_name} />
            <RDate label="Post Date" value={workOrder.post_date} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <RDate label="Creation Date" value={workOrder.creation_datetime} />
            <RF label="Test Point ID"  value={workOrder.testpoint_name} />
          </div>

          <RTA label="Work Description" value={workOrder.detail_report} />

          <RF label="Fund" value={workOrder.fund_name} />
        </div>

        {/* Right: Planning Schedule */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">Planning Schedule</h2>

          <div className="grid grid-cols-2 gap-3">
            <RDate label="Plan Start"  value={workOrder.plan_start_datetime} />
            <RDate label="Plan Finish" value={workOrder.plan_finish_datetime} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <RDate label="Req. Start"  value={workOrder.req_start_datetime} />
            <RDate label="Req. Finish" value={workOrder.req_finish_datetime} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <RF label="Plan Hrs"    value={workOrder.plan_hrs} />
            <RF label="Plan Manday" value={workOrder.plan_manday} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <RF label="Work Type"    value={lbl(masters.workTypes,  workOrder.worktype_id)} />
            <RF label="Include Inspection" value={workOrder.include_inspection ? 'Yes' : 'No'} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <RF label="Priority"    value={lbl(masters.priorities, workOrder.priority_id)} />
            <RF label="Criticality" value={workOrder.criticality} />
          </div>

          <RF label="Work Master" value={workOrder.master_user_name} />
        </div>
      </div>

      {/* Section 2: Fault Report Information */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">Fault Report Information</h2>

          <div className="grid grid-cols-2 gap-3">
            <RF label="Impact (IT)"    value={lbl(masters.impacts,  workOrder.impact_id)} />
            <RF label="Error Symptom"  value={lbl(masters.symptoms, workOrder.symptom_id)} />
          </div>

          <RTA label="Fault Description" value={workOrder.faultdescription} />

          <div className="grid grid-cols-2 gap-3">
            <RF label="Breakdown"   value={workOrder.job_breakdown ? 'YES' : 'NO'} />
            <RF label="Location No." value={workOrder.location_name} />
          </div>
        </div>
      </div>

      {/* Section 3: Bottom row */}
      <div className="flex justify-between items-end pt-4 border-t-2">
        <div className="grid grid-cols-4 gap-3 flex-1">
          <RF label="Ref No."          value={workOrder.job_reference} />
          <RF label="Main WO No."      value={workOrder.main_leader_name} />
          <RF label="Child WO No."     value={workOrder.child_worker_name} />
          <RF label="Work Order Group" value={workOrder.group_name} />
        </div>
      </div>
    </div>
  );
}