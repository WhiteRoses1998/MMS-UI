// src/pages/WorkOrderPage.tsx
import { useState } from "react";
import WorkOrderTable from "@/features/workorder/components/WorkOrderTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import WorkOrderHeader from "@/features/workorder/components/WorkOrderHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GeneralTab from "@/features/workorder/tabs/GeneralTab";
import PrepareTab from "@/features/workorder/tabs/PrepareTab";
import ActivityTab from "@/features/workorder/tabs/ActivityTab";
import ReportTab from "@/features/workorder/tabs/ReportTab";
import { WorkOrder } from "@/features/workorder/types";
import { X } from "lucide-react";
import { Button } from "@/components/ui";

export default function WorkOrderPage() {
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(
    null,
  );

  const handleAcceptJob = () => {
    console.log("Accept Job for:", selectedWorkOrder?.id);
    // เรียก API หรือเปลี่ยน status ที่นี่
  };

  const handleSelect = (order: WorkOrder) => {
    setSelectedWorkOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedWorkOrder(null);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedWorkOrder(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <WorkOrderTable onSelect={handleSelect} />

      <Dialog open={!!selectedWorkOrder} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-[98vw] h-[96vh] p-0 overflow-hidden rounded-none shadow-2xl border-0">
          {/* Header */}
          <DialogHeader className="px-8 py-4 bg-teal-700 text-white flex flex-row items-center justify-between border-b-0">
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
            {/* ใช้ WorkOrderHeader component */}
            <WorkOrderHeader
              workOrder={selectedWorkOrder!}
              onAcceptJob={handleAcceptJob}
            />

            {/* Tabs Section */}
            <div className="px-8 py-6">
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="w-full grid grid-cols-8 bg-white border-b border-gray-300 p-0 h-auto rounded-none mb-6">
                  <TabsTrigger
                    value="general"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:text-teal-700 data-[state=active]:bg-teal-50 px-4 py-3 text-sm font-medium"
                  >
                    General
                  </TabsTrigger>
                  <TabsTrigger
                    value="prepare"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:text-teal-700 data-[state=active]:bg-teal-50 px-4 py-3 text-sm font-medium"
                  >
                    Prepare
                  </TabsTrigger>
                  <TabsTrigger
                    value="activity"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:text-teal-700 data-[state=active]:bg-teal-50 px-4 py-3 text-sm font-medium"
                  >
                    Activity
                  </TabsTrigger>
                  <TabsTrigger
                    value="report"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:text-teal-700 data-[state=active]:bg-teal-50 px-4 py-3 text-sm font-medium"
                  >
                    Report In
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="mt-0">
                  <GeneralTab workOrder={selectedWorkOrder!} />
                </TabsContent>

                <TabsContent value="prepare" className="mt-0">
                  <PrepareTab workOrder={selectedWorkOrder!} />
                </TabsContent>

                <TabsContent value="activity" className="mt-0">
                  <ActivityTab workOrder={selectedWorkOrder!} />
                </TabsContent>

                <TabsContent value="report" className="mt-0">
                  <ReportTab workOrder={selectedWorkOrder!} />
                </TabsContent>
              </Tabs>
            </div>
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
