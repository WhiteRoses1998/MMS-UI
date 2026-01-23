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
    <div className="bg-gray-50 p-4 space-y-3">

      {/* ===== BACK BUTTON (แสดงเฉพาะตอนมี onBack) ===== */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-teal-700 hover:underline"
        >
          <ArrowLeft size={14} />
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
              <label className="block text-[10px] font-semibold mb-1">
                Work Order
              </label>
              <input
                type="text"
                value={displayWoNumber}
                readOnly
                className="w-full px-2 py-1.5 border rounded bg-gray-100 text-[10px]"
              />
            </div>

            {/* Equipment */}
            <div className="w-48">
              <label className="block text-[10px] font-semibold mb-1">
                Equipment
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={equipmentId}
                  readOnly
                  className="flex-1 px-2 py-1.5 border rounded bg-gray-100 text-[10px]"
                />
                <button className="p-1.5 bg-teal-700 text-white rounded">
                  <MoreHorizontal size={12} />
                </button>
              </div>
            </div>

            {/* Historical WO */}
            <div className="pb-0.5">
              <div className="px-3 py-1.5 bg-teal-700 text-white rounded text-[10px]">
                Historical WO
              </div>
            </div>
          </div>

          {/* แถวล่าง */}
          <div className="flex gap-4">
            <div className="w-48">
              <label className="block text-[10px] font-semibold mb-1">
                Serial No.
              </label>
              <input
                type="text"
                value={serialNo}
                readOnly
                className="w-full px-2 py-1.5 border rounded bg-gray-100 text-[10px]"
              />
            </div>

            <div className="flex-1">
              <label className="block text-[10px] font-semibold mb-1">
                Equipment Description
              </label>
              <input
                type="text"
                value={displayDescription}
                readOnly
                className="w-full px-2 py-1.5 border rounded bg-gray-100 text-[10px]"
              />
            </div>

            <div className="flex-1">
              <label className="block text-[10px] font-semibold mb-1">
                Customer
              </label>
              <input
                type="text"
                value={customer}
                readOnly
                className="w-full px-2 py-1.5 border rounded bg-gray-100 text-[10px]"
              />
            </div>
          </div>
        </div>

        {/* ฝั่งขวา */}
        <div className="flex flex-col items-end justify-center gap-3 w-64">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Status :</span>
            <span className="text-sm font-semibold">{displayStatus}</span>
          </div>

          {onAcceptJob && (
            <button
              onClick={onAcceptJob}
              className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2 rounded text-sm"
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
