import { WorkOrder } from '../types';

interface Props {
  onSelect: (order: WorkOrder) => void;
}

const mockWorkOrders: WorkOrder[] = [
  {
    id: '080017',
    description: 'เครื่อง TOD โปรแกรม MTS ไม่ส่งข้อมูล',
    status: 'pending',
  },
  {
    id: '080018',
    description: 'ยอดเงินไม่ตรงกับรายงาน',
    status: 'in-progress',
  },
  {
    id: '080019',
    description: 'EMV ไม่มีเงินเข้าบัญชี',
    status: 'completed',
  },
];

export default function WorkOrderTable({ onSelect }: Props) {
  return (
    <div className="space-y-4 bg-white p-6 rounded shadow">

      {/* SEARCH AREA (mock UI) */}
      <div className="grid grid-cols-4 gap-4">
        <input className="border p-2 rounded" placeholder="Work Order" />
        <input className="border p-2 rounded" placeholder="Equipment" />
        <select className="border p-2 rounded">
          <option>Breakdown</option>
        </select>
        <select className="border p-2 rounded">
          <option>Usage Alert</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button className="border px-4 py-2 rounded">Clear</button>
        <button className="bg-teal-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full border mt-6">
        <thead className="bg-teal-50">
          <tr>
            <th className="p-2 border">Work Order</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {mockWorkOrders.map(order => (
            <tr
              key={order.id}
              onClick={() => onSelect(order)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="p-2 border">{order.id}</td>
              <td className="p-2 border">{order.description}</td>
              <td className="p-2 border">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
