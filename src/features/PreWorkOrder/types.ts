// src/types/prework.ts

// ตรงกับ database prework_order table
export interface PreWorkOrder {
  id?: number;
  work_order_no: string;
  job_reference: string;
  department: string;
  location: string;
  fault_type_id: string | null;
  fault_description: string;
  priority_id: string | null;
  job_status_id: string | null;
  fault_code_id: string | null;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
  
  // Fields สำหรับแสดงในตาราง (จาก API response)
  workOrder?: string;
  reportedDate?: string;
  reportBy?: string;
  shortDescription?: string;
  equipment?: string;
  errorSymptom?: string;
  customerCode?: string;
  siteId?: string;
}

// Dropdown options
export interface Priority {
  id: number;
  name: string;
  level?: number;
}

export interface JobStatus {
  id: number;
  name: string;
  color?: string;
}

export interface FaultType {
  id: number;
  name: string;
  description?: string;
}

export interface FaultCode {
  id: number;
  code: string;
  description: string;
  fault_type_id?: number;
}

export interface Personnel {
  id: number;
  name: string;
  employee_code?: string;
}

export interface Department {
  id: number;
  name: string;
  code?: string;
}

export interface Location {
  id: number;
  name: string;
  building?: string;
}

// Dropdowns สำหรับ form
export interface PreWorkDropdowns {
  priorities: Priority[];
  jobStatuses: JobStatus[];
  faultTypes: FaultType[];
  faultCodes: FaultCode[];
  personnel: Personnel[];
  departments: Department[];
  locations: Location[];
}