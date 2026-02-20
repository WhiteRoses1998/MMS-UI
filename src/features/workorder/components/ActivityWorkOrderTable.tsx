import React, { useState, useEffect } from "react";
import { WorkOrder } from "@/features/WorkOrder/types";
import { SearchFilters } from "@/components/common/SearchBox";

const API_BASE_URL =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_URL) ||
  "http://localhost:3000";

interface ImageFile {
  image_id: number;
  workorder_id: number;
  image_type: "before" | "after";
  file_name: string;
  file_path: string;
  created_at: string;
}

interface WorkOrderTableProps {
  data: WorkOrder[];
  mode: "active" | "history";
  onSelect?: (order: WorkOrder) => void;
  filters?: SearchFilters;
}

type Column = {
  key: keyof WorkOrder | "photo_before" | "photo_after";
  label: string;
  width: string;
};

const formatWorkOrderId = (id: number): string =>
  id.toString().padStart(6, "0");

const ACTIVE_COLUMNS: Column[] = [
  { key: "workorder_id",   label: "Work Order",        width: "7%"  },
  { key: "faultDesc",      label: "Fault Description", width: "12%" },
  { key: "errorDesc",      label: "Error Description", width: "10%" },
  { key: "equipment",      label: "Equipment",         width: "9%"  },
  { key: "symptom",        label: "Symptom",           width: "8%"  },
  { key: "customerCode",   label: "Customer Code",     width: "8%"  },
  { key: "workMaster",     label: "Work Master",       width: "8%"  },
  { key: "workType",       label: "Work Type",         width: "7%"  },
  { key: "department",     label: "Department",        width: "7%"  },
  { key: "planStartDate",  label: "Plan Start",        width: "6%"  },
  { key: "planFinishDate", label: "Plan Finish",       width: "6%"  },
  { key: "status",         label: "Status",            width: "7%"  },
  { key: "priority",       label: "Priority",          width: "4%"  },
  { key: "siteId",         label: "Site ID",           width: "5%"  },
  { key: "photo_before",   label: "Photo Before",      width: "7%"  },
  { key: "photo_after",    label: "Photo After",       width: "7%"  },
];

const HISTORY_COLUMNS: Column[] = [
  { key: "workorder_id",     label: "Work Order",        width: "8%"  },
  { key: "workOrderGroup",   label: "WO Group",          width: "8%"  },
  { key: "faultDescription", label: "Fault Description", width: "14%" },
  { key: "equipment",        label: "Equipment",         width: "10%" },
  { key: "workMaster",       label: "Work Master",       width: "10%" },
  { key: "workType",         label: "Work Type",         width: "8%"  },
  { key: "department",       label: "Department",        width: "10%" },
  { key: "status",           label: "WO Gen Status",     width: "8%"  },
  { key: "woGenDate",        label: "Date",              width: "8%"  },
  { key: "siteId",           label: "Site ID",           width: "6%"  },
  { key: "photo_before",     label: "Photo Before",      width: "8%"  },
  { key: "photo_after",      label: "Photo After",       width: "8%"  },
];

const getStatusBadge = (status: string, mode: "active" | "history") => {
  const s = status.toLowerCase();
  if (mode === "history") {
    return s === "close job"
      ? { backgroundColor: "#fee2e2", color: "#991b1b" }
      : { backgroundColor: "#f3f4f6", color: "#374151" };
  }
  if (s.includes("done") || s === "completed" || s === "close job")
    return { backgroundColor: "#0d9488", color: "#fff" };
  if (s.includes("progress") || s === "departure")
    return { backgroundColor: "#3b82f6", color: "#fff" };
  if (s.includes("waiting") || s === "open" || s === "scheduled")
    return { backgroundColor: "#f97316", color: "#fff" };
  return { backgroundColor: "#6b7280", color: "#fff" };
};

// ===== Lightbox Component =====
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        cursor: "zoom-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}
      >
        <img
          src={src}
          alt="preview"
          style={{
            maxWidth: "90vw",
            maxHeight: "85vh",
            objectFit: "contain",
            borderRadius: 8,
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          }}
        />
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: -16,
            right: -16,
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "none",
            backgroundColor: "#ef4444",
            color: "#fff",
            fontSize: 18,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// ===== Photo Thumbnail Component =====
