import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { WorkOrder, DropdownOption } from '../types';

interface WorkOrderHeaderProps {
  workOrder: WorkOrder;
  jobStatuses?: DropdownOption[];
  onBack?: () => void;
  onChangeStatus?: (newStatusId: number) => Promise<void>;
}

const EXCLUDED_STATUSES = [99];

const WorkOrderHeader: React.FC<WorkOrderHeaderProps> = ({
  workOrder,
  jobStatuses = [],
  onBack,
  onChangeStatus,
}) => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const formatWorkOrderId = (id: number): string => id.toString().padStart(6, '0');

  const validStatuses = jobStatuses.filter(
    (s) => !EXCLUDED_STATUSES.includes(Number(s.value))
  );

  const handleConfirmStatus = async () => {
    if (!selectedStatus) { alert('กรุณาเลือกสถานะก่อน'); return; }
    if (!onChangeStatus) return;
    try {
      setIsSaving(true);
      await onChangeStatus(Number(selectedStatus));
      setShowStatusModal(false);
      setSelectedStatus('');
    } catch (err) {
      // error จัดการที่ Page แล้ว
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseModal = () => {
    setShowStatusModal(false);
    setSelectedStatus('');
  };

  return (
    <>
      <div className="bg-gray-50 px-8 py-4">
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

          {/* ฝั่งขวา — Status + Change Status */}
          <div className="flex flex-col items-end justify-center gap-3 w-64">
            <div className="flex items-center gap-2 w-full justify-end">
              <span className="text-sm font-semibold text-gray-600">Status:</span>
              <span className="text-sm font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded border border-teal-200">
                {workOrder.status_name || workOrder.status || '-'}
              </span>
            </div>

            {onChangeStatus && (
              <button
                onClick={() => setShowStatusModal(true)}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
              >
                Change Status
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Change Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70]">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h3 className="text-base font-bold mb-2 text-gray-800">เปลี่ยนสถานะงาน</h3>
            <p className="text-xs text-gray-500 mb-1">
              Work Order: <span className="font-mono font-semibold">{formatWorkOrderId(workOrder.workorder_id)}</span>
            </p>
            {/* <p className="text-xs text-gray-400 mb-4">⚠️ สถานะ 1, 9, 10, 99 ไม่สามารถเลือกได้</p> */}

            <select
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              disabled={isSaving}
            >
              <option value="">-- เลือกสถานะ --</option>
              {validStatuses.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.value} - {s.label}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
                onClick={handleCloseModal}
                disabled={isSaving}
              >
                ยกเลิก
              </button>
              <button
                className="px-4 py-2 text-sm bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleConfirmStatus}
                disabled={isSaving || !selectedStatus}
              >
                {isSaving ? 'กำลังบันทึก...' : 'ยืนยัน'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkOrderHeader;