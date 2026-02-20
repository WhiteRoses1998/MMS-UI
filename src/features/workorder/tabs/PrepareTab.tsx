// PrepareTab.tsx - Updated with API integration
import { WorkOrder, MasterData, PrepareData } from '@/features/WorkOrder/types';
import { useEffect, useState } from 'react';

interface Props {
  workOrder: WorkOrder;
  masters: MasterData;
  onUpdate: (data: PrepareData) => void;
}

export default function PrepareTab({ workOrder, masters, onUpdate }: Props) {
  const [formData, setFormData] = useState<PrepareData>({});
  const [updateTimeout, setUpdateTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load existing prepare data from workOrder
    setFormData({
      standard_jobs: workOrder.standard_jobs,
      work_des: workOrder.work_des,
      insp_note: workOrder.insp_note,
      pm_no: workOrder.pm_no,
      actions_id: workOrder.actions_id,
      pm_desc: workOrder.pm_desc,
      cuscode_id: workOrder.cuscode_id,
      systemtype_id: workOrder.systemtype_id,
      events_id: workOrder.events_id,
      issuetype_id: workOrder.issuetype_id,
      pending_id: workOrder.pending_id,
      em_workleader_id: workOrder.em_workleader_id,
      em_prepare_id: workOrder.em_prepare_id,
    });
  }, [workOrder]);

  const handleChange = (field: keyof PrepareData, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    
    // Clear previous timeout
    if (updateTimeout) {
      clearTimeout(updateTimeout);
    }
    
    // Debounce 1 วินาที
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

  return (
    <div className="space-y-6">
      {/* ส่วนบน: แบ่ง 2 กั่ง */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* กั่งซ้าย: Standard Job ID + View Detail + Work Description */}
        <div className="space-y-4">
          {/* Standard Job ID + View Detail */}
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Standard Job ID <span className="text-red-500">*</span>
              </label>
              <select 
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.standard_jobs || ''}
                onChange={(e) => handleChange('standard_jobs', e.target.value)}
              >
                <option value="">Please Select</option>
                {masters.standardJobs.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Work Description - ขนาด textbox เท่าตัวอื่น ๆ (ไม่กว้างเต็ม) */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Work Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={formData.work_des || ''}
              onChange={(e) => handleChange('work_des', e.target.value)}
              className="w-full max-w-2xl px-2 py-1.5 text-sm border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* ฝั่งขวา: Insp. Note (ขนาด textbox เท่าตัวอื่น ๆ) */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Insp. Note 
            </label>
            <textarea
              rows={3}
              value={formData.insp_note || ''}
              onChange={(e) => handleChange('insp_note', e.target.value)}
              className="w-full max-w-2xl px-2 py-1.5 text-sm border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* ส่วนล่าง: Preventive Maintenance Information (ซ้าย) + Prepare Codes (ขวา) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ซ้าย: Preventive Maintenance Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            Preventive Maintenance Information
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                PM No. 
              </label>
              <select 
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.pm_no || ''}
                onChange={(e) => handleChange('pm_no', e.target.value)}
              >
                <option value="">Please Select</option>
                {masters.pmList.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Insp. Note
              </label>
              <input
                type="text"
                readOnly
                className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Action ID 
              </label>
              <select 
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.actions_id || ''}
                onChange={(e) => handleChange('actions_id', e.target.value)}
              >
                <option value="">Please Select</option>
                {masters.actions.map(a => (
                  <option key={a.value} value={a.value}>{a.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Customer Code 
              </label>
              <select 
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.cuscode_id || ''}
                onChange={(e) => handleChange('cuscode_id', e.target.value)}
              >
                <option value="">Please Select</option>
                {masters.customerCodes.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              PM Desc 
            </label>
            <textarea
              rows={2}
              value={formData.pm_desc || ''}
              onChange={(e) => handleChange('pm_desc', e.target.value)}
              className="w-full max-w-2xl px-2 py-1.5 text-sm border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* ขวา: Prepare Codes */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            Prepare Codes
          </h2>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              System Type (IT) <span className="text-red-500">*</span>
            </label>
            <select 
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.systemtype_id || ''}
              onChange={(e) => handleChange('systemtype_id', e.target.value)}
            >
              <option value="">Please Select</option>
              {masters.systemTypes.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Events <span className="text-red-500">*</span>
            </label>
            <select 
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.events_id || ''}
              onChange={(e) => handleChange('events_id', e.target.value)}
            >
              <option value="">Please Select</option>
              {masters.events.map(e => (
                <option key={e.value} value={e.value}>{e.label}</option>
              ))}
            </select>
            <p className="text-red-500 text-xs mt-1">
              The selected event has occurred 0 time(s).
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Issue Type (IT) <span className="text-red-500">*</span>
            </label>
            <select 
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.issuetype_id || ''}
              onChange={(e) => handleChange('issuetype_id', e.target.value)}
            >
              <option value="">Please Select</option>
              {masters.issueTypes.map(i => (
                <option key={i.value} value={i.value}>{i.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Pending Reason <span className="text-red-500">*</span>
            </label>
            <select 
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.pending_id || ''}
              onChange={(e) => handleChange('pending_id', e.target.value)}
            >
              <option value="">Please Select</option>
              {masters.pendingReasons.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ส่วน Employee ID (กั่งซ้ายคนเดียว) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            Employee ID
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Work Leader Sign 
              </label>
              <select 
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.em_workleader_id || ''}
                onChange={(e) => handleChange('em_workleader_id', e.target.value)}
              >
                <option value="">Please Select</option>
                {masters.workLeaders.map(w => (
                  <option key={w.value} value={w.value}>{w.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Prepared By 
              </label>
              <select 
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.em_prepare_id || ''}
                onChange={(e) => handleChange('em_prepare_id', e.target.value)}
              >
                <option value="">Please Select</option>
                {masters.preparedBy.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* กั่งขวาเว้นว่าง */}
        <div></div>
      </div>
    </div>
  );
}