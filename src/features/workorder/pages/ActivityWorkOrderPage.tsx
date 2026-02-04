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
const mockActiveWorkOrders: WorkOrder[] = [
  {
    id: '1',
    workOrder: "WO-001",
    equipment: "equipment1",
    siteId: "SITE-A",
    status: "Open",
    workType: "PM",
    department: "Maintenance",
  },
  {
    id: '2',
    workOrder: "WO-002",
    equipment: "equipment2",
    siteId: "SITE-B",
    status: "In Progress",
    workType: "CM",
    department: "Production",
  },
];

export default function ActiveWorkOrderPage() {
  /* ===================== State ===================== */
  const [selectedWorkOrder, setSelectedWorkOrder] =
    useState<WorkOrder | null>(null);

  const [filters, setFilters] = useState<SearchFilters>({
    workOrder: "",
    equipment: "",
    siteId: "",
  });

  // ถ้าคุณดึงจาก API ให้แทน mock ตัวนี้
  const [activeWorkOrders] = useState<WorkOrder[]>(
    mockActiveWorkOrders
  );

  /* ===================== Handlers ===================== */
  const handleSelect = (order: WorkOrder) => {
    setSelectedWorkOrder(order);
  };

  const handleAcceptJob = () => {
    console.log("Accept Job for:", selectedWorkOrder?.id);
  };

  const handleCloseModal = () => {
    setSelectedWorkOrder(null);
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
        data={activeWorkOrders}
        mode="active"
        filters={filters}
        onSelect={handleSelect}
      />

      {/* ===== Modal ===== */}
      <Dialog open={!!selectedWorkOrder} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-[98vw] h-[96vh] p-0 overflow-hidden rounded-none shadow-2xl border-0">
          {/* Header */}
          <DialogHeader className="px-8 py-4 bg-teal-700 text-white flex flex-row items-center justify-between">
            <DialogTitle className="text-xl font-medium tracking-tight">
              Prepare Separate Work Order
            </DialogTitle>
            <DialogClose asChild>
              <button className="p-1 rounded hover:bg-teal-600 transition-colors">
                <X size={24} className="text-white" />
              </button>
            </DialogClose>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-white">
            {selectedWorkOrder && (
              <>
                <WorkOrderHeader
                  workOrder={selectedWorkOrder}
                  onAcceptJob={handleAcceptJob}
                />

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
          <div className="px-8 py-4 border-t bg-white flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={handleCloseModal}
              className="px-6 py-2 border-teal-600 text-teal-600 hover:bg-teal-50"
            >
              Close
            </Button>
            <Button
              variant="default"
              className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white"
            >
              Save change
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
