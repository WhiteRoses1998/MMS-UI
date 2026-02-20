// features/HistoricalWorkOrder/components/HistoricalWorkOrderHeader.tsx
// Layout เหมือน ActivityWorkOrderHeader ทุกจุด แต่ไม่มีปุ่ม Change Status
import React from 'react';
import { WorkOrder } from '@/features/HistoricalWorkOrder/types';

interface Props {
  workOrder: WorkOrder;
}

const HistoricalWorkOrderHeader: React.FC<Props> = ({ workOrder }) => {
  const formatWorkOrderId = (id: number): string => id.toString().padStart(6, '0');

  return (
    <div className="bg-gray-50 px-8 py-4">
      <div className="flex gap-8">

        {/* ฝั่งซ้าย — เหมือน Activity Header */}
        <div className="flex-1">
          {/* แถวบน */}
          <div className="flex items-end gap-4 mb-3">
            <div className="w-48">
              <label className="block text-xs font-bold text-gray-700 mb-1">Work Order</label>
              <input type="text" value={formatWorkOrderId(workOrder.workorder_id)} readOnly
                className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded font-mono" />
            </div>
            <div className="w-48">
              <label className="block text-xs font-bold text-gray-700 mb-1">Equipment</label>
              <input type="text" value={workOrder.equipment_id || '-'} readOnly
                className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded" />
            </div>
            <div className="w-48">
              <label className="block text-xs font-bold text-gray-700 mb-1">Ref No.</label>
              <input type="text" value={workOrder.job_reference || '-'} readOnly
                className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded font-mono" />
            </div>
          </div>

          {/* แถวล่าง */}
          <div className="flex gap-4">
            <div className="w-48">
              <label className="block text-xs font-bold text-gray-700 mb-1">Serial No.</label>
              <input type="text" value={workOrder.serial_no || '-'} readOnly
                className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-700 mb-1">Equipment Description</label>
              <input type="text" value={workOrder.equipment_name || workOrder.detail_report || '-'} readOnly
                className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-700 mb-1">Customer</label>
              <input type="text" value={workOrder.customer_name || workOrder.customer_id || '-'} readOnly
                className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded" />
            </div>
          </div>
        </div>

        {/* ฝั่งขวา — Status badge อย่างเดียว ไม่มีปุ่ม Change Status */}
        <div className="flex flex-col items-end justify-center gap-3 w-64">
          <div className="flex items-center gap-2 w-full justify-end">
            <span className="text-sm font-semibold text-gray-600">Status:</span>
            <span className="text-sm font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded border border-teal-200">
              {workOrder.status_name || workOrder.status || '-'}
            </span>
          </div>
          <div className="w-full text-center bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium px-4 py-2 rounded">
            🔒 Historical — View Only
          </div>
        </div>

      </div>
    </div>
  );
};

export default HistoricalWorkOrderHeader;