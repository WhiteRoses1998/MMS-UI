// features/HistoricalWorkOrder/components/HistoricalWorkOrderModal.tsx
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { WorkOrder, MasterData, Activity } from '@/features/HistoricalWorkOrder/types';
import HistoricalWorkOrderHeader from '@/features/HistoricalWorkOrder/components/HistoricalWorkOrderHeader';
import HistoricalGeneralTab  from '@/features/HistoricalWorkOrder/tabs/HistoricalGeneralTab';
import HistoricalPrepareTab  from '@/features/HistoricalWorkOrder/tabs/HistoricalPrepareTab';
import HistoricalActivityTab from '@/features/HistoricalWorkOrder/tabs/HistoricalActivityTab';
import HistoricalReportTab   from '@/features/HistoricalWorkOrder/tabs/HistoricalReportTab';

const API_BASE_URL =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) ||
  'http://localhost:3000';

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

const defaultMasters: MasterData = {
  personnel: [], departments: [], locations: [], equipments: [],
  customers: [], testPoints: [], funds: [], workOrderGroups: [],
  jobStatuses: [], pmList: [], customerCodes: [], workTypes: [],
  priorities: [], impacts: [], symptoms: [], standardJobs: [],
  systemTypes: [], events: [], issueTypes: [], pendingReasons: [],
  actions: [], performActions: [], workLeaders: [], preparedBy: [],
  activityEmployees: [], activityCrafts: [], activityTools: [],
  errorClasses: [], errorTypes: [], errorCauses: [],
};

interface Props {
  open: boolean;
  workOrderId: number | null;
  onClose: () => void;
}

export default function HistoricalWorkOrderModal({ open, workOrderId, onClose }: Props) {
  const [workOrder, setWorkOrder]   = useState<WorkOrder | null>(null);
  const [masters, setMasters]       = useState<MasterData>(defaultMasters);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading]   = useState(false);
  const [error, setError]           = useState<string | null>(null);

  useEffect(() => {
    if (!open || !workOrderId) return;
    const fetchAll = async () => {
      setIsLoading(true); setError(null); setWorkOrder(null); setActivities([]);
      try {
        const [woRes, mastersRes, activitiesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/historical-orders/${workOrderId}`,            { headers: authHeaders() }),
          fetch(`${API_BASE_URL}/api/historical-orders/dropdowns`,                 { headers: authHeaders() }),
          fetch(`${API_BASE_URL}/api/historical-orders/${workOrderId}/activities`, { headers: authHeaders() }),
        ]);
        const [woJson, mastersJson, activitiesJson] = await Promise.all([
          woRes.json(), mastersRes.json(), activitiesRes.json(),
        ]);
        if (!woJson.ok) { setError(woJson.message || 'ไม่พบ Work Order นี้'); return; }
        setWorkOrder(woJson.data);
        if (mastersJson.ok) { const { ok, ...md } = mastersJson; setMasters(md as MasterData); }
        if (activitiesJson.ok) setActivities(activitiesJson.data);
      } catch (err) {
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูล'); console.error(err);
      } finally { setIsLoading(false); }
    };
    fetchAll();
  }, [open, workOrderId]);

  const tabClass =
    'rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:text-teal-700 data-[state=active]:bg-teal-50 px-4 py-3 text-sm font-medium';

  return (
    <Dialog open={open && !!workOrderId} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-[98vw] h-[96vh] p-0 overflow-hidden rounded-none shadow-2xl border-0">

        {/* ===== Header teal เหมือน Activity ===== */}
        <DialogHeader className="px-8 py-4 bg-teal-700 text-white flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-medium tracking-tight flex items-center gap-3">
            Historical Work Order
            <span className="text-sm font-normal bg-amber-400 text-amber-900 px-2 py-0.5 rounded">
              🔒 View Only
            </span>
          </DialogTitle>
          <DialogClose asChild>
            <button className="p-1 rounded hover:bg-teal-600 transition-colors">
              <X size={24} className="text-white" />
            </button>
          </DialogClose>
        </DialogHeader>

        {/* ===== Content ===== */}
        <div className="flex-1 overflow-y-auto bg-white">
          {isLoading && (
            <div className="flex items-center justify-center h-64 text-gray-500 text-sm">
              กำลังโหลดข้อมูล...
            </div>
          )}
          {!isLoading && error && (
            <div className="m-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{error}</div>
          )}
          {!isLoading && !error && workOrder && masters && (
            <>
              {/* Header info — layout เหมือน Activity แต่ไม่มีปุ่ม Change Status */}
              <HistoricalWorkOrderHeader workOrder={workOrder} />

              {/* Tabs — grid cols-8 เหมือน Activity */}
              <div className="px-8 py-6">
                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="w-full grid grid-cols-8 bg-white border-b border-gray-300 p-0 h-auto rounded-none mb-6">
                    <TabsTrigger value="general"  className={tabClass}>General</TabsTrigger>
                    <TabsTrigger value="prepare"  className={tabClass}>Prepare</TabsTrigger>
                    <TabsTrigger value="activity" className={tabClass}>Activity</TabsTrigger>
                    <TabsTrigger value="report"   className={tabClass}>Report In</TabsTrigger>
                  </TabsList>
                  <TabsContent value="general"  className="mt-0"><HistoricalGeneralTab  workOrder={workOrder} masters={masters} /></TabsContent>
                  <TabsContent value="prepare"  className="mt-0"><HistoricalPrepareTab  workOrder={workOrder} masters={masters} /></TabsContent>
                  <TabsContent value="activity" className="mt-0"><HistoricalActivityTab activities={activities} /></TabsContent>
                  <TabsContent value="report"   className="mt-0"><HistoricalReportTab   workOrder={workOrder} masters={masters} /></TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </div>

        {/* ===== Footer — เหมือน Activity แต่มีแค่ Close ===== */}
        <div className="px-8 py-4 border-t bg-white flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="px-6 py-2 border-teal-600 text-teal-600 hover:bg-teal-50">
            Close
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}