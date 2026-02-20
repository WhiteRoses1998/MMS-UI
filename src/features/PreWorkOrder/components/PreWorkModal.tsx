import { useEffect, useState } from "react";
import { X } from "lucide-react";

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
    priority_id: null,
    jobstatus_id: null,
    requester_id: "",
    equipment_id: "",
    customer_id: "",
  });

  const [dropdowns, setDropdowns] = useState<PreWorkDropdowns>({
    priorities: [],
    jobStatuses: [],
    faultTypes: [],
    faultCodes: [],
    personnel: [],
    departments: [],
    locations: [],
    impacts: [],
    symptoms: [],
    funds: [],
    fundCenters: [],
    equipments: [],
    customers: [],
    testPoints: [],
  });

  const [breakdown, setBreakdown] = useState("NO");
  const [fundId, setFundId] = useState("");
  const [equipmentName, setEquipmentName] = useState("");
  const [impactId, setImpactId] = useState("");
  const [errorSymptomId, setErrorSymptomId] = useState("");
  const [requiredStartDate, setRequiredStartDate] = useState("");
  const [requiredStartTime, setRequiredStartTime] = useState("");
  const [requiredFinishDate, setRequiredFinishDate] = useState("");
  const [requiredFinishTime, setRequiredFinishTime] = useState("");

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    if (!preWorkId) return;

    const fetchData = async () => {
      try {
        const orderRes = await getPreWorkOrder(preWorkId);
        const dropdownRes = await getPreWorkDropdowns();

        const rawData = orderRes.data.data || {};
        console.log('📦 Raw data from API:', rawData);

        setData({
          workorder_id: rawData.workorder_id,
          job_reference: rawData.job_reference || "",
          dep_id: rawData.dep_id || "",
          location_id: rawData.location_id || "",
          detail_report: rawData.detail_report || "",
          jobstatus_id: rawData.jobstatus_id || null,
          requester_id: rawData.requester_id || rawData.requester_user_id || "",
          equipment_id: rawData.equipment_id || "",
          customer_id: rawData.customer_id || "",
          equipment: rawData.equipment || "",
          customer_name: rawData.customer_name || "",
          location_name: rawData.location_name || "",
          priority_id: rawData.priority_id || null,
          creation_datetime: rawData.creation_datetime || "",
        });

        setBreakdown(rawData.breakdown === 1 ? "YES" : "NO");
        setFundId(rawData.fund_id || "");
        setEquipmentName(rawData.equipment || "");
        setImpactId(rawData.impact_id || "");
        setErrorSymptomId(rawData.error_symptom_id || "");

        if (rawData.required_start_datetime) {
          const startDate = new Date(rawData.required_start_datetime);
          setRequiredStartDate(startDate.toISOString().split('T')[0]);
          setRequiredStartTime(startDate.toTimeString().slice(0, 5));
        } else {
          const now = new Date();
          setRequiredStartDate(now.toISOString().split('T')[0]);
          setRequiredStartTime(now.toTimeString().slice(0, 5));
        }

        if (rawData.required_finish_datetime) {
          const finishDate = new Date(rawData.required_finish_datetime);
          setRequiredFinishDate(finishDate.toISOString().split('T')[0]);
          setRequiredFinishTime(finishDate.toTimeString().slice(0, 5));
        } else {
          const now = new Date();
          const finishDate = new Date(now);
          finishDate.setDate(finishDate.getDate() + 7);
          setRequiredFinishDate(finishDate.toISOString().split('T')[0]);
          setRequiredFinishTime(now.toTimeString().slice(0, 5));
        }

        console.log('📋 Dropdowns from API:', dropdownRes.data);
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
          funds: dropdownRes.data.funds || [],
          fundCenters: dropdownRes.data.fundCenters || [],
          equipments: dropdownRes.data.equipments || [],
          customers: dropdownRes.data.customers || [],
          testPoints: dropdownRes.data.testPoints || [],
        });
      } catch (err) {
        console.error("โหลดข้อมูลล้มเหลว", err);
        alert("ไม่สามารถโหลดข้อมูลได้\nกรุณาลองใหม่อีกครั้ง");
      }
    };

    fetchData();
  }, [preWorkId]);

  const handleChange = (key: string, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleEquipmentChange = (equipmentId: string) => {
    const selected = dropdowns.equipments?.find(eq => eq.value === equipmentId);
    handleChange("equipment_id", equipmentId);
    setEquipmentName(selected?.label || "");
  };

  // Helper แปลง database error ให้เป็นภาษาคนอ่าน
  const getFriendlyErrorMessage = (error: any): string => {
    const rawMessage = error?.response?.data?.message || error?.message || "";
    
    // Foreign key constraint errors
    if (rawMessage.includes("foreign key constraint fails")) {
      if (rawMessage.includes("location_id") || rawMessage.includes("locations")) {
        return "ไม่สามารถบันทึกได้\nกรุณาเลือก Location No. ที่ถูกต้อง";
      }
      if (rawMessage.includes("equipment_id") || rawMessage.includes("equipment")) {
        return "ไม่สามารถบันทึกได้\nกรุณาเลือก Equipment ที่ถูกต้อง";
      }
      if (rawMessage.includes("dep_id") || rawMessage.includes("department")) {
        return "ไม่สามารถบันทึกได้\nกรุณาเลือก Department ที่ถูกต้อง";
      }
      if (rawMessage.includes("fund_id") || rawMessage.includes("fund")) {
        return "ไม่สามารถบันทึกได้\nกรุณาเลือก Fund ที่ถูกต้อง";
      }
      if (rawMessage.includes("customer_id") || rawMessage.includes("customer")) {
        return "ไม่สามารถบันทึกได้\nกรุณาเลือก Customer ที่ถูกต้อง";
      }
      if (rawMessage.includes("requester_id") || rawMessage.includes("report_by")) {
        return "ไม่สามารถบันทึกได้\nกรุณาเลือก Report By ที่ถูกต้อง";
      }
      if (rawMessage.includes("impact_id") || rawMessage.includes("impact")) {
        return "ไม่สามารถบันทึกได้\nกรุณาเลือก Impact ที่ถูกต้อง";
      }
      if (rawMessage.includes("symptom_id") || rawMessage.includes("symptom")) {
        return "ไม่สามารถบันทึกได้\nกรุณาเลือก Error Symptom ที่ถูกต้อง";
      }
      if (rawMessage.includes("priority_id") || rawMessage.includes("priority")) {
        return "ไม่สามารถบันทึกได้\nกรุณาเลือก Priority ที่ถูกต้อง";
      }
      return "ไม่สามารถบันทึกได้\nกรุณาตรวจสอบข้อมูลที่กรอกให้ถูกต้อง";
    }

    // Duplicate entry
    if (rawMessage.includes("Duplicate entry")) {
      return "ข้อมูลซ้ำ\nกรุณาตรวจสอบข้อมูลที่กรอก";
    }

    // ข้อความภาษาไทยจาก backend ส่งต่อตรงๆ
    if (rawMessage.includes("กรุณา") || rawMessage.includes("ต้อง") || rawMessage.includes("ไม่สามารถ")) {
      return rawMessage;
    }

    // Generic error
    return "ดำเนินการล้มเหลว\nกรุณาลองใหม่อีกครั้งหรือติดต่อเจ้าหน้าที่";
  };

  const handleOpenJob = async () => {
    if (!selectedStatus) {
      alert("กรุณาเลือกสถานะงานก่อนเปิดงาน");
      return;
    }

    const statusNum = Number(selectedStatus);

    // status 9, 10 = ยกเลิก/แจ้งซ้ำ → update แล้วออกจากรายการทันที ไม่ต้องตรวจ validation อื่น
    const isCancelStatus = [9, 10].includes(statusNum);

    try {
      const requiredStart = requiredStartDate && requiredStartTime
        ? `${requiredStartDate} ${requiredStartTime}:00`
        : null;
      
      const requiredFinish = requiredFinishDate && requiredFinishTime
        ? `${requiredFinishDate} ${requiredFinishTime}:00`
        : null;

      const payload = {
        ...data,
        jobstatus_id: statusNum,
        fund_id: fundId || null,
        breakdown: breakdown,
        impact_id: impactId || null,
        error_symptom_id: errorSymptomId || null,
        required_start_datetime: requiredStart,
        required_finish_datetime: requiredFinish,
      };

      console.log('📤 Sending payload:', payload);

      const response = await updatePreWorkOrder(preWorkId, payload);
      
      console.log('✅ Response:', response.data);

      if (isCancelStatus) {
        alert(`ยกเลิกงานสำเร็จ`);
      } else {
        alert(`เปิดงานสำเร็จ!\nRef No: ${response.data.data?.job_reference || 'สร้างแล้ว'}`);
      }

      setShowStatusModal(false);
      onClose();
      if (onRefresh) onRefresh();
    } catch (err: any) {
      console.error('❌ Error opening job:', err);
      alert(getFriendlyErrorMessage(err));
    }
  };

  const formatDateTime = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear() + 543;
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // ✅ Filter statuses: แสดงเฉพาะที่ไม่ใช่ 1, 9, 10, 99
  const getValidStatuses = () => {
    return dropdowns.jobStatuses;
  };

  const inputStyles = "w-full px-3 py-2 text-sm border border-gray-300 rounded bg-gray-50";
  const selectStyles = "w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-teal-500";
  const labelStyles = "block text-xs font-medium text-gray-700 mb-1";
  const readonlyStyles = "w-full px-3 py-2 text-sm border border-gray-300 rounded bg-gray-100 text-gray-600";

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-start overflow-y-auto p-4">
      <div className="bg-white w-full max-w-[1400px] rounded-lg shadow-2xl my-4">
        {/* Header */}
        <div className="bg-teal-600 text-white px-5 py-3 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold">Edit Fault Report</h2>
          <button
            onClick={onClose}
            className="hover:bg-teal-700 p-1 rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Work Order, Ref No, WO Gen Date */}
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-3">
              <label className={labelStyles}>Work Order</label>
              <input
                type="text"
                value={data.workorder_id || ""}
                disabled
                className={readonlyStyles}
              />
            </div>
            <div className="col-span-3">
              <label className={labelStyles}>Ref No.</label>
              <input
                type="text"
                value={data.job_reference || ""}
                disabled
                className={readonlyStyles}
              />
            </div>
            <div className="col-span-4">
              <label className={labelStyles}>WO Gen Date</label>
              <input
                type="text"
                value={data.creation_datetime ? formatDateTime(data.creation_datetime) : ""}
                disabled
                className={readonlyStyles}
              />
            </div>
            <div className="col-span-2">
              <label className={labelStyles}>&nbsp;</label>
              <input
                type="text"
                value={data.creation_datetime ? new Date(data.creation_datetime).toTimeString().slice(0, 5) : ""}
                disabled
                className={readonlyStyles}
              />
            </div>
          </div>

          {/* Information about the Fault */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Information about the Fault</h3>
            
            {/* Equipment, Equipment Description, Customer */}
            <div className="grid grid-cols-12 gap-3 mb-3">
              <div className="col-span-3">
                <label className={labelStyles}>Equipment <span className="text-red-500">*</span></label>
                <select
                  value={data.equipment_id || ""}
                  onChange={(e) => handleEquipmentChange(e.target.value)}
                  className={selectStyles}
                >
                  <option value="">Please Select</option>
                  {dropdowns.equipments?.map((eq) => (
                    <option key={eq.value} value={eq.value}>
                      {eq.value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-5">
                <label className={labelStyles}>Equipment Description </label>
                <input
                  type="text"
                  value={equipmentName}
                  disabled
                  className={readonlyStyles}
                />
              </div>
              <div className="col-span-4">
                <label className={labelStyles}>Customer </label>
                <select
                  value={data.customer_id || ""}
                  onChange={(e) => handleChange("customer_id", e.target.value)}
                  className={selectStyles}
                >
                  <option value="">Please Select</option>
                  {dropdowns.customers?.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Fault Description & Breakdown */}
            <div className="grid grid-cols-12 gap-3 mb-3">
              <div className="col-span-9">
                <label className={labelStyles}>Fault Description <span className="text-red-500">*</span></label>
                <textarea
                  value={data.detail_report || ""}
                  onChange={(e) => handleChange("detail_report", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded resize-none"
                  placeholder="Enter detailed fault description..."
                />
              </div>
              <div className="col-span-3">
                <label className={labelStyles}>Breakdown </label>
                <select
                  value={breakdown}
                  onChange={(e) => setBreakdown(e.target.value)}
                  className={selectStyles}
                >
                  <option value="NO">NO</option>
                  <option value="YES">YES</option>
                </select>
                <label className={labelStyles + " mt-2"}>Location No. <span className="text-red-500">*</span></label>
                <select
                  value={data.location_id || ""}
                  onChange={(e) => handleChange("location_id", e.target.value)}
                  className={selectStyles}
                >
                  <option value="">Please Select</option>
                  {dropdowns.locations?.map((l) => (
                    <option key={l.value} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Fund Center (locked), Fund *, Required Start, Required Finish */}
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-3">
                <label className={labelStyles}>Fund Center </label>
                <input
                  type="text"
                  disabled
                  className={readonlyStyles}
                  placeholder="Locked"
                />
              </div>
              <div className="col-span-3">
                <label className={labelStyles}>Fund <span className="text-red-500">*</span></label>
                <select
                  value={fundId}
                  onChange={(e) => setFundId(e.target.value)}
                  className={selectStyles}
                >
                  <option value="">Please Select</option>
                  {dropdowns.funds?.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-3">
                <label className={labelStyles}>Required Start <span className="text-red-500">*</span></label>
                <div className="flex gap-1">
                  <input
                    type="date"
                    value={requiredStartDate}
                    onChange={(e) => setRequiredStartDate(e.target.value)}
                    className="flex-1 px-2 py-2 text-sm border border-gray-300 rounded"
                  />
                  <input
                    type="time"
                    value={requiredStartTime}
                    onChange={(e) => setRequiredStartTime(e.target.value)}
                    className="w-24 px-2 py-2 text-sm border border-gray-300 rounded"
                  />
                </div>
                {requiredStartDate && (
                  <div className="mt-1 px-2 py-1 text-xs bg-blue-50 border border-blue-200 rounded text-blue-800">
                    {formatDateTime(`${requiredStartDate} ${requiredStartTime || '00:00'}`)}
                  </div>
                )}
              </div>
              <div className="col-span-3">
                <label className={labelStyles}>Required Finish <span className="text-red-500">*</span></label>
                <div className="flex gap-1">
                  <input
                    type="date"
                    value={requiredFinishDate}
                    onChange={(e) => setRequiredFinishDate(e.target.value)}
                    className="flex-1 px-2 py-2 text-sm border border-gray-300 rounded"
                  />
                  <input
                    type="time"
                    value={requiredFinishTime}
                    onChange={(e) => setRequiredFinishTime(e.target.value)}
                    className="w-24 px-2 py-2 text-sm border border-gray-300 rounded"
                  />
                </div>
                {requiredFinishDate && (
                  <div className="mt-1 px-2 py-1 text-xs bg-blue-50 border border-blue-200 rounded text-blue-800">
                    {formatDateTime(`${requiredFinishDate} ${requiredFinishTime || '00:00'}`)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mandatory */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Mandatory</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelStyles}>Report By <span className="text-red-500">*</span></label>
                <select
                  value={data.requester_id || ""}
                  onChange={(e) => handleChange("requester_id", e.target.value)}
                  className={selectStyles}
                >
                  <option value="">Please Select</option>
                  {dropdowns.personnel.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelStyles}>Department <span className="text-red-500">*</span></label>
                <select
                  value={data.dep_id || ""}
                  onChange={(e) => handleChange("dep_id", e.target.value)}
                  className={selectStyles}
                >
                  <option value="">Please Select</option>
                  {dropdowns.departments.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Fault Code */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Fault Code</h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelStyles}>Impact (IT) <span className="text-red-500">*</span></label>
                <select
                  value={impactId}
                  onChange={(e) => setImpactId(e.target.value)}
                  className={selectStyles}
                >
                  <option value="">Please Select</option>
                  {dropdowns.impacts?.map((i) => (
                    <option key={i.value} value={i.value}>
                      {i.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelStyles}>Error Symptom <span className="text-red-500">*</span></label>
                <select
                  value={errorSymptomId}
                  onChange={(e) => setErrorSymptomId(e.target.value)}
                  className={selectStyles}
                >
                  <option value="">Please Select</option>
                  {dropdowns.symptoms?.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelStyles}>Priority <span className="text-red-500">*</span></label>
                <select
                  value={data.priority_id || ""}
                  onChange={(e) => handleChange("priority_id", e.target.value)}
                  className={selectStyles}
                >
                  <option value="">Please Select</option>
                  {dropdowns.priorities.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-5 py-3 bg-gray-50 rounded-b-lg flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors font-medium"
          >
            Close
          </button>
          <button
            onClick={() => setShowStatusModal(true)}
            className="px-5 py-2 text-sm bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors font-medium"
          >
            Open Job
          </button>
        </div>

        {/* Status Selection Modal */}
        {showStatusModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
            <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
              <h3 className="text-base font-bold mb-4 text-gray-800">
                เลือกสถานะงานสำหรับเปิดงาน
              </h3>
              {/* <p className="text-xs text-gray-500 mb-2">
                ⚠️ สถานะ 1, 9, 10, 99 ไม่สามารถใช้เปิดงานได้
              </p> */}
              <select
                className={`${selectStyles} mb-4`}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">-- เลือกสถานะ --</option>
                {getValidStatuses().map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                  onClick={() => setShowStatusModal(false)}
                >
                  ยกเลิก
                </button>
                <button
                  className="px-4 py-2 text-sm bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
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