// src/pages/HistoryWorkOrderPage.tsx
import React, { useState } from 'react';
import HistoryWorkOrderTable from '@/features/WorkOrder/HistoricalWorkOrder/components/HistoricalWorkOrderTable';
import HistoryWorkOrderModal from '@/features/WorkOrder/HistoricalWorkOrder/components/modal/WorkOrderDetailModal';
import { HistoricalWorkOrder } from '@/features/WorkOrder/HistoricalWorkOrder/components/HistoricalWorkOrderTable';

export default function HistoryWorkOrderPage() {
  const [selectedJob, setSelectedJob] = useState<HistoricalWorkOrder | null>(null);

  return (
    <div className="p-6">
      <HistoryWorkOrderTable onSelect={setSelectedJob} />

      {selectedJob && (
        <HistoryWorkOrderModal
          selectedJob={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
}