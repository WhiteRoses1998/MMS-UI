// src/pages/Dashboard.tsx
import { useState } from 'react';
import { FileText, Clock, CheckCircle, ClipboardList } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { Button } from '@/components/ui';
import FilterForm from '@/components/common/FilterForm';

interface WorkOrder {
  id: string;
  reporter: string;
  issue: string;
  department: string;
  location: string;
  date: string;
  status: string;
  statusText: string;
}

export default function Dashboard() {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    department: '',
  });

  const [filteredOrders, setFilteredOrders] = useState<WorkOrder[]>([]);

  // ข้อมูลตัวอย่าง (mock data)
  const allWorkOrders: WorkOrder[] = [
    {
      id: 'REQ001',
      reporter: 'สมชาย โจดี',
      issue: 'ไฟดับ',
      department: 'แผนกไฟฟ้า',
      location: 'อาคาร A ห้อง 301',
      date: '15 มี.ค. 2567',
      status: 'pending',
      statusText: 'Pending'
    },
    {
      id: 'REQ002',
      reporter: 'สมหญิง วัดสวาด',
      issue: 'เครื่องปรับอากาศ',
      department: 'แผนกเครื่องปรับอากาศ',
      location: 'อาคาร B ห้อง 205',
      date: '14 มี.ค. 2567',
      status: 'in-progress',
      statusText: 'In Progress'
    },
    {
      id: 'REQ003',
      reporter: 'วิชัย ฮ้างซ่อม',
      issue: 'ท่อประปา',
      department: 'แผนกประปา',
      location: 'อาคาร C ห้อง 101',
      date: '13 มี.ค. 2567',
      status: 'completed',
      statusText: 'Close Job'
    },
    {
      id: 'REQ004',
      reporter: 'สมศรี มีความสุข',
      issue: 'ประตู-หน้าต่าง',
      department: 'แผนกงานโยธา',
      location: 'อาคาร A ห้อง 405',
      date: '15 มี.ค. 2567',
      status: 'pending',
      statusText: 'Pending'
    },
    {
      id: 'REQ005',
      reporter: 'ประยุทธ์ ชยัน',
      issue: 'อินเทอร์เน็ต',
      department: 'แผนก IT',
      location: 'อาคาร D ห้อง 302',
      date: '14 มี.ค. 2567',
      status: 'in-progress',
      statusText: 'In Progress'
    }
  ];

  // ฟังก์ชัน filter ข้อมูลตาม filters
  const applyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);

    let result = [...allWorkOrders];

    // Filter ตาม department
    if (newFilters.department) {
      result = result.filter(order => order.department === newFilters.department);
    }

    // Filter ตามวันที่ (ตัวอย่างง่าย ๆ - ถ้ามี date format จริงจะต้อง parse ก่อน)
    // ถ้าต้องการ filter date จริง ๆ ให้ใช้ library เช่น date-fns หรือ luxon

    setFilteredOrders(result);
  };

  const handleClear = () => {
    setFilters({
      startDate: '',
      endDate: '',
      department: '',
    });
    setFilteredOrders(allWorkOrders); // reset กลับไปแสดงทั้งหมด
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'แผนกไฟฟ้า':
        return 'bg-red-100 text-red-800';
      case 'แผนกเครื่องปรับอากาศ':
        return 'bg-blue-100 text-blue-800';
      case 'แผนกประปา':
        return 'bg-green-100 text-green-800';
      case 'แผนกงานโยธา':
        return 'bg-yellow-100 text-yellow-800';
      case 'แผนก IT':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-teal-200">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <FileText className="h-6 w-6 text-teal-600" />
            <CardTitle className="text-base font-medium">Total WO</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{allWorkOrders.length}</p>
          </CardContent>
        </Card>

        <Card className="border-teal-200">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Clock className="h-6 w-6 text-yellow-600" />
            <CardTitle className="text-base font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {allWorkOrders.filter(o => o.status === 'pending').length}
            </p>
          </CardContent>
        </Card>

        <Card className="border-teal-200">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <ClipboardList className="h-6 w-6 text-blue-600" />
            <CardTitle className="text-base font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {allWorkOrders.filter(o => o.status === 'in-progress').length}
            </p>
          </CardContent>
        </Card>

        <Card className="border-teal-200">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <CardTitle className="text-base font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {allWorkOrders.filter(o => o.status === 'completed').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Form - เรียกใช้ component แยก */}
      <FilterForm 
        onFilter={applyFilters} 
        onClear={handleClear} 
        // ถ้าต้องการส่ง initial values หรือ options พิเศษ
        // initialValues={{ department: 'แผนกไฟฟ้า' }}
      />

      {/* Work Order Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-cyan-50 border-b border-gray-200">
                <TableHead className="font-medium text-gray-700 text-sm">Work Order</TableHead>
                <TableHead className="font-medium text-gray-700 text-sm">Work Order Group</TableHead>
                <TableHead className="font-medium text-gray-700 text-sm">Fault Description</TableHead>
                <TableHead className="font-medium text-gray-700 text-sm">Directive</TableHead>
                <TableHead className="font-medium text-gray-700 text-sm">Equipment</TableHead>
                <TableHead className="font-medium text-gray-700 text-sm">Work Master</TableHead>
                <TableHead className="font-medium text-gray-700 text-sm">Work Type</TableHead>
                <TableHead className="font-medium text-gray-700 text-sm">Department</TableHead>
                <TableHead className="font-medium text-gray-700 text-sm">Status</TableHead>
                <TableHead className="font-medium text-gray-700 text-sm">WO Gen Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(filteredOrders.length > 0 ? filteredOrders : allWorkOrders).map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-50 border-b border-gray-200">
                  <TableCell className="font-medium text-sm">{order.id}</TableCell>
                  <TableCell className="text-sm">{order.reporter}</TableCell>
                  <TableCell className="text-sm">{order.issue}</TableCell>
                  <TableCell className="text-gray-500 text-sm">-</TableCell>
                  <TableCell className="text-gray-500 text-sm">-</TableCell>
                  <TableCell className="text-gray-500 text-sm">-</TableCell>
                  <TableCell className="text-gray-500 text-sm">-</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getDepartmentColor(order.department)}`}>
                      {order.department}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-4 py-1 text-xs font-bold rounded ${getStatusColor(order.status)}`}>
                      {order.statusText}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-700 text-sm">{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredOrders.length === 0 && filters.department && (
          <div className="text-center py-8 text-gray-500">
            ไม่พบข้อมูลที่ตรงกับการค้นหา
          </div>
        )}
        
        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            Showing 1 to {(filteredOrders.length > 0 ? filteredOrders : allWorkOrders).length} of {allWorkOrders.length} entries
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled className="text-gray-500">Previous</Button>
            <Button size="sm" className="bg-teal-600 text-white hover:bg-teal-700 border-0">1</Button>
            <Button variant="outline" size="sm" className="hover:bg-teal-50">2</Button>
            <Button variant="outline" size="sm" className="hover:bg-teal-50">3</Button>
            <Button variant="outline" size="sm" className="hover:bg-teal-50">4</Button>
            <Button variant="outline" size="sm" className="hover:bg-teal-50">5</Button>
            <span className="px-2 py-1 text-sm text-gray-500">...</span>
            <Button variant="outline" size="sm" className="hover:bg-teal-50">188</Button>
            <Button variant="outline" size="sm" className="hover:bg-teal-50">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}