function PhotoThumb({
  workorderId,
  imageType,
  onOpenLightbox,
}: {
  workorderId: number;
  imageType: "before" | "after";
  onOpenLightbox: (src: string) => void;
}) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_BASE_URL}/api/activity-orders/${workorderId}/images`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) {
          const found = data.data.find(
            (img: ImageFile) => img.image_type === imageType
          );
          setImgSrc(found ? `${API_BASE_URL}/${found.file_path}` : null);
        }
      })
      .catch(() => setImgSrc(null))
      .finally(() => setLoading(false));
  }, [workorderId, imageType]);

  const boxStyle: React.CSSProperties = {
    width: 56,
    height: 44,
    borderRadius: 4,
    border: "1px solid #e5e7eb",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
    margin: "0 auto",
  };

  if (loading) {
    return (
      <div style={boxStyle}>
        <div
          style={{
            width: 16,
            height: 16,
            border: "2px solid #d1d5db",
            borderTopColor: "#6b7280",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
      </div>
    );
  }

  if (!imgSrc) {
    return (
      <div style={{ ...boxStyle, flexDirection: "column", gap: 2 }}>
        <span style={{ fontSize: 16, opacity: 0.3 }}>🖼</span>
        <span style={{ fontSize: 9, color: "#9ca3af" }}>No photo</span>
      </div>
    );
  }

  return (
    <div
      style={{ ...boxStyle, cursor: "zoom-in", border: "1px solid #0d9488" }}
      onClick={(e) => {
        e.stopPropagation();
        onOpenLightbox(imgSrc);
      }}
      title="คลิกเพื่อดูรูปเต็ม"
    >
      <img
        src={imgSrc}
        alt={imageType}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

// ===== Main Table Component =====
export default function UnifiedWorkOrderTable({
  data,
  mode,
  onSelect,
  filters = { workOrder: "", equipment: "", siteId: "" ,department: ""},
}: WorkOrderTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const columns = mode === "active" ? ACTIVE_COLUMNS : HISTORY_COLUMNS;

  const filteredData = data.filter((item) => {
    if (filters.workOrder && !item.workorder_id?.toString().includes(filters.workOrder))
      return false;
    if (filters.equipment && item.equipment?.toLowerCase() !== filters.equipment.toLowerCase())
      return false;
    if (filters.siteId && !item.siteId?.toLowerCase().includes(filters.siteId.toLowerCase()))
      return false;
    return true;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages: React.ReactNode[] = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage < maxVisible - 1)
      startPage = Math.max(1, endPage - maxVisible + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{
            ...paginationButtonStyle,
            backgroundColor: currentPage === i ? "#17a2b8" : "#fff",
            color: currentPage === i ? "#fff" : "#17a2b8",
          }}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      pages.push(<span key="ellipsis" style={{ padding: "6px 12px" }}>...</span>);
      pages.push(
        <button key={totalPages} onClick={() => handlePageChange(totalPages)} style={paginationButtonStyle}>
          {totalPages}
        </button>
      );
    }
    return pages;
  };

  return (
    <>
      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}

      <div style={{ padding: "20px", backgroundColor: "#f9fafb" }}>
        <div style={{
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "20px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          width: "100%",
        }}>
          {/* Show entries */}
          <div style={{ marginBottom: 15 }}>
            <label htmlFor="wo-entries-select">Show </label>
            <select
              id="wo-entries-select"
              value={entriesPerPage}
              onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}
              style={{ padding: "4px 8px", border: "1px solid #ddd", borderRadius: "4px" }}
            >
              {[10, 25, 50, 100].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <span> entries</span>
          </div>

          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

          {/* Table */}
          <div style={{ overflowX: "auto", width: "100%", border: "1px solid #ddd", borderRadius: "4px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", tableLayout: "fixed" }}>
              <thead style={{ backgroundColor: "#d1ecf1" }}>
                <tr>
                  {columns.map((c) => (
                    <th key={c.key as string} style={{ ...thStyle, width: c.width }}>
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentEntries.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} style={{ ...tdStyle, textAlign: "center", padding: "40px", color: "#999" }}>
                      {filters.workOrder || filters.equipment || filters.siteId
                        ? "ไม่พบข้อมูลที่ตรงกับการค้นหา"
                        : "ไม่พบข้อมูล Work Order"}
                    </td>
                  </tr>
                ) : (
                  currentEntries.map((row, index) => (
                    <tr
                      key={row.workorder_id}
                      onClick={() => onSelect?.(row)}
                      style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff", cursor: "pointer" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e9ecef")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#f9f9f9" : "#fff")}
                    >
                      {columns.map((c) => {
                        // ===== Photo columns =====
                        if (c.key === "photo_before" || c.key === "photo_after") {
                          return (
                            <td key={c.key} style={{ ...tdStyle, textAlign: "center", padding: "6px 4px" }}>
                              <PhotoThumb
                                workorderId={row.workorder_id}
                                imageType={c.key === "photo_before" ? "before" : "after"}
                                onOpenLightbox={(src) => setLightboxSrc(src)}
                              />
                            </td>
                          );
                        }

                        const value = row[c.key as keyof WorkOrder];

                        if (c.key === "workorder_id") {
                          return (
                            <td key={c.key as string} style={{ ...tdStyle, fontFamily: "monospace" }}>
                              {formatWorkOrderId(value as number)}
                            </td>
                          );
                        }

                        if (c.key === "status") {
                          const badge = getStatusBadge(String(value ?? ""), mode);
                          return (
                            <td key={c.key as string} style={tdStyle}>
                              <span style={{
                                ...badge,
                                padding: "2px 10px",
                                borderRadius: "9999px",
                                fontSize: "12px",
                                whiteSpace: "nowrap",
                              }}>
                                {value ?? "-"}
                              </span>
                            </td>
                          );
                        }

                        return (
                          <td key={c.key as string} style={tdStyle} title={String(value ?? "-")}>
                            {String(value ?? "-")}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {currentEntries.length > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 15, paddingTop: 15, borderTop: "1px solid #eee" }}>
              <div style={{ color: "#666", fontSize: "14px" }}>
                Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, totalEntries)} of {totalEntries} entries
              </div>
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{ ...paginationButtonStyle, opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
                >
                  Previous
                </button>
                {renderPageNumbers()}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{ ...paginationButtonStyle, opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const thStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "12px 8px",
  textAlign: "left",
  fontWeight: "bold",
  position: "sticky",
  top: 0,
  backgroundColor: "#d1ecf1",
  zIndex: 1,
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  wordWrap: "break-word",
};

const paginationButtonStyle: React.CSSProperties = {
  padding: "6px 12px",
  border: "1px solid #17a2b8",
  backgroundColor: "#fff",
  color: "#17a2b8",
  cursor: "pointer",
  borderRadius: 3,
};