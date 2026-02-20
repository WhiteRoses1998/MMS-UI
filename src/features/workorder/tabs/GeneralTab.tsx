// GeneralTab.tsx - Updated with API integration
import { WorkOrder, MasterData } from '@/features/WorkOrder/types';
import { useEffect, useState, useCallback } from 'react';

interface Props {
  workOrder: WorkOrder;
  masters: MasterData;
  onUpdate: (data: Partial<WorkOrder>) => void;
}

export default function GeneralTab({ workOrder, masters, onUpdate }: Props) {
  const [formData, setFormData] = useState<Partial<WorkOrder>>({});
  const [updateTimeout, setUpdateTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Helper to format datetime from backend to frontend format
    const formatDateTime = (datetime: string | undefined): string => {
      if (!datetime) return '';
      if (typeof datetime === 'string') {
        // Remove timezone and milliseconds: "2026-01-25T17:00:00.000Z" -> "2026-01-25T17:00:00"
        return datetime.replace(/\.\d{3}Z$/, '').replace('Z', '');
      }
      return datetime;
    };

    // Helper to convert date to YYYY-MM-DD format
    const toDateString = (date: string | undefined): string => {
      if (!date) return '';
      if (date.includes('T')) {
        // If ISO format, extract date part
        return date.split('T')[0];
      }
      return date;
    };

    setFormData({
      requester_id: workOrder.requester_id,
      post_date: toDateString(workOrder.post_date),
      tp_id: workOrder.tp_id,
      detail_report: workOrder.detail_report,
      fund_id: workOrder.fund_id,
      plan_start_datetime: formatDateTime(workOrder.plan_start_datetime),
      req_start_datetime: formatDateTime(workOrder.req_start_datetime),
      plan_finish_datetime: formatDateTime(workOrder.plan_finish_datetime),
      req_finish_datetime: formatDateTime(workOrder.req_finish_datetime),
      plan_hrs: workOrder.plan_hrs,
      plan_manday: workOrder.plan_manday,
      dep_id: workOrder.dep_id,
      worktype_id: workOrder.worktype_id,
      include_inspection: workOrder.include_inspection,
      priority_id: workOrder.priority_id,
      criticality: workOrder.criticality,
      master_user_id: workOrder.master_user_id,
      impact_id: workOrder.impact_id,
      symptom_id: workOrder.symptom_id,
      faultdescription: workOrder.faultdescription,
      job_breakdown: workOrder.job_breakdown,
      fault_location_id: workOrder.fault_location_id,
      main_leader_user_id: workOrder.main_leader_user_id,
      child_worker_user_id: workOrder.child_worker_user_id,
      group_id: workOrder.group_id,
    });
  }, [workOrder]);

  const handleChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    
    // Clear previous timeout
    if (updateTimeout) {
      clearTimeout(updateTimeout);
    }
    
    // Set new timeout - จะ update หลังจาก user หยุดพิมพ์ 1 วินาที
    const timeout = setTimeout(() => {
      onUpdate(updated);
    }, 1000);
    
    setUpdateTimeout(timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (updateTimeout) {
        clearTimeout(updateTimeout);
      }
    };
  }, [updateTimeout]);

  // Helper to format datetime for input — ใช้ local date เพื่อไม่ให้วันถอยหลัง 1 วันจาก UTC offset
  const formatDateTimeForInput = (datetime?: string) => {
    if (!datetime) return { date: '', time: '' };
    const d = new Date(datetime);
    if (isNaN(d.getTime())) return { date: '', time: '' };
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    const time = d.toTimeString().slice(0, 5);
    return { date, time };
  };

  // Helper to combine date and time
  const combineDatetime = (date: string, time: string) => {
    if (!date) return '';
    return `${date} ${time || '00:00'}:00`;
  };

  const creationDT = formatDateTimeForInput(workOrder.creation_datetime);
  const planStart = formatDateTimeForInput(formData.plan_start_datetime);
  const reqStart = formatDateTimeForInput(formData.req_start_datetime);
  const planFinish = formatDateTimeForInput(formData.plan_finish_datetime);
  const reqFinish = formatDateTimeForInput(formData.req_finish_datetime);

  return (
    <div className="space-y-4">
      {/* Section 1: General Data + Planning Schedule */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column: General Data */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            General Data
          </h2>

          {/* Row 1: Report By + Post Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Report By <span className="text-red-500">*</span>
              </label>
              <select 
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.requester_id || ''}
                onChange={(e) => handleChange('requester_id', e.target.value)}
              >
                <option value="">Please Select</option>
                {masters.personnel.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Post Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.post_date || ''}
                onChange={(e) => handleChange('post_date', e.target.value)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Row 2: Creation Date + Test Point ID */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Creation Date
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={creationDT.date}
                  readOnly
                  className="flex-1 px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  value={creationDT.time}
                  readOnly
                  className="w-16 px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded text-center"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Test Point ID 
              </label>
              <select 
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.tp_id || ''}
                onChange={(e) => handleChange('tp_id', e.target.value)}
              >
                <option value="">Please Select</option>
                {masters.testPoints.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Directive */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Directive 
            </label>
            <textarea
              value={formData.detail_report || ''}
              onChange={(e) => handleChange('detail_report', e.target.value)}
              rows={2}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Row 4: Fund Center + Fund */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Fund Center 
              </label>
              <input
                type="text"
                readOnly
                className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Fund <span className="text-red-500">*</span>
              </label>
              <select 
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.fund_id || ''}
                onChange={(e) => handleChange('fund_id', e.target.value)}
              >
                <option value="">Please Select</option>
                {masters.funds.map(f => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Planning Schedule */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            Planning Schedule
          </h2>

          {/* Alert Message */}
          <div className="bg-red-50 border-l-4 border-red-500 p-2">
            <p className="text-red-700 text-xs font-medium">
              Please input Plan Start - Plan Finish before Assigning Work Master.
            </p>
          </div>

          {/* Row 1: Plan Start Date + Required Start */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Plan Start Date
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={planStart.date}
                  onChange={(e) => handleChange('plan_start_datetime', combineDatetime(e.target.value, planStart.time))}
                  className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="time"
                  value={planStart.time}
                  onChange={(e) => handleChange('plan_start_datetime', combineDatetime(planStart.date, e.target.value))}
                  className="w-24 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Required Start
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={reqStart.date}
                  onChange={(e) => handleChange('req_start_datetime', combineDatetime(e.target.value, reqStart.time))}
                  className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="time"
                  value={reqStart.time}
                  onChange={(e) => handleChange('req_start_datetime', combineDatetime(reqStart.date, e.target.value))}
                  className="w-24 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Plan Finish Date + Required Finish */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Plan Finish Date
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={planFinish.date}
                  onChange={(e) => handleChange('plan_finish_datetime', combineDatetime(e.target.value, planFinish.time))}
                  className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="time"
                  value={planFinish.time}
                  onChange={(e) => handleChange('plan_finish_datetime', combineDatetime(planFinish.date, e.target.value))}
                  className="w-24 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Required Finish
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={reqFinish.date}
                  onChange={(e) => handleChange('req_finish_datetime', combineDatetime(e.target.value, reqFinish.time))}
                  className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="time"
                  value={reqFinish.time}
                  onChange={(e) => handleChange('req_finish_datetime', combineDatetime(reqFinish.date, e.target.value))}
                  className="w-24 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Row 3: Plan (Hrs) + Plan Manday (Hrs) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Plan (Hrs) 
              </label>
              <input
                type="text"
                value={formData.plan_hrs || ''}
                onChange={(e) => handleChange('plan_hrs', e.target.value)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Plan Manday (Hrs) 
              </label>
              <input
                type="text"
                value={formData.plan_manday || ''}
                onChange={(e) => handleChange('plan_manday', e.target.value)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Planning Information + Fault Report Information */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column: Planning Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            Planning Information
          </h2>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Department <span className="text-red-500">*</span>
            </label>
            <select 
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.dep_id || ''}
              onChange={(e) => handleChange('dep_id', e.target.value)}
            >
              <option value="">Please Select</option>
              {masters.departments.map(d => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Work Type 
              </label>
              <select 
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.worktype_id || ''}
                onChange={(e) => handleChange('worktype_id', e.target.value)}
              >
                <option value="">Please Select</option>
                {masters.workTypes.map(w => (
                  <option key={w.value} value={w.value}>{w.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Include Inspection 
              </label>
              <select 
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.include_inspection || 0}
                onChange={(e) => handleChange('include_inspection', Number(e.target.value))}
              >
                <option value={0}>NO</option>
                <option value={1}>YES</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Priority 
              </label>
              <select 
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.priority_id || ''}
                onChange={(e) => handleChange('priority_id', e.target.value)}
              >
                <option value="">Please Select</option>
                {masters.priorities.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Criticality 
              </label>
              <input
                type="text"
                value={formData.criticality || ''}
                onChange={(e) => handleChange('criticality', e.target.value)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Work Master <span className="text-red-500">*</span>
            </label>
            <select 
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.master_user_id || ''}
              onChange={(e) => handleChange('master_user_id', e.target.value)}
            >
              <option value="">Please Select</option>
              {masters.personnel.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Right Column: Fault Report Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            Fault Report Information
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Impact (IT) <span className="text-red-500">*</span>
              </label>
              <select 
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.impact_id || ''}
                onChange={(e) => handleChange('impact_id', e.target.value)}
              >
                <option value="">Please Select</option>
                {masters.impacts.map(i => (
                  <option key={i.value} value={i.value}>{i.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Error Symptom <span className="text-red-500">*</span>
              </label>
              <select 
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.symptom_id || ''}
                onChange={(e) => handleChange('symptom_id', e.target.value)}
              >
                <option value="">Please Select</option>
                {masters.symptoms.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Fault Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.faultdescription || ''}
              onChange={(e) => handleChange('faultdescription', e.target.value)}
              rows={3}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Breakdown 
              </label>
              <select 
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.job_breakdown || 0}
                onChange={(e) => handleChange('job_breakdown', Number(e.target.value))}
              >
                <option value={0}>NO</option>
                <option value={1}>YES</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Location No. <span className="text-red-500">*</span>
              </label>
              <select 
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.fault_location_id || ''}
                onChange={(e) => handleChange('fault_location_id', e.target.value)}
              >
                <option value="">Please Select</option>
                {masters.locations.map(l => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Bottom Row - Additional WO Info */}
      <div className="flex justify-between items-end pt-4 border-t-2">
        {/* Left Side: Form Fields */}
        <div className="grid grid-cols-4 gap-3 flex-1">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Ref No. 
            </label>
            <input
              type="text"
              value={workOrder.job_reference || ''}
              readOnly
              className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Main WO No. 
            </label>
            <select 
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.main_leader_user_id || ''}
              onChange={(e) => handleChange('main_leader_user_id', e.target.value)}
            >
              <option value="">Please Select</option>
              {masters.personnel.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Child WO No. 
            </label>
            <select 
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.child_worker_user_id || ''}
              onChange={(e) => handleChange('child_worker_user_id', e.target.value)}
            >
              <option value="">Please Select</option>
              {masters.personnel.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Work Order Group 
            </label>
            <select 
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.group_id || ''}
              onChange={(e) => handleChange('group_id', e.target.value)}
            >
              <option value="">Please Select</option>
              {masters.workOrderGroups.map(g => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}