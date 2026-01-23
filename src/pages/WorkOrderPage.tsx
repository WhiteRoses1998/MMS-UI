import { useState } from "react";
import WorkOrderTable from "@/features/workorder/components/WorkOrderTable";
import WorkOrderHeader from "@/features/workorder/components/WorkOrderHeader";
import GeneralTab from "@/features/workorder/tabs/GeneralTab";
import PrepareTab from "@/features/workorder/tabs/PrepareTab";
import ActivityTab from "@/features/workorder/tabs/ActivityTab";
import ReportTab from "@/features/workorder/tabs/ReportTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkOrder } from "@/features/workorder/types";

export default function WorkOrderPage() {
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(
    null,
  );

  const handleAcceptJob = () => {
    console.log('Accept Job:', selectedWorkOrder?.id);
  };

  return (
    <div className="p-6 space-y-6">
      {/* ===== หน้าแรก: LIST ===== */}
      {!selectedWorkOrder && (
        <WorkOrderTable onSelect={(order) => setSelectedWorkOrder(order)} />
      )}

      {/* ===== เลือกงานแล้ว ===== */}
      {selectedWorkOrder && (
        <>
          <WorkOrderHeader
            workOrder={selectedWorkOrder}
            onBack={() => setSelectedWorkOrder(null)}
            onAcceptJob={handleAcceptJob}
          />

          <Tabs defaultValue="general">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="prepare">Prepare</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="report">Report</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <GeneralTab workOrder={selectedWorkOrder} />
            </TabsContent>
            <TabsContent value="prepare">
              <PrepareTab workOrder={selectedWorkOrder} />
            </TabsContent>
            <TabsContent value="activity">
              <ActivityTab workOrder={selectedWorkOrder} />
            </TabsContent>
            <TabsContent value="report">
              <ReportTab workOrder={selectedWorkOrder} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
