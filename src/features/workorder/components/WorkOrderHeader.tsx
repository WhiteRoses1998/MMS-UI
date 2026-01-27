import React from 'react';
import { MoreHorizontal, ArrowLeft } from 'lucide-react';
import { WorkOrder } from '../types';

interface WorkOrderHeaderProps {
  /** ใช้ใน flow ใหม่ (เลือกจาก table) */
  workOrder?: WorkOrder;

  /** ใช้ย้อนกลับไปหน้า list */
  onBack?: () => void;

  /** ของเดิม (fallback / backward compatible) */
  woNumber?: string;
  serialNo?: string;
  equipmentId?: string;
  description?: string;
  customer?: string;
  status?: string;
  onAcceptJob?: () => void;
}

const WorkOrderHeader: React.FC<WorkOrderHeaderProps> = ({
  workOrder,
  onBack,

  // ===== fallback ค่าเดิม =====
  woNumber = '082453',
  serialNo = '',
  equipmentId = '999999921',
  description = 'งานสินค้าสมุทร (Dummy) แบบสัญญาณและข้อมูลที่รัน',
  customer = '',
  status = 'Assign Job',
  onAcceptJob,
}) => {
  /** ถ้ามี workOrder → ใช้ค่าจากนั้น */
  const displayWoNumber = workOrder?.id ?? woNumber;
  const displayDescription = workOrder?.description ?? description;
  const displayStatus = workOrder?.status ?? status;

  return (
    <div className="bg-gray-50 px-8 py-4">

      {/* ===== BACK BUTTON (แสดงเฉพาะตอนมี onBack) ===== */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-teal-600 hover:underline mb-3"
        >
          <ArrowLeft size={16} />
          Back to Work Order List
        </button>
      )}

      <div className="flex gap-8">
        {/* ฝั่งซ้าย */}
        <div className="flex-1">
          {/* แถวบน */}
          <div className="flex items-end gap-4 mb-3">
            {/* Work Order */}
            <div className="w-48">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Work Order
              </label>
              <input
                type="text"
                value={displayWoNumber}
                readOnly
                className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Equipment */}
            <div className="w-48">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Equipment
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={equipmentId}
                  readOnly
                  className="flex-1 px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Historical WO */}
            <div className="pb-0.5">
              <button className="px-3 py-1.5 bg-teal-600 text-white rounded text-sm font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                Historical WO
              </button>
            </div>
          </div>

          {/* แถวล่าง */}
          <div className="flex gap-4">
            <div className="w-48">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Serial No.
              </label>
              <input
                type="text"
                value={serialNo}
                readOnly
                className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Equipment Description
              </label>
              <input
                type="text"
                value={displayDescription}
                readOnly
                className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Customer
              </label>
              <input
                type="text"
                value={customer}
                readOnly
                className="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>

        {/* ฝั่งขวา */}
        <div className="flex flex-col items-end justify-center gap-3 w-64">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-800">Status:</span>
            <span className="text-sm font-semibold text-gray-800">{displayStatus}</span>
          </div>

          {onAcceptJob && (
            <button
              onClick={onAcceptJob}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Accept Job
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkOrderHeader;