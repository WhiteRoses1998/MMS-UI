// src/features/workorder/components/WorkOrderTabs.tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GeneralTab from "../tabs/GeneralTab";
import PrepareTab from "../tabs/PrepareTab";
import ActivityTab from "../tabs/ActivityTab";
import ReportTab from "../tabs/ReportTab";
import { WorkOrder } from "../types"; // ปรับ path ตามที่คุณใช้จริง

interface WorkOrderTabsProps {
  workOrder: WorkOrder;
  defaultValue?: string;
}

export default function WorkOrderTabs({
  workOrder,
  defaultValue = "general",
}: WorkOrderTabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
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
        <GeneralTab workOrder={workOrder} />
      </TabsContent>

      <TabsContent value="prepare" className="mt-0">
        <PrepareTab workOrder={workOrder} />
      </TabsContent>

      <TabsContent value="activity" className="mt-0">
        <ActivityTab workOrder={workOrder} />
      </TabsContent>

      <TabsContent value="report" className="mt-0">
        <ReportTab workOrder={workOrder} />
      </TabsContent>
    </Tabs>
  );
}