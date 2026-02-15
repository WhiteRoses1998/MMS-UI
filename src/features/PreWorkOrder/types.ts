// src/types/prework.ts

export interface PreWorkOrder {
  // Primary IDs
  workorder_id?: number;
  job_reference?: string;

  // Work Order Details
  dep_id?: string;
  location_id?: string;
  detail_report?: string;
  jobstatus_id?: number | null;
  requester_id?: string | null;
  requester_user_id?: string | null;

  // Equipment & Customer
  equipment_id?: string | null;
  customer_id?: string | null;
  equipment?: string;              // Equipment name/description
  customer_name?: string;          // Customer name
  location_name?: string;          // Location name

  // Fault Information
  fault_type_id?: string | null;
  priority_id?: string | null;
  fault_code_id?: string | null;

  // Timestamps
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
  creation_datetime?: string;
  import_timestamp?: string;

  // Display Fields (สำหรับแสดงในตาราง)
  id?: number;
  workOrder?: string;
  reportedDate?: string;
  reportBy?: string;
  shortDescription?: string;
  departments?: string;
  department?: string;
  errorSymptom?: string;
  customerCode?: string;
  siteId?: string;
  statusName?: string;
  currentStatusName?: string;
}

// Dropdown Base Interface
interface DropdownOption {
  value: string;
  label: string;
}

// Specific Dropdown Types
export interface Priority extends DropdownOption {
  lookup_id?: string;
  lookup_name?: string;
  level?: number;
}

export interface JobStatus extends DropdownOption {
  jobstatus_id?: string | number;
  jobstatus_type?: string;
  color?: string;
}

export interface FaultType extends DropdownOption {
  lookup_id?: string;
  lookup_name?: string;
  description?: string;
}

export interface FaultCode extends DropdownOption {
  lookup_id?: string;
  lookup_name?: string;
  code?: string;
  description?: string;
  fault_type_id?: number;
}

export interface Personnel extends DropdownOption {
  pns_id?: string;
  pns_name?: string;
  employee_code?: string;
}

export interface Department extends DropdownOption {
  dep_id?: string;
  dep_name?: string;
  code?: string;
}

export interface Location extends DropdownOption {
  location_id?: string;
  location_name?: string;
  building?: string;
}

export interface Equipment extends DropdownOption {
  equipment_id?: string;
  equipment_name?: string;
}

export interface Customer extends DropdownOption {
  customer_id?: string;
  customer_name?: string;
}

export interface Impact extends DropdownOption {
  lookup_id?: string;
  lookup_name?: string;
}

export interface Symptom extends DropdownOption {
  lookup_id?: string;
  lookup_name?: string;
}

export interface Fund extends DropdownOption {
  fund_id?: string;
  fund_name?: string;
}

export interface FundCenter extends DropdownOption {
  fund_id?: string;
  fund_name?: string;
}

// Main Dropdowns Interface
export interface PreWorkDropdowns {
  priorities: Priority[];
  jobStatuses: JobStatus[];
  faultTypes: Symptom[];           // symptoms = faultTypes
  faultCodes: FaultCode[];
  personnel: Personnel[];
  departments: Department[];
  locations: Location[];
  equipments?: Equipment[];
  customers?: Customer[];
  impacts?: Impact[];
  symptoms?: Symptom[];
  funds?: Fund[];
  fundCenters?: FundCenter[];      // ⭐ เพิ่มใหม่
}