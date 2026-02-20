import { useState, useCallback, useEffect, useRef } from "react";
import SearchBox, { SearchFilters } from "@/components/common/SearchBox";
import PreWorkTable from "@/features/PreWorkOrder/components/PreWorkTable";
import PreWorkModal from "@/features/PreWorkOrder/components/PreWorkModal";

const AUTO_REFRESH_INTERVAL = 30_000; // 30 วินาที

export default function PreWorkOrderPage() {
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>({
    workOrder: "",
    equipment: "",
    siteId: "",
    department: "",
  });
  const [triggerRefresh, setTriggerRefresh] = useState(0);

  // ใช้ ref เก็บ interval id เพื่อ cleanup
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ฟังก์ชัน refresh กลาง — ใช้ร่วมกันทั้ง manual และ auto
  const triggerRefreshAll = useCallback(() => {
    setTriggerRefresh((prev) => prev + 1);
  }, []);

  // Auto refetch table ทุก 30 วินาที
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      console.log("🔄 Auto refresh prework table...");
      triggerRefreshAll();
    }, AUTO_REFRESH_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [triggerRefreshAll]);

  // Refresh หลังบันทึกสำเร็จ
  const handleRefreshData = useCallback(() => {
    console.log("✅ บันทึกสำเร็จ - refresh ทันที");
    triggerRefreshAll();
  }, [triggerRefreshAll]);

  // จัดการการค้นหา
  const handleSearch = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
    triggerRefreshAll();
  }, [triggerRefreshAll]);

  // จัดการการ clear
  const handleClear = useCallback(() => {
    setFilters({ workOrder: "", equipment: "", siteId: "", department: "" });
    triggerRefreshAll();
  }, [triggerRefreshAll]);

  return (
    <div style={{ padding: 20 }}>

      {/* SearchBox ที่ parent */}
      <div style={{ marginBottom: "24px" }}>
        <SearchBox onSearch={handleSearch} onClear={handleClear} />
      </div>

      <PreWorkTable
        filters={filters}
        onSelect={(job) => setSelectedJob(job)}
        isSidebarOpen={isSidebarOpen}
        triggerRefresh={triggerRefresh}
      />

      {selectedJob && (
        <PreWorkModal
          key={`${selectedJob.workorder_id || selectedJob.id}`}
          preWorkId={selectedJob.workorder_id || selectedJob.id}
          onClose={() => setSelectedJob(null)}
          onRefresh={handleRefreshData}
        />
      )}
    </div>
  );
}