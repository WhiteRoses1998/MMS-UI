import { useState } from "react";
import WorkOrderTable from "@/features/WorkOrder/components/WorkOrderTable";
import SearchBox, {
  SearchFilters,
} from "@/components/common/SearchBox";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import WorkOrderHeader from "@/features/WorkOrder/components/WorkOrderHeader";
import WorkOrderTabs from "@/features/WorkOrder/components/WorkOrderTabs";

import { WorkOrder } from "@/features/WorkOrder/types";
import { X } from "lucide-react";
import { Button } from "@/components/ui";

/* ======================================================
   Mock data (ลบออกได้ ถ้าคุณดึงจาก API อยู่แล้ว)
====================================================== */
const mockHistoryWorkOrders: WorkOrder[] = [
  {
    id: "H-001",
    workOrder: "WO-H-001",
    equipment: "equipment1",
    siteId: "SITE-A",
    status: "Close Job",
    workType: "PM",
    department: "Maintenance",
    woGenDate: "2024-12-01",
    workOrderGroup: "Preventive",
  },
  {
    id: "H-002",
    workOrder: "WO-H-002",
    equipment: "equipment2",
    siteId: "SITE-B",
    status: "Close Job",
    workType: "CM",
    department: "Production",
    woGenDate: "2024-12-05",
    workOrderGroup: "Corrective",
  },
];

export default function HistoricalWorkOrderPage() {
  /* ===================== State ===================== */
  const [selectedWorkOrder, setSelectedWorkOrder] =
    useState<WorkOrder | null>(null);

  const [filters, setFilters] = useState<SearchFilters>({
    workOrder: "",
    equipment: "",
    siteId: "",
  });

  // ถ้าดึงจาก API ให้แทน mock ตัวนี้
  const [historyWorkOrders] = useState<WorkOrder[]>(
    mockHistoryWorkOrders
  );

  /* ===================== Handlers ===================== */
  const handleSelect = (order: WorkOrder) => {
    setSelectedWorkOrder(order);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedWorkOrder(null);
    }
  };

  /* ===================== Render ===================== */
  return (
    <div className="p-6 space-y-6">
      {/* ===== Search ===== */}
      <SearchBox
        onSearch={(f) => setFilters(f)}
        onClear={() =>
          setFilters({ workOrder: "", equipment: "", siteId: "" })
        }
      />

      {/* ===== Table ===== */}
      <WorkOrderTable
        data={historyWorkOrders}
        mode="history"
        filters={filters}
        onSelect={handleSelect}
      />

      {/* ===== Modal ===== */}
      <Dialog open={!!selectedWorkOrder} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-[98vw] h-[96vh] p-0 overflow-hidden rounded-none shadow-2xl border-0">
          {/* Header */}
          <DialogHeader className="px-8 py-4 bg-gray-700 text-white flex flex-row items-center justify-between">
            <DialogTitle className="text-xl font-medium tracking-tight">
              Historical Work Order
            </DialogTitle>
            <DialogClose asChild>
              <button className="p-1 rounded hover:bg-gray-600 transition-colors">
                <X size={24} className="text-white" />
              </button>
            </DialogClose>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-white">
            {selectedWorkOrder && (
              <>
                <WorkOrderHeader workOrder={selectedWorkOrder} />

                <div className="px-8 py-6">
                  <WorkOrderTabs
                    workOrder={selectedWorkOrder}
                    defaultValue="general"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 py-4 border-t bg-white flex justify-end">
            <Button
              variant="outline"
              onClick={() => setSelectedWorkOrder(null)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
