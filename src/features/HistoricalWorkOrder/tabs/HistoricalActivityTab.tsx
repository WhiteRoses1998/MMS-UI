// features/HistoricalWorkOrder/tabs/HistoricalActivityTab.tsx
// Layout เหมือน ActivityTab ของ Activity แต่ไม่มี form เพิ่ม, ไม่มีปุ่ม Add/Delete/Update
import { Activity } from '@/features/HistoricalWorkOrder/types';

interface Props { activities: Activity[]; }

export default function HistoricalActivityTab({ activities }: Props) {
  return (
    <div className="space-y-6">
      {/* แบนเนอร์แจ้ง View Only แทนที่ form เพิ่ม activity */}
      <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded px-4 py-3 text-sm text-amber-700">
        <span>🔒</span>
        <span>Work Order นี้ Completed แล้ว — ไม่สามารถเพิ่มหรือลบ Activity ได้</span>
      </div>

      {/* ตาราง — เหมือน ActivityTab */}
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activities.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-sm text-gray-500">
                  No matching records found
                </td>
              </tr>
            ) : (
              activities.map((activity, idx) => (
                <tr key={activity.activity_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{idx + 1}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{activity.activity || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{activity.employee_name || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{activity.tools_name || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{activity.craft_name || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{activity.datefrom_datetime || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{activity.dateto_datetime || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="px-4 py-3 flex justify-between items-center text-sm text-gray-500 bg-gray-50">
          <span>Showing 0 to {activities.length} of {activities.length} entries</span>
          <div className="flex gap-2">
            <button disabled className="px-3 py-1 border border-gray-300 rounded bg-gray-50 text-gray-400 cursor-not-allowed">Previous</button>
            <button disabled className="px-3 py-1 border border-gray-300 rounded bg-gray-50 text-gray-400 cursor-not-allowed">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}