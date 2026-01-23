import { useState } from "react";
import PreWorkTable from "@/features/prework/components/PreWorkTable";
import PreWorkModal from "@/features/prework/components/modal/PreWorkModal";

export default function PreWorkOrderPage() {
  const [selectedJob, setSelectedJob] = useState<any | null>(null);

  return (
    <div style={{ padding: 20 }}>
      {/* ✅ หน้าแรก ต้อง render ตลอด */}
      <h2>PreWork Order</h2>

      <PreWorkTable
        onSelect={(job) => {
          console.log("SELECT JOB", job);
          setSelectedJob(job);
        }}
      />

      {/* ✅ modal เป็น overlay */}
      {selectedJob && (
        <PreWorkModal
          preWorkId={selectedJob.id}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
}
