// src/components/common/FilterForm.tsx
import React, { useState, ChangeEvent } from 'react';
import { Filter, X } from 'lucide-react';
import { Input } from '@/components/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { Button } from '@/components/ui';
import { Label } from '@/components/ui';

interface FilterFormProps {
  initialValues?: {
    startDate?: string;
    endDate?: string;
    department?: string;
  };
  departmentOptions?: string[];
  onFilter: (filters: { startDate: string; endDate: string; department: string }) => void;
  onClear: () => void;
}

export default function FilterForm({
  initialValues = {},
  departmentOptions = [
    'แผนกไฟฟ้า',
    'แผนกเครื่องปรับอากาศ',
    'แผนกประปา',
    'แผนกงานโยธา',
    'แผนก IT',
  ],
  onFilter,
  onClear,
}: FilterFormProps) {
  const [startDate, setStartDate] = useState(initialValues.startDate || '');
  const [endDate, setEndDate] = useState(initialValues.endDate || '');
  const [department, setDepartment] = useState(initialValues.department || '');

  // แยกฟังก์ชันเพื่อกำหนด type ชัดเจน
  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  // Select ใช้ onValueChange รับ string โดยตรง (ไม่ต้อง event)
  const handleDepartmentChange = (value: string) => {
    setDepartment(value);
  };

  const handleFilter = () => {
    onFilter({ startDate, endDate, department });
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    setDepartment('');
    onClear();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {/* Start Date */}
      <div>
        <Label htmlFor="startDate" className="block text-sm font-medium mb-2">
          Start Date
        </Label>
        <Input
          id="startDate"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
        />
      </div>

      {/* End Date */}
      <div>
        <Label htmlFor="endDate" className="block text-sm font-medium mb-2">
          End Date
        </Label>
        <Input
          id="endDate"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>

      {/* Department */}
      <div>
        <Label htmlFor="department" className="block text-sm font-medium mb-2">
          Department
        </Label>
        <Select value={department} onValueChange={handleDepartmentChange}>
          <SelectTrigger id="department">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            {departmentOptions.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 items-end">
        <Button variant="default" onClick={handleFilter} className="flex items-center gap-2">
          <Filter size={16} />
          Filter
        </Button>
        <Button variant="outline" onClick={handleClear} className="flex items-center gap-2">
          <X size={16} />
          Clear
        </Button>
      </div>
    </div>
  );
}