// src/pages/WorkOrderGroupPage.tsx
import { useState, useEffect } from "react";

interface WorkOrderGroup {
  id: string;
  usageAlert: string;
  workOrderGroup: string;
  errorDescription: string;
  faultDescription: string;
  workMaster: string;
  workType: string;
  department: string;
  status: string;
  statusColor: "green" | "red";
}

export default function WorkOrderGroupPage() {
  const [data, setData] = useState<WorkOrderGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // ฟังก์ชันดึงข้อมูล
  const fetchData = async () => {
    setLoading(true);
    try {
      // TODO: เปลี่ยนเป็น API endpoint จริง
      // const response = await fetch(`/api/work-order-groups?page=${page}&limit=${pageSize}`);
      // const result = await response.json();

      // ข้อมูลตัวอย่าง
      const mockData: WorkOrderGroup[] = [
        {
          id: "1",
          usageAlert: "",
          workOrderGroup: "G001326",
          errorDescription: "",
          faultDescription: "PM3 - Check Status DC, DR, Plaza Weekly - 1",
          workMaster: "01693 - กฤษฎชัย จันทร์ทิแสน",
          workType: "PM",
          department: "PTET00",
          status: "Assign Job",
          statusColor: "green",
        },
        {
          id: "2",
          usageAlert: "",
          workOrderGroup: "G001327",
          errorDescription: "",
          faultDescription: "PM2 - Remote Check Status and Clean DC, DR, Plaza and Lane Switch",
          workMaster: "01693 - กฤษฎชัย จันทร์ทิแสน",
          workType: "PM",
          department: "PTET00",
          status: "Assign Job",
          statusColor: "green",
        },
        {
          id: "3",
          usageAlert: "",
          workOrderGroup: "G001328",
          errorDescription: "",
          faultDescription: "PM3 - Check Status DC, DR, Plaza Weekly - 2",
          workMaster: "01749 - ดรงศักดิ์ นุชนา",
          workType: "PM",
          department: "PTET00",
          status: "Close Job",
          statusColor: "red",
        },
        {
          id: "4",
          usageAlert: "",
          workOrderGroup: "G001333",
          errorDescription: "",
          faultDescription: "PM3 - Check Status DC, DR, Plaza Weekly - 3",
          workMaster: "01749 - ดรงศักดิ์ นุชนา",
          workType: "PM",
          department: "PTET00",
          status: "Assign Job",
          statusColor: "green",
        },
        {
          id: "5",
          usageAlert: "",
          workOrderGroup: "G001334",
          errorDescription: "",
          faultDescription: "PM3 - Check Status DC, DR, Plaza Weekly - 4",
          workMaster: "01693 - กฤษฎชัย จันทร์ทิแสน",
          workType: "PM",
          department: "PTET00",
          status: "Assign Job",
          statusColor: "green",
        },
        {
          id: "6",
          usageAlert: "",
          workOrderGroup: "G001335",
          errorDescription: "",
          faultDescription: "PM1 - Remote Check Status DC, DR, Plaza and Lane Switch -",
          workMaster: "01749 - ดรงศักดิ์ นุชนา",
          workType: "PM",
          department: "PTET00",
          status: "Close Job",
          statusColor: "red",
        },
        {
          id: "7",
          usageAlert: "",
          workOrderGroup: "G001353",
          errorDescription: "",
          faultDescription: "PM3 - Check Status DC, DR, Plaza Weekly - 1",
          workMaster: "01749 - ดรงศักดิ์ นุชนา",
          workType: "PM",
          department: "PTET00",
          status: "Assign Job",
          statusColor: "green",
        },
        {
          id: "8",
          usageAlert: "",
          workOrderGroup: "G001354",
          errorDescription: "",
          faultDescription: "PM3 - Check Status DC, DR, Plaza Weekly - 2",
          workMaster: "01693 - กฤษฎชัย จันทร์ทิแสน",
          workType: "PM",
          department: "PTET00",
          status: "Assign Job",
          statusColor: "green",
        },
      ];

      setData(mockData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalEntries = data.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry);

  const handlePageChange = (pageNumber: number) => {
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
          </button>
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
          </button>
        );
      }

      if (endPage < totalPages) {
        pages.push(
          <span key="ellipsis" style={{ padding: "6px 12px" }}>
            ...
          </span>
        );
        pages.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            style={paginationButtonStyle}
          >
            {totalPages}
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9fafb" }}>
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

        {/* Table Container with Horizontal Scroll */}
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
                <th style={{ ...thStyle, width: "8%" }}>Usage Alert</th>
                <th style={{ ...thStyle, width: "12%" }}>Work Order Group ▲</th>
                <th style={{ ...thStyle, width: "12%" }}>Error Description</th>
                <th style={{ ...thStyle, width: "25%" }}>Fault Description</th>
                <th style={{ ...thStyle, width: "18%" }}>Work Master</th>
                <th style={{ ...thStyle, width: "8%" }}>Work Type *</th>
                <th style={{ ...thStyle, width: "10%" }}>Department</th>
                <th style={{ ...thStyle, width: "12%" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} style={{ ...tdStyle, textAlign: "center", padding: "32px" }}>
                    Loading...
                  </td>
                </tr>
              ) : currentEntries.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ ...tdStyle, textAlign: "center", padding: "32px" }}>
                    No data available
                  </td>
                </tr>
              ) : (
                currentEntries.map((row, index) => (
                  <tr
                    key={row.id}
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
                    <td style={tdStyle}>{row.usageAlert}</td>
                    <td style={{ ...tdStyle, fontWeight: "500" }}>
                      {row.workOrderGroup}
                    </td>
                    <td style={tdStyle}>{row.errorDescription}</td>
                    <td style={tdStyle}>{row.faultDescription}</td>
                    <td style={tdStyle}>{row.workMaster}</td>
                    <td style={tdStyle}>{row.workType}</td>
                    <td style={tdStyle}>{row.department}</td>
                    <td style={tdStyle}>
                      <button
                        style={{
                          width: "100%",
                          padding: "6px 12px",
                          backgroundColor:
                            row.statusColor === "green" ? "#28a745" : "#dc3545",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "13px",
                          fontWeight: "500",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            row.statusColor === "green" ? "#218838" : "#c82333";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            row.statusColor === "green" ? "#28a745" : "#dc3545";
                        }}
                      >
                        {row.status}
                      </button>
                    </td>
                  </tr>
                ))
              )}
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
            {Math.min(indexOfLastEntry, totalEntries)} of {totalEntries} entries
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
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              }}
            >
              Next
            </button>
          </div>
        </div>
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