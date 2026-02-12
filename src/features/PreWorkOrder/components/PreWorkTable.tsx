import { useState, useEffect } from "react";
import SearchBox from "@/components/common/SearchBox";
import { getPreWorkList } from "@/features/PreWorkOrder/api/preWorkOrder.api";
import { PreWorkOrder } from "../types";

interface PreWorkTableProps {
  onSelect: (job: PreWorkOrder) => void;
  isSidebarOpen?: boolean;
}

export default function PreWorkTable({
  onSelect,
  isSidebarOpen = true,
}: PreWorkTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [data, setData] = useState<PreWorkOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch Pre-Work Orders
  useEffect(() => {
    const fetchPreWorkOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getPreWorkList();
        const json = res.data;
        setData(json.data ?? []);
      } catch (err: any) {
        console.error("❌ Fetch error:", err);
        setError(err.message || "ไม่สามารถดึงข้อมูล PreWork ได้");
      } finally {
        setLoading(false);
      }
    };

    fetchPreWorkOrders();
  }, []);

  // Pagination logic
  const totalEntries = data.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
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
          </button>,
        );
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + 4);

      if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
      }

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
          </button>,
        );
      }

      if (endPage < totalPages) {
        pages.push(
          <span key="ellipsis" style={{ padding: "6px 12px" }}>
            ...
          </span>,
        );
        pages.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            style={paginationButtonStyle}
          >
            {totalPages}
          </button>,
        );
      }
    }

    return pages;
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9fafb" }}>
      {/* Search Box at the top */}
      <div style={{ marginBottom: "24px" }}>
        <SearchBox />
      </div>

      {/* Table Container */}
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "20px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          width: "100%",
        }}
      >
        {/* Show entries dropdown */}
        <div style={{ marginBottom: 15 }}>
          <label htmlFor="entries-select">Show </label>
          <select
            id="entries-select"
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            style={{
              padding: "4px 8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span> entries</span>
        </div>

        {/* Loading / Error */}
        {loading && (
          <p style={{ textAlign: "center", padding: "20px" }}>
            กำลังโหลดข้อมูล...
          </p>
        )}
        {error && (
          <p style={{ color: "red", textAlign: "center", padding: "20px" }}>
            {error}
          </p>
        )}

        {/* Table Container with Horizontal Scroll */}
        {!loading && !error && (
          <>
            <div
              style={{
                overflowX: "auto",
                width: "100%",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  backgroundColor: "#fff",
                  tableLayout: "fixed",
                }}
              >
                <thead style={{ backgroundColor: "#d1ecf1" }}>
                  <tr>
                    <th style={{ ...thStyle, width: "4%" }}>B/D</th>
                    <th style={{ ...thStyle, width: "10%" }}>Work Order ▲</th>
                    <th style={{ ...thStyle, width: "12%" }}>Reported Date</th>
                    <th style={{ ...thStyle, width: "10%" }}>Report By</th>
                    <th style={{ ...thStyle, width: "18%" }}>
                      Short Description
                    </th>
                    <th style={{ ...thStyle, width: "12%" }}>Department</th>
                    <th style={{ ...thStyle, width: "15%" }}>Equipment</th>
                    <th style={{ ...thStyle, width: "10%" }}>Error Symptom</th>
                    <th style={{ ...thStyle, width: "9%" }}>Customer Code</th>
                    <th style={{ ...thStyle, width: "8%" }}>Site ID</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEntries.map((job, index) => (
                    <tr
                      key={job.id ?? index}
                      onClick={() => onSelect(job)}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#e9ecef")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          index % 2 === 0 ? "#f9f9f9" : "#fff")
                      }
                    >
                      <td style={tdStyle}>
                        <span
                          style={{
                            display: "inline-block",
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            backgroundColor: "#333",
                            color: "#fff",
                            textAlign: "center",
                            lineHeight: "20px",
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                        >
                          i
                        </span>
                      </td>
                        <td style={tdStyle}>{job.workOrder}</td>
                        <td style={tdStyle}>{job.reportedDate}</td>
                        <td style={tdStyle}>{job.reportBy}</td>
                        <td style={tdStyle}>{job.shortDescription}</td>
                        <td style={tdStyle}>{job.departments}</td>
                        <td style={tdStyle}>{job.equipment}</td>
                        <td style={tdStyle}>{job.errorSymptom}</td>
                        <td style={tdStyle}>{job.customerCode}</td>
                        <td style={tdStyle}>{job.siteId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 15,
                paddingTop: 15,
                borderTop: "1px solid #eee",
              }}
            >
              <div style={{ color: "#666", fontSize: "14px" }}>
                Showing {indexOfFirstEntry + 1} to{" "}
                {Math.min(indexOfLastEntry, totalEntries)} of {totalEntries}{" "}
                entries
              </div>
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    ...paginationButtonStyle,
                    opacity: currentPage === 1 ? 0.5 : 1,
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  }}
                >
                  Previous
                </button>
                {renderPageNumbers()}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    ...paginationButtonStyle,
                    opacity: currentPage === totalPages ? 0.5 : 1,
                    cursor:
                      currentPage === totalPages ? "not-allowed" : "pointer",
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
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