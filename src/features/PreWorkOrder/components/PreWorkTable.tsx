import { useState, useEffect } from "react";
import SearchBox from "@/components/common/SearchBox";

interface PreWorkTableProps {
  onSelect: (job: any) => void;
  isSidebarOpen?: boolean;
}

interface PreWorkJob {
  id: string;
  workOrder: string;
  reportedDate: string;
  reportBy: string;
  shortDescription: string;
  description: string;
  department: string;
  equipment: string;
  errorSymptom: string;
  customerCode: string;
  requiredStart: string;
  requiredFinish: string;
  siteId: string;
}

export default function PreWorkTable({ onSelect, isSidebarOpen = true }: PreWorkTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [data, setData] = useState<PreWorkJob[]>([]);
  const [loading, setLoading] = useState(false);

  // TODO: เชื่อมต่อกับ API จริง
  useEffect(() => {
    // ตัวอย่างข้อมูล - แทนที่ด้วย API call จริง
    const mockData: PreWorkJob[] = [
      {
        id: "1",
        workOrder: "076142",
        reportedDate: "07-12-2024",
        reportBy: "00617",
        shortDescription: "",
        description: "",
        department: "PGT000",
        equipment: "210000098-0000 (โทรศัพท์ IP Phone รุ่น E129)",
        errorSymptom: "",
        customerCode: "",
        requiredStart: "07-12-2024",
        requiredFinish: "07-12-2024",
        siteId: "DMT",
      },
      {
        id: "2",
        workOrder: "080319",
        reportedDate: "19-08-2025",
        reportBy: "01283",
        shortDescription: "",
        description: "",
        department: "FPA000",
        equipment: "400000019-0000 (รถกากะ-อุดคูป ยี่ห้อ JOHNSTON รุ่น VT 650 99-7089 กทม.)",
        errorSymptom: "",
        customerCode: "",
        requiredStart: "19-08-2025",
        requiredFinish: "25-08-2025",
        siteId: "DMT",
      },
      {
        id: "3",
        workOrder: "080370",
        reportedDate: "20-08-2025",
        reportBy: "01372",
        shortDescription: "มีภูมิ-ขอสอบถามเรื่องหารายงานการทำราย",
        description: "งหารายงานการทำราย",
        department: "PTEA00",
        equipment: "999999921 (งานสนับสนุน (Dummy) แผนก ฐานข้อมูลและซอฟต์แวร์ระบบแพลตฟอร์มโลจิสติกส์สมเขต)",
        errorSymptom: "STW31 (ตรวจสอบข้อมูล)",
        customerCode: "",
        requiredStart: "20-08-2025",
        requiredFinish: "20-08-2025",
        siteId: "DMT",
      },
      {
        id: "4",
        workOrder: "080371",
        reportedDate: "20-08-2025",
        reportBy: "01372",
        shortDescription: "มีภูมิ-สอบถามเรื่องการ setting font ในระบบ SAP",
        description: "าร setting font ในระบบ SAP",
        department: "PTEA00",
        equipment: "999999921 (งานสนับสนุน (Dummy) แผนก ฐานข้อมูลและซอฟต์แวร์ระบบแพลตฟอร์มโลจิสติกส์สมเขต)",
        errorSymptom: "STW31 (ตรวจสอบข้อมูล)",
        customerCode: "",
        requiredStart: "20-08-2025",
        requiredFinish: "20-08-2025",
        siteId: "DMT",
      },
      {
        id: "5",
        workOrder: "080372",
        reportedDate: "20-08-2025",
        reportBy: "01372",
        shortDescription: "OT-ขอเพิ่มข้อมูล Error Symptom",
        description: "or Symptom",
        department: "PTEA00",
        equipment: "999999921 (งานสนับสนุน (Dummy) แผนก ฐานข้อมูลและซอฟต์แวร์ระบบแพลตฟอร์มโลจิสติกส์สมเขต)",
        errorSymptom: "STW31 (ตรวจสอบข้อมูล)",
        customerCode: "",
        requiredStart: "20-08-2025",
        requiredFinish: "20-08-2025",
        siteId: "DMT",
      },
      {
        id: "6",
        workOrder: "080374",
        reportedDate: "20-08-2025",
        reportBy: "01372",
        shortDescription: "อำนาฏ-ขอข้อมูลความเร็ว Radar บนทางยกระดับ",
        description: "มเร็ว Radar บนทางยกระดับ",
        department: "PTEA00",
        equipment: "999999921 (งานสนับสนุน (Dummy) แผนก ฐานข้อมูลและซอฟต์แวร์ระบบแพลตฟอร์มโลจิสติกส์สมเขต)",
        errorSymptom: "STW31 (ตรวจสอบข้อมูล)",
        customerCode: "",
        requiredStart: "20-08-2025",
        requiredFinish: "20-08-2025",
        siteId: "DMT",
      },
      {
        id: "7",
        workOrder: "080375",
        reportedDate: "20-08-2025",
        reportBy: "01372",
        shortDescription: "OT-ปรับการมีบโลค Policy SAP S4 HA/NA",
        description: "olicy SAP S4 HA/NA",
        department: "PTEA00",
        equipment: "999999921 (งานสนับสนุน (Dummy) แผนก ฐานข้อมูลและซอฟต์แวร์ระบบแพลตฟอร์มโลจิสติกส์สมเขต)",
        errorSymptom: "STP03 (Update Program)",
        customerCode: "",
        requiredStart: "20-08-2025",
        requiredFinish: "20-08-2025",
        siteId: "DMT",
      },
      {
        id: "8",
        workOrder: "080376",
        reportedDate: "20-08-2025",
        reportBy: "01372",
        shortDescription: "OT-ขอข้อมูลการหักรักโทษ กล้อง Analytic",
        description: "หักรักโทษ กล้อง Analytic",
        department: "PTEA00",
        equipment: "999999921 (งานสนับสนุน (Dummy) แผนก ฐานข้อมูลและซอฟต์แวร์ระบบแพลตฟอร์มโลจิสติกส์สมเขต)",
        errorSymptom: "STW31 (ตรวจสอบข้อมูล)",
        customerCode: "",
        requiredStart: "20-08-2025",
        requiredFinish: "20-08-2025",
        siteId: "DMT",
      },
      {
        id: "9",
        workOrder: "080380",
        reportedDate: "20-08-2025",
        reportBy: "01372",
        shortDescription: "",
        description: "",
        department: "PTEA00",
        equipment: "999999921 (งานสนับสนุน (Dummy) แผนก ฐานข้อมูลและซอฟต์แวร์ระบบแพลตฟอร์มโลจิสติกส์สมเขต)",
        errorSymptom: "STW05 (ค้าง)",
        customerCode: "",
        requiredStart: "20-08-2025",
        requiredFinish: "20-08-2025",
        siteId: "DMT",
      },
      {
        id: "10",
        workOrder: "080478",
        reportedDate: "22-08-2025",
        reportBy: "01283",
        shortDescription: "",
        description: "",
        department: "FPA000",
        equipment: "400000022-0000 (รถยนตชา 4 ตัวเล็ก 99-7520)",
        errorSymptom: "",
        customerCode: "",
        requiredStart: "22-08-2025",
        requiredFinish: "28-11-2025",
        siteId: "DMT",
      },
    ];
    setData(mockData);
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
      {/* Search Box at the top */}
      <div style={{ marginBottom: "24px" }}>
        <SearchBox />
      </div>

      {/* Table Container */}
      <div style={{
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "20px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        width: "100%",
      }}>
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
            style={{ padding: "4px 8px", border: "1px solid #ddd", borderRadius: "4px" }}
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
                <th style={{ ...thStyle, width: "4%" }}>B/D</th>
                <th style={{ ...thStyle, width: "8%" }}>Work Order ▲</th>
                <th style={{ ...thStyle, width: "10%" }}>Reported Date</th>
                <th style={{ ...thStyle, width: "8%" }}>Report By</th>
                <th style={{ ...thStyle, width: "15%" }}>Short Description</th>
                <th style={{ ...thStyle, width: "8%" }}>Department</th>
                <th style={{ ...thStyle, width: "20%" }}>Equipment</th>
                <th style={{ ...thStyle, width: "12%" }}>Error Symptom</th>
                <th style={{ ...thStyle, width: "8%" }}>Customer Code</th>
                <th style={{ ...thStyle, width: "10%" }}>Required Start</th>
                <th style={{ ...thStyle, width: "10%" }}>Required Finish</th>
                <th style={{ ...thStyle, width: "7%" }}>Site ID</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map((job, index) => (
                <tr
                  key={job.id}
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
                  <td style={tdStyle}>{job.department}</td>
                  <td style={tdStyle}>{job.equipment}</td>
                  <td style={tdStyle}>{job.errorSymptom}</td>
                  <td style={tdStyle}>{job.customerCode}</td>
                  <td style={tdStyle}>{job.requiredStart}</td>
                  <td style={tdStyle}>{job.requiredFinish}</td>
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