// ActivityTab.tsx - Updated with API integration
import { WorkOrder, MasterData, Activity } from '@/features/WorkOrder/types';
import { useState } from 'react';

interface Props {
  workOrder: WorkOrder;
  masters: MasterData;
  activities: Activity[];
  onAdd: (activity: Partial<Activity>) => void;
  onDelete: (activityId: number) => void;
  onRefresh: () => void;
}

export default function ActivityTab({ workOrder, masters, activities, onAdd, onDelete, onRefresh }: Props) {
  const [formData, setFormData] = useState<Partial<Activity>>({
    activity: '',
    employee_id: '',
    craft_id: '',
    tools_id: '',
    datefrom_datetime: '',
    dateto_datetime: '',
  });

  const handleChange = (field: keyof Activity, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleClear = () => {
    setFormData({
      activity: '',
      employee_id: '',
      craft_id: '',
      tools_id: '',
      datefrom_datetime: '',
      dateto_datetime: '',
    });
  };

  const handleAdd = () => {
    if (!formData.activity || !formData.datefrom_datetime || !formData.dateto_datetime) {
      alert('กรุณากรอก Activity และ Date From/To');
      return;
    }
    onAdd(formData);
    handleClear();
  };

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

  // Helper to combine date and time → ส่ง format YYYY-MM-DD HH:mm:ss ตรงๆ ให้ service
  const combineDatetime = (date: string, time: string) => {
    if (!date) return '';
    return `${date} ${time || '00:00'}:00`;
  };

  const dateFrom = formatDateTimeForInput(formData.datefrom_datetime);
  const dateTo = formatDateTimeForInput(formData.dateto_datetime);

  return (
    <div className="space-y-6">
      {/* ส่วนที่ 1: Activity + Employee + Craft */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Activity 
          </label>
          <input
            type="text"
            value={formData.activity || ''}
            onChange={(e) => handleChange('activity', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="กรอกกิจกรรม..."
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Employee 
          </label>
          <select 
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={formData.employee_id || ''}
            onChange={(e) => handleChange('employee_id', e.target.value)}
          >
            <option value="">-- เลือกพนักงาน --</option>
            {masters.activityEmployees.map(e => (
              <option key={e.value} value={e.value}>{e.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Craft 
          </label>
          <select 
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={formData.craft_id || ''}
            onChange={(e) => handleChange('craft_id', e.target.value)}
          >
            <option value="">-- เลือก Craft --</option>
            {masters.activityCrafts.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ส่วนที่ 2: Tools + Date From + Date To + ปุ่ม Clear & Add */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* Tools */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Tools 
          </label>
          <select 
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={formData.tools_id || ''}
            onChange={(e) => handleChange('tools_id', e.target.value)}
          >
            <option value="">-- เลือก --</option>
            {masters.activityTools.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* Date From */}
        <div className="md:col-span-4">
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Date From 
          </label>
          <div className="grid grid-cols-5 gap-2">
            <input
              type="date"
              value={dateFrom.date}
              onChange={(e) => handleChange('datefrom_datetime', combineDatetime(e.target.value, dateFrom.time))}
              className="col-span-3 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="time"
              step="900"
              value={dateFrom.time}
              onChange={(e) => handleChange('datefrom_datetime', combineDatetime(dateFrom.date, e.target.value))}
              className="col-span-2 px-2 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Date To */}
        <div className="md:col-span-4">
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Date To 
          </label>
          <div className="grid grid-cols-5 gap-2">
            <input
              type="date"
              value={dateTo.date}
              onChange={(e) => handleChange('dateto_datetime', combineDatetime(e.target.value, dateTo.time))}
              className="col-span-3 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="time"
              step="900"
              value={dateTo.time}
              onChange={(e) => handleChange('dateto_datetime', combineDatetime(dateTo.date, e.target.value))}
              className="col-span-2 px-2 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* ปุ่ม Clear + Add */}
        <div className="md:col-span-2 flex gap-3 justify-end md:justify-end">
          <button 
            onClick={handleClear}
            className="px-5 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          >
            Clear
          </button>
          <button 
            onClick={handleAdd}
            className="px-5 py-2 bg-teal-600 text-white text-sm font-medium rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* ปุ่ม Update all date */}
      <div className="flex justify-end">
        <button 
          onClick={onRefresh}
          className="px-6 py-2 bg-teal-700 text-white text-sm font-medium rounded hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
        >
          Update all date
        </button>
      </div>

      {/* ตารางผลลัพธ์ */}
      <div className="mt-6 overflow-x-auto border border-gray-200 rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Alert</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Activity</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Employee</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Tools</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Craft</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Plan Start</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Plan Finish</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activities.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-sm text-gray-500">
                  No matching records found
                </td>
              </tr>
            ) : (
              activities.map((activity, idx) => (
                <tr key={activity.activity_id}>
                  <td className="px-4 py-3 text-sm text-gray-900">{idx + 1}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{activity.activity || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{activity.employee_name || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{activity.tools_name || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{activity.craft_name || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{activity.datefrom_datetime || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{activity.dateto_datetime || '-'}</td>
                  <td className="px-4 py-3 text-sm">
                    <button 
                      onClick={() => onDelete(activity.activity_id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="px-4 py-3 flex justify-between items-center text-sm text-gray-500 bg-gray-50">
          <span>Showing 0 to {activities.length} of {activities.length} entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">Previous</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}