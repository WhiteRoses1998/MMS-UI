// features/HistoricalWorkOrder/pages/HistoricalWorkOrderPage.tsx
import { useState, useEffect, useCallback } from 'react';
import { WorkOrder } from '@/features/HistoricalWorkOrder/types';
import HistoricalWorkOrderTable from '@/features/HistoricalWorkOrder/components/HistoricalWorkOrderTable';
import HistoricalWorkOrderModal from '@/features/HistoricalWorkOrder/components/modal/HistoricalWorkOrderModal';
import SearchBox, { SearchFilters } from '@/components/common/SearchBox'; // ✅ ใช้ SearchBox เดียวกับ Activity

const API = '/api/historical-orders';

// ✅ helper — แนบ Authorization header ทุก request
const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export default function HistoricalWorkOrderPage() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [isLoading, setIsLoading]   = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    workOrder:  '',
    equipment:  '',
    siteId:     '',
    department: '',
  });

  const fetchList = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams(
        Object.fromEntries(Object.entries(filters).filter(([, v]) => v))
      );
      const res  = await fetch(`${API}/list?${params}`, { headers: authHeaders() });
      const json = await res.json();
      if (json.ok) setWorkOrders(json.data);
    } catch (err) {
      console.error('Failed to fetch historical work orders:', err);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // ✅ Auto-fetch ทุกครั้งที่ filters เปลี่ยน (เหมือน Activity)
  useEffect(() => { fetchList(); }, [fetchList]);

  return (
    <div className="p-6 space-y-6">

      {/* ✅ ใช้ SearchBox เดียวกับ Activity แทน inline filter */}
      <SearchBox
        onSearch={(f) => setFilters(f)}
        onClear={() => setFilters({ workOrder: '', equipment: '', siteId: '', department: '' })}
      />

      {/* Table */}
      <HistoricalWorkOrderTable
        workOrders={workOrders}
        isLoading={isLoading}
        filters={filters}
        onSelect={(wo) => setSelectedId(wo.workorder_id)}
      />

      {/* Modal */}
      <HistoricalWorkOrderModal
        open={selectedId !== null}
        workOrderId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}