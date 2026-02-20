// features/HistoricalWorkOrder/pages/HistoricalWorkOrderPage.tsx
import { useState, useEffect, useCallback } from 'react';
import { WorkOrder } from '@/features/HistoricalWorkOrder/types';
import HistoricalWorkOrderTable from '@/features/HistoricalWorkOrder/components/HistoricalWorkOrderTable';
import HistoricalWorkOrderModal from '@/features/HistoricalWorkOrder/components/modal/HistoricalWorkOrderModal';

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
  const [filters, setFilters] = useState({
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

  useEffect(() => { fetchList(); }, [fetchList]);

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setFilters({ workOrder: '', equipment: '', siteId: '', department: '' });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {[
            { key: 'workOrder',  label: 'Work Order No.',  placeholder: 'ค้นหา WO...' },
            { key: 'equipment',  label: 'Equipment',       placeholder: 'Equipment ID...' },
            { key: 'siteId',     label: 'Site ID',         placeholder: 'Site ID...' },
            { key: 'department', label: 'Department',      placeholder: 'Department...' },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
              <input
                type="text"
                value={filters[key as keyof typeof filters]}
                onChange={(e) => handleFilterChange(key as keyof typeof filters, e.target.value)}
                placeholder={placeholder}
                onKeyDown={(e) => e.key === 'Enter' && fetchList()}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={handleClear} className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors">Clear</button>
          <button onClick={fetchList}   className="px-4 py-2 text-sm bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors">Search</button>
        </div>
      </div>

      {/* Table */}
      <HistoricalWorkOrderTable
        workOrders={workOrders}
        isLoading={isLoading}
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