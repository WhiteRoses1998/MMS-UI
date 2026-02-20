// features/HistoricalWorkOrder/components/HistoricalWorkOrderTabs.tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import HistoricalGeneralTab  from '@/features/HistoricalWorkOrder/tabs/HistoricalGeneralTab';
import HistoricalPrepareTab  from '@/features/HistoricalWorkOrder/tabs/HistoricalPrepareTab';
import HistoricalActivityTab from '@/features/HistoricalWorkOrder/tabs/HistoricalActivityTab';
import HistoricalReportTab   from '@/features/HistoricalWorkOrder/tabs/HistoricalReportTab';
import { WorkOrder, MasterData, Activity } from '@/features/HistoricalWorkOrder/types';

interface Props {
  workOrder: WorkOrder;
  masters: MasterData;
  activities: Activity[];
  defaultValue?: string;
}

export default function HistoricalWorkOrderTabs({ workOrder, masters, activities, defaultValue = 'general' }: Props) {
  const tabClass =
    'rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:text-teal-700 data-[state=active]:bg-teal-50 px-4 py-3 text-sm font-medium';

  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="w-full grid grid-cols-4 bg-white border-b border-gray-300 p-0 h-auto rounded-none mb-6">
        <TabsTrigger value="general"  className={tabClass}>General</TabsTrigger>
        <TabsTrigger value="prepare"  className={tabClass}>Prepare</TabsTrigger>
        <TabsTrigger value="activity" className={tabClass}>Activity</TabsTrigger>
        <TabsTrigger value="report"   className={tabClass}>Report In</TabsTrigger>
      </TabsList>

      <TabsContent value="general"  className="mt-0">
        <HistoricalGeneralTab  workOrder={workOrder} masters={masters} />
      </TabsContent>
      <TabsContent value="prepare"  className="mt-0">
        <HistoricalPrepareTab  workOrder={workOrder} masters={masters} />
      </TabsContent>
      <TabsContent value="activity" className="mt-0">
        <HistoricalActivityTab activities={activities} />
      </TabsContent>
      <TabsContent value="report"   className="mt-0">
        <HistoricalReportTab   workOrder={workOrder} masters={masters} />
      </TabsContent>
    </Tabs>
  );
}