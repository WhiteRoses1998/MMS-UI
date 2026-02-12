import { useEffect, useState } from "react";

import PreWorkModalHeader from "@/features/PreWorkOrder/components/modal/PreWorkModalHeader";
import PreWorkModalFooter from "@/features/PreWorkOrder/components/modal/PreWorkModalFooter";
import PreWorkModalLayout from "@/features/PreWorkOrder/components/modal/PreWorkModalLayout";

import WorkOrderInfoSection from "@/features/PreWorkOrder/components/forms/WorkOrderInfoSection";
import FaultInfoSection from "@/features/PreWorkOrder/components/forms/FaultInfoSection";
import MandatorySection from "@/features/PreWorkOrder/components/forms/MandatorySection";
import FaultCodeSection from "@/features/PreWorkOrder/components/forms/FaultCodeSection";

import {
  getPreWorkOrder,
  getPreWorkDropdowns,
  updatePreWorkOrder,
} from "@/features/PreWorkOrder/api/preWorkOrder.api";

import { PreWorkOrder, PreWorkDropdowns } from "@/features/PreWorkOrder/types";

interface Props {
  preWorkId: string;
  onClose: () => void;
  onRefresh?: () => void;
}

export default function PreWorkModal({ preWorkId, onClose, onRefresh }: Props) {
  const [data, setData] = useState<PreWorkOrder>({
    workorder_id: undefined,
    job_reference: "",
    dep_id: "",
    location_id: "",
    detail_report: "",
    fault_type_id: null,
    priority_id: null,
    jobstatus_id: null,
    fault_code_id: null,
    requester_id: "",
  });

  const [dropdowns, setDropdowns] = useState<PreWorkDropdowns>({
    priorities: [],
    jobStatuses: [],
    faultTypes: [],
    faultCodes: [],
    personnel: [],
    departments: [],
    locations: [],
  });

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    if (!preWorkId) return;

    const fetchData = async () => {
      try {
        const orderRes = await getPreWorkOrder(preWorkId);
        const dropdownRes = await getPreWorkDropdowns();

        // ✅ แก้: ลบ .data ซ้อน
        const rawData = orderRes.data || {};

        // Mapping ข้อมูล
        setData({
          workorder_id: rawData.workorder_id,
          job_reference: rawData.job_reference || "",
          dep_id: rawData.dep_id || "",
          location_id: rawData.location_id || "",
          detail_report: rawData.detail_report || "",
          jobstatus_id: rawData.jobstatus_id || null,
          requester_id: rawData.requester_id || rawData.requester_user_id || "",
          equipment_id: rawData.equipment_id || null,
          customer_id: rawData.customer_id || null,
          fault_type_id: null,
          priority_id: null,
          fault_code_id: null,
        });

        // ✅ แก้: ใช้แบบง่ายสุด เพราะ backend ส่ง value/label มาแล้ว
        setDropdowns({
          priorities: dropdownRes.data.priorities || [],
          jobStatuses: dropdownRes.data.jobStatuses || [],
          faultTypes: dropdownRes.data.symptoms || [],
          faultCodes: dropdownRes.data.faultCodes || [],
          personnel: dropdownRes.data.personnel || [],
          departments: dropdownRes.data.departments || [],
          locations: dropdownRes.data.locations || [],
          impacts: dropdownRes.data.impacts || [],
          symptoms: dropdownRes.data.symptoms || [],
        });
      } catch (err) {
        console.error("โหลดข้อมูลล้มเหลว", err);
      }
    };

    fetchData();
  }, [preWorkId]);

  const handleChange = (key: string, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveDraft = async () => {
    try {
      await updatePreWorkOrder(preWorkId, {
        ...data,
        confirmOpen: false,
      });
      alert("บันทึกสำเร็จ");
      onClose();
      if (onRefresh) onRefresh();
    } catch (err: any) {
      alert(err.response?.data?.message || "บันทึกล้มเหลว");
    }
  };

  const handleOpenJob = async () => {
    if (!selectedStatus) {
      alert("กรุณาเลือกสถานะงานก่อนเปิดงาน");
      return;
    }

    try {
      await updatePreWorkOrder(preWorkId, {
        ...data,
        jobstatus_id: Number(selectedStatus),
        confirmOpen: true,
      });
      alert("เปิดงานสำเร็จ");
      onClose();
      if (onRefresh) onRefresh();
    } catch (err: any) {
      alert(err.response?.data?.message || "เปิดงานล้มเหลว");
    }

    setShowStatusModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-start">
      <div className="bg-white w-[95%] h-[95%] mt-4 rounded-md flex flex-col">
        <PreWorkModalHeader onClose={onClose} />

        <PreWorkModalLayout>
          <WorkOrderInfoSection
            data={data}
            onChange={handleChange}
            personnel={dropdowns.personnel}
            departments={dropdowns.departments}
            locations={dropdowns.locations}
          />

          <FaultInfoSection
            data={data}
            faultTypes={dropdowns.faultTypes}
            onChange={handleChange}
          />

          <MandatorySection
            data={data}
            priorities={dropdowns.priorities}
            jobStatuses={dropdowns.jobStatuses}
            onChange={handleChange}
          />

          <FaultCodeSection
            data={data}
            faultCodes={dropdowns.faultCodes}
            impacts={dropdowns.impacts}
            symptoms={dropdowns.symptoms}
            onChange={handleChange}
          />
        </PreWorkModalLayout>

        <PreWorkModalFooter
          onClose={onClose}
          onSave={handleSaveDraft}
          onOpenJob={() => setShowStatusModal(true)}
        />

        {showStatusModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
            <div className="bg-white p-6 rounded-md w-96">
              <h3 className="text-lg font-bold mb-4">
                เลือกสถานะงานสำหรับเปิดงาน
              </h3>
              <select
                className="input w-full mb-4"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">-- เลือกสถานะ --</option>
                {dropdowns.jobStatuses
                  .filter((s) => s.value !== "99")
                  .map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
              </select>
              <div className="flex justify-end gap-3">
                <button
                  className="border px-4 py-2 rounded"
                  onClick={() => setShowStatusModal(false)}
                >
                  ยกเลิก
                </button>
                <button
                  className="bg-teal-700 text-white px-4 py-2 rounded"
                  onClick={handleOpenJob}
                >
                  ยืนยันเปิดงาน
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}