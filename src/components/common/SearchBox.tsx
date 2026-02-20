import React, { useState, useEffect, useRef } from "react";
import axios from "@/lib/axios";

export interface SearchFilters {
  workOrder: string;
  equipment: string;
  siteId: string;
  department: string; // ✅ เพิ่ม department
}

interface SearchBoxProps {
  onSearch?: (filters: SearchFilters) => void;
  onClear?: () => void;
}

interface DropdownOption {
  value: string;
  label: string;
}

// ✅ Custom Searchable Dropdown Component
interface SearchableDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label: string;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "-- ทั้งหมด --",
  disabled = false,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ ปิด dropdown เมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Filter options ตาม search term
  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ หา label ของ value ที่เลือก
  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <label className="block text-sm font-normal text-gray-700 mb-2">
        {label}
      </label>

      {/* ✅ Display/Trigger Button */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm
                   text-gray-600 bg-white text-left
                   focus:outline-none focus:ring-1 focus:ring-gray-300
                   disabled:bg-gray-100 disabled:cursor-not-allowed
                   flex justify-between items-center"
      >
        <span className={value ? "text-gray-600" : "text-gray-400"}>
          {selectedLabel}
        </span>
        {/* ✅ Dropdown Arrow Icon */}
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* ✅ Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-64 overflow-hidden">
          {/* ✅ Search Input */}
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ค้นหา..."
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded
                         focus:outline-none focus:ring-1 focus:ring-gray-300"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* ✅ Options List */}
          <div className="overflow-y-auto max-h-52">
            {/* ✅ "ทั้งหมด" Option */}
            <div
              onClick={() => handleSelect("")}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 transition-colors
                         ${value === "" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700"}`}
            >
              -- ทั้งหมด --
            </div>

            {/* ✅ Filtered Options */}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 transition-colors
                             ${value === option.value ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700"}`}
                  title={option.label}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-400 text-center">
                ไม่พบข้อมูล
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ Main SearchBox Component
const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, onClear }) => {
  const [workOrder, setWorkOrder] = useState("");
  const [equipment, setEquipment] = useState("");
  const [siteId, setSiteId] = useState("");
  const [department, setDepartment] = useState(""); // ✅ เพิ่ม state department

  const [equipments, setEquipments] = useState<DropdownOption[]>([]);
  const [locations, setLocations] = useState<DropdownOption[]>([]);
  const [departments, setDepartments] = useState<DropdownOption[]>([]); // ✅ เพิ่ม state departments
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("🔄 Fetching dropdown data...");
      const res = await axios.get("/prework-orders/dropdowns");

      console.log("📡 Full API Response:", res.data);

      if (res.data.ok) {
        // ✅ แปลงข้อมูลให้เป็น format { value, label }
        const equipmentsData = (res.data.equipments || []).map((item: any) => ({
          value: item.value || item.equipment_id || "",
          label: item.label || item.equipment_name || "",
        }));

        const locationsData = (res.data.locations || []).map((item: any) => ({
          value: item.value || item.location_id || "",
          label: item.label || item.location_name || "",
        }));

        // ✅ เพิ่ม departments
        const departmentsData = (res.data.departments || []).map((item: any) => ({
          value: item.value || item.department_id || "",
          label: item.label || item.department_name || "",
        }));

        console.log("✅ Equipments:", equipmentsData.length, "items");
        console.log("✅ Locations:", locationsData.length, "items");
        console.log("✅ Departments:", departmentsData.length, "items"); // ✅ log

        setEquipments(equipmentsData);
        setLocations(locationsData);
        setDepartments(departmentsData); // ✅ set departments

        if (
          equipmentsData.length === 0 &&
          locationsData.length === 0 &&
          departmentsData.length === 0
        ) {
          setError("ไม่พบข้อมูล dropdown");
        }
      } else {
        console.error("❌ API returned ok: false");
        setError("API ส่งข้อมูลไม่สำเร็จ");
      }
    } catch (error: any) {
      console.error("❌ Error fetching dropdown data:", error);
      setError(error.message || "ไม่สามารถโหลดข้อมูล dropdown ได้");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setWorkOrder("");
    setEquipment("");
    setSiteId("");
    setDepartment(""); // ✅ clear department
    onClear?.();
  };

  const handleSearch = () => {
    console.log("🔍 Searching with filters:", {
      workOrder,
      equipment,
      siteId,
      department, // ✅ เพิ่ม department
    });

    onSearch?.({
      workOrder,
      equipment,
      siteId,
      department, // ✅ ส่ง department ออกไป
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
      {/* First Row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Work Order */}
        <div>
          <label className="block text-sm font-normal text-gray-700 mb-2">
            Work Order
          </label>
          <input
            type="text"
            value={workOrder}
            onChange={(e) => setWorkOrder(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm
                       text-gray-600 placeholder-gray-400
                       focus:outline-none focus:ring-1 focus:ring-gray-300"
            placeholder="ค้นหาด้วยเลขงาน..."
          />
        </div>

        {/* ✅ Equipment - Searchable Dropdown */}
        <SearchableDropdown
          label="Equipment"
          options={equipments}
          value={equipment}
          onChange={setEquipment}
          disabled={loading}
          placeholder="-- ทั้งหมด --"
        />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* ✅ Site ID - Searchable Dropdown */}
        <SearchableDropdown
          label="Site ID"
          options={locations}
          value={siteId}
          onChange={setSiteId}
          disabled={loading}
          placeholder="-- ทั้งหมด --"
        />

        {/* ✅ Department - Searchable Dropdown (เพิ่มใหม่) */}
        <SearchableDropdown
          label="Department"
          options={departments}
          value={department}
          onChange={setDepartment}
          disabled={loading}
          placeholder="-- ทั้งหมด --"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleClear}
          className="px-6 py-2 text-sm font-medium text-gray-700
                     bg-white border border-gray-300 rounded
                     hover:bg-gray-50 transition
                     disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          Clear
        </button>
        <button
          onClick={handleSearch}
          className="px-6 py-2 text-sm font-medium text-white
                     bg-teal-500 rounded hover:bg-teal-600 transition
                     disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "กำลังโหลด..." : "Search"}
        </button>
      </div>

      {/* ✅ Loading Indicator */}
      {loading && (
        <div className="mt-3 text-sm text-gray-500 text-center">
          กำลังโหลดข้อมูล dropdown...
        </div>
      )}

      {/* ✅ Error Message */}
      {error && !loading && (
        <div className="mt-3 text-sm text-red-600 text-center bg-red-50 border border-red-200 rounded px-3 py-2">
          ⚠️ {error}
          <button
            onClick={fetchDropdownData}
            className="ml-2 underline hover:no-underline"
          >
            ลองใหม่
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBox;