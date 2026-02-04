import { useState } from "react";
import PreWorkTable from "@/features/PreWorkOrder/components/PreWorkTable";
import PreWorkModal from "@/features/PreWorkOrder/components/modal/PreWorkModal";

export default function PreWorkOrderPage() {
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // รับ state จาก layout หรือ context

  return (
    <div style={{ padding: 20 }}>
      <PreWorkTable
        onSelect={(job) => setSelectedJob(job)}
        isSidebarOpen={isSidebarOpen}  // ส่ง sidebar state เข้าไป
      />

      {selectedJob && (
        <PreWorkModal
          preWorkId={selectedJob.id}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
}
