import React, { useState } from "react";
import { WorkOrder } from "@/features/WorkOrder/types";

import GeneralTab from "@/features/WorkOrder/tabs/GeneralTab";
import ActivityTab from "@/features/WorkOrder/tabs/ActivityTab";
import PrepareTab from "@/features/WorkOrder/tabs/PrepareTab";
import ReportTab from "@/features/WorkOrder/tabs/ReportTab";

interface Props {
  open: boolean;
  workOrder: WorkOrder | null;
  onClose: () => void;
}

type TabKey = "general" | "activity" | "prepare" | "report";

export default function WorkOrderDetailModal({
  open,
  workOrder,
  onClose,
}: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("general");

  if (!open || !workOrder) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[95vw] max-w-6xl max-h-[90vh] rounded-lg shadow-lg flex flex-col">

        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">
              Work Order : {workOrder.workOrder}
            </h2>
            <p className="text-sm text-gray-500">
              Status: {workOrder.status}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* Tabs Header */}
        <div className="px-6 border-b flex gap-6 text-sm font-medium">
          <Tab label="General" active={activeTab === "general"} onClick={() => setActiveTab("general")} />
          <Tab label="Activity" active={activeTab === "activity"} onClick={() => setActiveTab("activity")} />
          <Tab label="Prepare" active={activeTab === "prepare"} onClick={() => setActiveTab("prepare")} />
          <Tab label="Report" active={activeTab === "report"} onClick={() => setActiveTab("report")} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === "general" && <GeneralTab workOrder={workOrder} />}
          {activeTab === "activity" && <ActivityTab workOrder={workOrder} />}
          {activeTab === "prepare" && <PrepareTab workOrder={workOrder} />}
          {activeTab === "report" && <ReportTab workOrder={workOrder} />}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Tab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`py-3 border-b-2 ${
        active
          ? "border-teal-600 text-teal-600"
          : "border-transparent text-gray-500 hover:text-gray-700"
      }`}
    >
      {label}
    </button>
  );
}
