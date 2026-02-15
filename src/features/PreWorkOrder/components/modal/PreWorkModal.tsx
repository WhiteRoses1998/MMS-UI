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
    fault_type_id: null,
    priority_id: null,
    jobstatus_id: null,
    fault_code_id: null,
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
  });

  const [breakdown, setBreakdown] = useState("NO");
  const [fundId, setFundId] = useState("");
  const [fundName, setFundName] = useState(""); // ⭐ แสดงชื่อเต็ม
  const [fundCenterId, setFundCenterId] = useState("");
  const [fundCenterName, setFundCenterName] = useState(""); // ⭐ แสดงชื่อเต็ม
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

        const rawData = orderRes.data || {};

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
          fault_type_id: null,
          priority_id: rawData.priority_id || null,
          fault_code_id: null,
        });

        setBreakdown(rawData.breakdown === 1 ? "YES" : "NO");
        setFundId(rawData.fund_id || "");
        setFundName(rawData.fund_name || "");
        setFundCenterId(rawData.fund_id || "");
        setFundCenterName(rawData.fund_name || "");
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

  const handleOpenJob = async () => {
    if (!selectedStatus) {
      alert("กรุณาเลือกสถานะงานก่อนเปิดงาน");
      return;
    }

    try {
      const requiredStart = requiredStartDate && requiredStartTime
        ? `${requiredStartDate} ${requiredStartTime}:00`
        : null;
      
      const requiredFinish = requiredFinishDate && requiredFinishTime
        ? `${requiredFinishDate} ${requiredFinishTime}:00`
        : null;

      await updatePreWorkOrder(preWorkId, {
        ...data,
        jobstatus_id: Number(selectedStatus),
        fund_id: fundId || null,
        breakdown: breakdown,
        impact_id: impactId || null,
        error_symptom_id: errorSymptomId || null,
        required_start_datetime: requiredStart,
        required_finish_datetime: requiredFinish,
      });
      
      alert("เปิดงานสำเร็จ");
      setShowStatusModal(false);
      onClose();
      if (onRefresh) onRefresh();
    } catch (err: any) {
      alert(err.response?.data?.message || "เปิดงานล้มเหลว");
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString('th-TH', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const getCurrentTime = () => {
    return new Date().toTimeString().slice(0, 5);
  };

  const selectStyles = "w-full px-4 py-2.5 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all";
  const inputStyles = "w-full px-4 py-2.5 text-base border border-gray-300 rounded-md";
  const labelStyles = "block text-sm font-medium text-gray-700 mb-1.5";
  const displayTextStyles = "w-full px-3 py-2 text-sm bg-blue-50 border border-blue-200 rounded text-blue-900 font-medium truncate";

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-start overflow-y-auto">
      <div className="bg-white w-[95%] max-w-[1400px] mt-4 mb-4 rounded-md shadow-xl">
        {/* Header */}
        <div className="bg-teal-700 text-white px-6 py-4 rounded-t-md flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Fault Report</h2>
          <button
            onClick={onClose}
            className="hover:bg-teal-800 p-1 rounded transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Work Order Info - Top Row */}
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className={labelStyles}>Work Order</label>
              <input
                type="text"
                value={String(data.workorder_id || "")}
                disabled
                className={`${inputStyles} bg-gray-100 text-gray-700`}
              />
            </div>
            <div>
              <label className={labelStyles}>Ref No.</label>
              <input
                type="text"
                value={data.job_reference || ""}
                disabled
                className={`${inputStyles} bg-white`}
              />
            </div>
            <div>
              <label className={labelStyles}>WO Gen Date</label>
              <input
                type="text"
                value={data.creation_datetime ? formatDate(data.creation_datetime) : ""}
                disabled
                className={`${inputStyles} bg-gray-100 text-gray-700`}
              />
            </div>
            <div>
              <label className={labelStyles}>&nbsp;</label>
              <input
                type="text"
                value={getCurrentTime()}
                disabled
                className={`${inputStyles} bg-gray-100 text-gray-700`}
              />
            </div>
          </div>

          {/* Information about the Fault */}
          <div className="border border-gray-200 rounded-lg p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Information about the Fault</h3>

            {/* Row 1: Equipment, Equipment Description, Customer */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className={labelStyles}>Equipment</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={data.equipment_id || ""}
                    disabled
                    className={`${inputStyles} flex-1 bg-gray-100`}
                  />
                  <button className="bg-teal-700 text-white px-4 rounded-md hover:bg-teal-800 transition-colors">
                    ...
                  </button>
                </div>
              </div>
              <div>
                <label className={labelStyles}>Equipment Description</label>
                <input
                  type="text"
                  value={data.equipment || ""}
                  disabled
                  className={`${inputStyles} bg-gray-100`}
                />
              </div>
              <div>
                <label className={labelStyles}>Customer</label>
                <input
                  type="text"
                  value={data.customer_name || ""}
                  disabled
                  className={`${inputStyles} bg-gray-100`}
                />
              </div>
            </div>

            {/* Row 2: Fault Description, Breakdown, Location No */}
            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-7">
                <label className={labelStyles}>Fault Description</label>
                <textarea
                  value={data.detail_report || ""}
                  onChange={(e) => handleChange("detail_report", e.target.value)}
                  rows={4}
                  className={`${inputStyles} resize-none`}
                  placeholder="Enter detailed fault description..."
                />
              </div>
              <div className="col-span-5 space-y-4">
                <div>
                  <label className={labelStyles}>Breakdown</label>
                  <select
                    value={breakdown}
                    onChange={(e) => setBreakdown(e.target.value)}
                    className={selectStyles}
                  >
                    <option value="NO">NO</option>
                    <option value="YES">YES</option>
                  </select>
                </div>
                <div>
                  <label className={labelStyles}>Location No.</label>
                  <input
                    type="text"
                    value={data.location_name || data.location_id || ""}
                    disabled
                    className={`${inputStyles} bg-gray-100`}
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Fund Center + Fund + Required Start/Finish */}
            <div className="grid grid-cols-12 gap-4">
              {/* Fund Center - 3 columns */}
              <div className="col-span-3">
                <label className={labelStyles}>Fund Center</label>
                <select
                  value={fundCenterId}
                  onChange={(e) => {
                    setFundCenterId(e.target.value);
                    setFundId(e.target.value);
                    const selected = dropdowns.fundCenters?.find(f => f.value === e.target.value);
                    setFundCenterName(selected?.label || "");
                    setFundName(selected?.label || "");
                  }}
                  className={selectStyles}
                >
                  <option value="">Please Select</option>
                  {dropdowns.fundCenters?.map((fc) => (
                    <option key={fc.value} value={fc.value}>
                      {fc.value}
                    </option>
                  ))}
                </select>
                {/* ⭐ แสดงชื่อเต็ม */}
                {fundCenterName && (
                  <div className="mt-1">
                    <input
                      type="text"
                      value={fundCenterName}
                      disabled
                      className={displayTextStyles}
                      title={fundCenterName}
                    />
                  </div>
                )}
              </div>

              {/* Fund - 3 columns */}
              <div className="col-span-3">
                <label className={labelStyles}>Fund *</label>
                <select
                  value={fundId}
                  onChange={(e) => {
                    setFundId(e.target.value);
                    setFundCenterId(e.target.value);
                    const selected = dropdowns.funds?.find(f => f.value === e.target.value);
                    setFundName(selected?.label || "");
                    setFundCenterName(selected?.label || "");
                  }}
                  className={selectStyles}
                >
                  <option value="">Please Select</option>
                  {dropdowns.funds?.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.value}
                    </option>
                  ))}
                </select>
                {/* ⭐ แสดงชื่อเต็ม */}
                {fundName && (
                  <div className="mt-1">
                    <input
                      type="text"
                      value={fundName}
                      disabled
                      className={displayTextStyles}
                      title={fundName}
                    />
                  </div>
                )}
              </div>

              {/* Required Start - 3 columns */}
              <div className="col-span-3">
                <label className={labelStyles}>Required Start</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={requiredStartDate}
                    onChange={(e) => setRequiredStartDate(e.target.value)}
                    className="flex-1 px-3 py-2.5 text-base border border-gray-300 rounded-md"
                  />
                  <input
                    type="time"
                    value={requiredStartTime}
                    onChange={(e) => setRequiredStartTime(e.target.value)}
                    className="w-28 px-2 py-2.5 text-base border border-gray-300 rounded-md"
                  />
                </div>
                {/* ⭐ แสดงวันที่อ่านง่าย */}
                {requiredStartDate && (
                  <div className="mt-1">
                    <input
                      type="text"
                      value={`${formatDate(requiredStartDate)} ${requiredStartTime || ''}`}
                      disabled
                      className={displayTextStyles}
                    />
                  </div>
                )}
              </div>

              {/* Required Finish - 3 columns */}
              <div className="col-span-3">
                <label className={labelStyles}>Required Finish</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={requiredFinishDate}
                    onChange={(e) => setRequiredFinishDate(e.target.value)}
                    className="flex-1 px-3 py-2.5 text-base border border-gray-300 rounded-md"
                  />
                  <input
                    type="time"
                    value={requiredFinishTime}
                    onChange={(e) => setRequiredFinishTime(e.target.value)}
                    className="w-28 px-2 py-2.5 text-base border border-gray-300 rounded-md"
                  />
                </div>
                {/* ⭐ แสดงวันที่อ่านง่าย */}
                {requiredFinishDate && (
                  <div className="mt-1">
                    <input
                      type="text"
                      value={`${formatDate(requiredFinishDate)} ${requiredFinishTime || ''}`}
                      disabled
                      className={displayTextStyles}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mandatory */}
          <div className="border border-gray-200 rounded-lg p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Mandatory</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelStyles}>Report By</label>
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
                <label className={labelStyles}>Department</label>
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
          <div className="border border-gray-200 rounded-lg p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Fault Code</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelStyles}>Impact (IT)</label>
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
                <label className={labelStyles}>Error Symptom</label>
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
                <label className={labelStyles}>Priority</label>
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
        <div className="border-t px-6 py-4 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors font-medium"
          >
            Close
          </button>
          <button
            onClick={() => setShowStatusModal(true)}
            className="px-6 py-2.5 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition-colors font-medium shadow-sm"
          >
            Open Job
          </button>
        </div>

        {/* Status Selection Modal */}
        {showStatusModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
            <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
              <h3 className="text-lg font-bold mb-4 text-gray-800">
                เลือกสถานะงานสำหรับเปิดงาน
              </h3>
              <select
                className={`${selectStyles} mb-4`}
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
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                  onClick={() => setShowStatusModal(false)}
                >
                  ยกเลิก
                </button>
                <button
                  className="px-4 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition-colors shadow-sm"
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
