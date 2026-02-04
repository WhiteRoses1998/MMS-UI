import React, { useState } from "react";

export interface SearchFilters {
  workOrder: string;
  equipment: string;
  siteId: string;
}

interface SearchBoxProps {
  onSearch?: (filters: SearchFilters) => void;
  onClear?: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, onClear }) => {
  const [workOrder, setWorkOrder] = useState("");
  const [equipment, setEquipment] = useState("");
  const [siteId, setSiteId] = useState("");

  const handleClear = () => {
    setWorkOrder("");
    setEquipment("");
    setSiteId("");
    onClear?.();
  };

  const handleSearch = () => {
    onSearch?.({
      workOrder,
      equipment,
      siteId,
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
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm
                       text-gray-600 placeholder-gray-400
                       focus:outline-none focus:ring-1 focus:ring-gray-300"
            placeholder="Work Order"
          />
        </div>

        {/* Equipment */}
        <div>
          <label className="block text-sm font-normal text-gray-700 mb-2">
            Equipment
          </label>
          <select
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm
                       text-gray-600 bg-white
                       focus:outline-none focus:ring-1 focus:ring-gray-300
                       appearance-none pr-9
                       bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3c%2Fpolyline%3E%3c%2Fsvg%3E')]
                       bg-no-repeat bg-[length:20px] bg-[right_8px_center]"
          >
            <option value="">Select</option>
            <option value="equipment1">Equipment 1</option>
            <option value="equipment2">Equipment 2</option>
          </select>
        </div>
      </div>

      {/* Side ID */}
      <div className="mb-4">
        <label className="block text-sm font-normal text-gray-700 mb-2">
          Site ID
        </label>
        <input
          type="text"
          value={siteId}
          onChange={(e) => setSiteId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm
                     text-gray-600 placeholder-gray-400
                     focus:outline-none focus:ring-1 focus:ring-gray-300"
          placeholder="พิมพ์ Site ID แล้วกด Enter..."
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleClear}
          className="px-6 py-2 text-sm font-medium text-gray-700
                     bg-white border border-gray-300 rounded
                     hover:bg-gray-50 transition"
        >
          Clear
        </button>
        <button
          onClick={handleSearch}
          className="px-6 py-2 text-sm font-medium text-white
                     bg-teal-500 rounded hover:bg-teal-600 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
