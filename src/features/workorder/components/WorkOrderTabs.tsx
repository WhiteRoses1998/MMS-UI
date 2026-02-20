// src/features/workorder/components/WorkOrderTabs.tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GeneralTab from "../tabs/GeneralTab";
import PrepareTab from "../tabs/PrepareTab";
import ActivityTab from "../tabs/ActivityTab";
import ReportTab from "../tabs/ReportTab";
import { WorkOrder, MasterData, Activity } from "../types"; // ปรับ path ตามที่คุณใช้จริง

interface WorkOrderTabsProps {
  workOrder: WorkOrder;
  masters: MasterData;
  activities: Activity[];
  defaultValue?: string;
  onUpdateGeneral?: (data: Partial<WorkOrder>) => void;
  onUpdatePrepare?: (data: any) => void;
  onAddActivity?: (activity: Partial<Activity>) => void;
  onDeleteActivity?: (activityId: number) => void;
  onRefreshActivities?: () => void;
  onUpdateReport?: (data: any) => void;
}

export default function WorkOrderTabs({
  workOrder,
  masters,
  activities,
  defaultValue = "general",
  onUpdateGeneral,
  onUpdatePrepare,
  onAddActivity,
  onDeleteActivity,
  onRefreshActivities,
  onUpdateReport,
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
        <GeneralTab workOrder={workOrder} masters={masters} onUpdate={onUpdateGeneral || (() => {})} />
      </TabsContent>

      <TabsContent value="prepare" className="mt-0">
        <PrepareTab workOrder={workOrder} masters={masters} onUpdate={onUpdatePrepare || (() => {})} />
      </TabsContent>

      <TabsContent value="activity" className="mt-0">
        <ActivityTab masters={masters} activities={activities} onAdd={onAddActivity || (() => {})} onDelete={onDeleteActivity || (() => {})} onRefresh={onRefreshActivities || (() => {})} />
      </TabsContent>

      <TabsContent value="report" className="mt-0">
        <ReportTab workOrder={workOrder} masters={masters} onUpdate={onUpdateReport || (() => {})} />
      </TabsContent>
    </Tabs>
  );
}