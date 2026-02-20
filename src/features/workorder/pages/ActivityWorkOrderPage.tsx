// ActivityWorkOrderPage.tsx - Updated with full API integration
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import WorkOrderTable from "@/features/WorkOrder/components/ActivityWorkOrderTable";
import SearchBox, { SearchFilters } from "@/components/common/SearchBox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import WorkOrderHeader from "@/features/WorkOrder/components/ActivityWorkOrderHeader";
import GeneralTab from "@/features/WorkOrder/tabs/GeneralTab";
import ActivityTab from "@/features/WorkOrder/tabs/ActivityTab";
import PrepareTab from "@/features/WorkOrder/tabs/PrepareTab";
import ReportTab from "@/features/WorkOrder/tabs/ReportTab";
import { WorkOrder, MasterData, Activity, PrepareData, ReportData } from "@/features/WorkOrder/types";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const AUTO_REFRESH_INTERVAL = 30_000; // 30 วินาที

// ===== Toast แทน alert =====
type ToastType = 'success' | 'error';
interface Toast { id: number; message: string; type: ToastType; }

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: number) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-medium pointer-events-auto
          ${t.type === 'success' ? 'bg-teal-600 text-white' : 'bg-red-500 text-white'}`}>
          {t.type === 'success' ? <CheckCircle size={16} className="shrink-0" /> : <AlertCircle size={16} className="shrink-0" />}
          <span>{t.message}</span>
          <button onClick={() => onRemove(t.id)} className="ml-2 opacity-70 hover:opacity-100">✕</button>
        </div>
      ))}
    </div>
  );
}

export default function ActiveWorkOrderPage() {
  /* ===================== State ===================== */
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    workOrder: "",
    equipment: "",
    siteId: "",
    department: "", // ✅ เพิ่ม department
  });
  const [activeWorkOrders, setActiveWorkOrders] = useState<WorkOrder[]>([]);
  const [masters, setMasters] = useState<MasterData | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // refs สำหรับ auto refresh
  const tableIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const modalIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // เก็บ id ของ work order ที่เปิดอยู่ เพื่อให้ interval ใช้ได้โดยไม่ต้องผ่าน closure เก่า
  const openWorkOrderIdRef = useRef<string | null>(null);
  const toastIdRef = useRef(0);
  const isFormDirtyRef = useRef(false);

  useEffect(() => { isFormDirtyRef.current = isFormDirty; }, [isFormDirty]);

  /* ===================== Toast Helpers ===================== */
  const showToast = useCallback((message: string, type: ToastType = 'success', duration = 3000) => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /* ===================== Fetch Data ===================== */
  
  // Fetch active work orders list
  const fetchActiveWorkOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/activity-orders/list`, {
        params: filters,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.ok) {
        setActiveWorkOrders(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching active work orders:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch master data (dropdowns)
  const fetchMasters = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/activity-orders/dropdowns`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.ok) {
        const { ok, ...mastersData } = response.data;
        setMasters(mastersData as MasterData);
      }
    } catch (error) {
      console.error('Error fetching masters:', error);
    }
  };

  // Fetch work order details
  const fetchWorkOrderDetails = async (id: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/activity-orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.ok) {
        setSelectedWorkOrder(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching work order details:', error);
    }
  };

  // Fetch activities
  const fetchActivities = async (workorderId: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/activity-orders/${workorderId}/activities`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.ok) {
        setActivities(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  /* ===================== Effects ===================== */
  
  useEffect(() => {
    fetchMasters();
  }, []);

  // Auto refetch table ทุก 30 วินาที
  useEffect(() => {
    tableIntervalRef.current = setInterval(() => {
      console.log("🔄 Auto refresh activity table...");
      fetchActiveWorkOrders();
    }, AUTO_REFRESH_INTERVAL);

    return () => {
      if (tableIntervalRef.current) clearInterval(tableIntervalRef.current);
    };
  }, [filters]); // reset interval เมื่อ filters เปลี่ยน

  useEffect(() => {
    fetchActiveWorkOrders();
  }, [filters]);

  // Auto refetch modal ทุก 30 วินาที เมื่อเปิด modal อยู่
  useEffect(() => {
    if (selectedWorkOrder?.workorder_id !== undefined) {
      const id = selectedWorkOrder.workorder_id.toString();
      openWorkOrderIdRef.current = id;
      fetchActivities(id);

      // start modal interval
      modalIntervalRef.current = setInterval(() => {
        if (openWorkOrderIdRef.current) {
          if (isFormDirtyRef.current) return; // skip ถ้า user กำลัง edit
          console.log("🔄 Auto refresh modal...");
          fetchWorkOrderDetails(openWorkOrderIdRef.current);
          fetchActivities(openWorkOrderIdRef.current);
        }
      }, AUTO_REFRESH_INTERVAL);
    } else {
      openWorkOrderIdRef.current = null;
    }

    return () => {
      if (modalIntervalRef.current) clearInterval(modalIntervalRef.current);
    };
  }, [selectedWorkOrder?.workorder_id]);

  /* ===================== Handlers ===================== */

  // helper refetch modal (detail + activities) ทันที
  const refreshModal = useCallback(async (id: string) => {
    await Promise.all([
      fetchWorkOrderDetails(id),
      fetchActivities(id),
    ]);
  }, []);

  const handleSelect = async (order: WorkOrder) => {
    await fetchWorkOrderDetails(order.workorder_id.toString());
  };

  const handleCloseModal = () => {
    setSelectedWorkOrder(null);
    setActivities([]);
    setIsFormDirty(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) handleCloseModal();
  };

  // Update General Tab — refetch modal ทันที
  const handleUpdateGeneral = async (data: Partial<WorkOrder>) => {
    if (!selectedWorkOrder) return;
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/activity-orders/${selectedWorkOrder.workorder_id}`,
        data,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      if (response.data.ok) {
        setIsFormDirty(false);
        await refreshModal(selectedWorkOrder.workorder_id.toString());
        fetchActiveWorkOrders(); // refresh table ด้วย (ไม่ต้อง await)
        showToast('บันทึก General สำเร็จ');
      }
    } catch (error) {
      console.error('Error updating work order:', error);
      showToast('ไม่สามารถบันทึกข้อมูลได้', 'error');
    }
  };

  // Update Prepare Tab — refetch modal ทันที
  const handleUpdatePrepare = async (data: PrepareData) => {
    if (!selectedWorkOrder) return;
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/activity-orders/${selectedWorkOrder.workorder_id}/preparations`,
        data,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      if (response.data.ok) {
        setIsFormDirty(false);
        await refreshModal(selectedWorkOrder.workorder_id.toString());
        showToast('บันทึก Prepare สำเร็จ');
      }
    } catch (error) {
      console.error('Error updating preparations:', error);
      showToast('ไม่สามารถบันทึก Preparations ได้', 'error');
    }
  };

  // Add Activity — refetch activities ทันที
  const handleAddActivity = async (activity: Partial<Activity>) => {
    if (!selectedWorkOrder) return;
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/activity-orders/${selectedWorkOrder.workorder_id}/activities`,
        activity,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      if (response.data.ok) {
        showToast('เพิ่ม Activity สำเร็จ');
        await fetchActivities(selectedWorkOrder.workorder_id.toString());
      }
    } catch (error) {
      console.error('Error adding activity:', error);
      showToast('ไม่สามารถเพิ่ม Activity ได้', 'error');
    }
  };

  // Delete Activity — refetch activities ทันที
  const handleDeleteActivity = async (activityId: number) => {
    if (!selectedWorkOrder) return;
    if (!confirm('ต้องการลบ Activity นี้?')) return;
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/activity-orders/${selectedWorkOrder.workorder_id}/activities/${activityId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      if (response.data.ok) {
        showToast('ลบ Activity สำเร็จ');
        await fetchActivities(selectedWorkOrder.workorder_id.toString());
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
      showToast('ไม่สามารถลบ Activity ได้', 'error');
    }
  };

    // Update Report — refetch modal ทันที
    const handleUpdateReport = async (data: ReportData) => {
      if (!selectedWorkOrder) return;
      try {
        const response = await axios.put(
          `${API_BASE_URL}/api/activity-orders/${selectedWorkOrder.workorder_id}/report`,
          data,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        if (response.data.ok) {
          setIsFormDirty(false);
          await refreshModal(selectedWorkOrder.workorder_id.toString());
          showToast('บันทึก Report สำเร็จ');
        }
      } catch (error: any) {
        const msg = error?.response?.data?.message || error?.message || 'ไม่สามารถบันทึก Report ได้';
        console.error('Error updating report:', error);
        showToast(msg, 'error');
      }
    };

  const handleSaveAll = async () => {
    try {
      await fetchActiveWorkOrders(); // refresh table
      handleCloseModal();            // ปิด modal
    } catch (error) {
      showToast('เกิดข้อผิดพลาดในการบันทึกข้อมูล', 'error');
    }
  };

  // Change Job Status
  const handleChangeStatus = async (newStatusId: number) => {
    if (!selectedWorkOrder) return;

    const isCancelStatus = [9, 10].includes(newStatusId);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/activity-orders/${selectedWorkOrder.workorder_id}/status`,
        { jobstatus_id: newStatusId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      if (response.data.ok) {
        if (isCancelStatus) {
          showToast('ยกเลิกงานสำเร็จ');
          handleCloseModal();
        } else {
          showToast('เปลี่ยนสถานะงานสำเร็จ');
          await fetchWorkOrderDetails(selectedWorkOrder.workorder_id.toString());
        }
        await fetchActiveWorkOrders();
      }
    } catch (error: any) {
      console.error('Error changing status:', error);
      showToast(error?.response?.data?.message || 'ไม่สามารถเปลี่ยนสถานะงานได้', 'error');
      throw error;
    }
  };

  /* ===================== Render ===================== */
  return (
    <div className="p-6 space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* ===== Search ===== */}
      <SearchBox
        onSearch={(f) => setFilters(f)}
        onClear={() => setFilters({ workOrder: "", equipment: "", siteId: "", department: "" })} // ✅ เพิ่ม department
      />

      {/* ===== Table ===== */}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <WorkOrderTable
          data={activeWorkOrders}
          mode="active"
          filters={filters}
          onSelect={handleSelect}
        />
      )}

      {/* ===== Modal ===== */}
      <Dialog open={!!selectedWorkOrder && !!masters} onOpenChange={handleOpenChange}>
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
            {selectedWorkOrder && masters && (
              <>
                <WorkOrderHeader
                  workOrder={selectedWorkOrder}
                  jobStatuses={masters.jobStatuses}
                  onChangeStatus={handleChangeStatus}
                />

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
                      <GeneralTab
                        workOrder={selectedWorkOrder}
                        masters={masters}
                        onUpdate={handleUpdateGeneral}
                      />
                    </TabsContent>

                    <TabsContent value="prepare" className="mt-0">
                      <PrepareTab
                        workOrder={selectedWorkOrder}
                        masters={masters}
                        onUpdate={handleUpdatePrepare}
                      />
                    </TabsContent>

                    <TabsContent value="activity" className="mt-0">
                      <ActivityTab
                        workOrder={selectedWorkOrder}
                        masters={masters}
                        activities={activities}
                        onAdd={handleAddActivity}
                        onDelete={handleDeleteActivity}
                        onRefresh={() => fetchActivities(selectedWorkOrder.workorder_id!.toString())}
                      />
                    </TabsContent>

                    <TabsContent value="report" className="mt-0">
                      <ReportTab
                        workOrder={selectedWorkOrder}
                        masters={masters}
                        onUpdate={handleUpdateReport}
                        onDirtyChange={setIsFormDirty}
                      />
                    </TabsContent>
                  </Tabs>
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
              onClick={handleSaveAll}
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