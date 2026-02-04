// src/pages/WorkOrderPage.tsx
import { ClipboardList } from 'lucide-react';

export default function WorkOrderPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)] bg-gray-50">
      <div className="text-center max-w-md mx-auto p-8">
        {/* Icon */}
        <div className="mb-6">
          <ClipboardList 
            size={64} 
            className="mx-auto text-teal-600 opacity-60" 
            strokeWidth={1.5}
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Work Order Management
        </h2>

        {/* Description */}
        <p className="text-gray-500 mb-8 leading-relaxed">
          กรุณาเลือกประเภทของ Work Order จากเมนูด้านซ้าย
          <br />
          เพื่อเริ่มต้นจัดการงาน
        </p>

        {/* Menu Options */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            เมนูที่สามารถเลือกได้:
          </h3>
          <ul className="space-y-3 text-left">
            <li className="flex items-start">
              <span className="text-teal-600 mr-2">•</span>
              <div>
                <div className="font-medium text-gray-700">Pre Work Order</div>
                <div className="text-xs text-gray-500">จัดการใบงานก่อนเริ่มงาน</div>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-teal-600 mr-2">•</span>
              <div>
                <div className="font-medium text-gray-700">Activity Work Order</div>
                <div className="text-xs text-gray-500">ติดตามงานที่กำลังดำเนินการ</div>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-teal-600 mr-2">•</span>
              <div>
                <div className="font-medium text-gray-700">Work Order Group</div>
                <div className="text-xs text-gray-500">จัดกลุ่มใบงาน</div>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-teal-600 mr-2">•</span>
              <div>
                <div className="font-medium text-gray-700">Historical Work Order</div>
                <div className="text-xs text-gray-500">ดูประวัติงานที่เสร็จแล้ว</div>
              </div>
            </li>
          </ul>
        </div>

        {/* Hint */}
        <p className="text-xs text-gray-400 mt-6">
          💡 Tip: คลิกที่ "Work Order" ในเมนูด้านซ้ายเพื่อดูรายการย่อย
        </p>
      </div>
    </div>
  );
}