// src/types/prework.ts

// ตรงกับ database + API payload ล่าสุด
export interface PreWorkOrder {
  id?: number;
  workorder_id?: number;           // เพิ่ม: field จริงจาก database
  work_order_no?: string;          // เปลี่ยนเป็น optional
  job_reference?: string;          // เปลี่ยนเป็น optional

  // ชื่อใหม่ (จาก backend และที่เราจะใช้จริง)
  dep_id?: string;
  location_id?: string;
  detail_report?: string;
  jobstatus_id?: number | null;    // เปลี่ยนเป็น number ตาม database (tinyint)
  requester_id?: string | null;
  requester_user_id?: string | null; // เพิ่ม: field จาก database

  // Equipment & Customer
  equipment_id?: string | null;     // เพิ่ม
  customer_id?: string | null;      // เพิ่ม

  // ชื่อเก่า (รองรับ API เดิม หรือ render ใน UI บางส่วน)
  departments?: string;
  department?: string;              // เพิ่ม
  location?: string;
  location_name?: string;           // เพิ่ม
  fault_description?: string;
  job_status_id?: string | null;

  fault_type_id?: string | null;    // เปลี่ยนเป็น optional
  priority_id?: string | null;      // เปลี่ยนเป็น optional
  fault_code_id?: string | null;    // เปลี่ยนเป็น optional

  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
  creation_datetime?: string;       // เพิ่ม
  import_timestamp?: string;        // เพิ่ม

  // Fields สำหรับแสดงในตาราง (จาก API response)
  workOrder?: string;
  reportedDate?: string;
  reportBy?: string;
  shortDescription?: string;
  equipment?: string;
  errorSymptom?: string;
  customerCode?: string;
  customer_name?: string;           // เพิ่ม
  siteId?: string;
  statusName?: string;              // เพิ่ม
  currentStatusName?: string;       // เพิ่ม
}

// Dropdown options (ปรับให้ใช้ value/label เพื่อความสม่ำเสมอ)
export interface Priority {
  value: string;
  label: string;
  lookup_id?: string;       // เพิ่ม: field เดิมจาก backend
  lookup_name?: string;     // เพิ่ม: field เดิมจาก backend
  level?: number;
}

export interface JobStatus {
  value: string;
  label: string;
  jobstatus_id?: string | number;   // เพิ่ม: field เดิมจาก backend
  jobstatus_type?: string;          // เพิ่ม: field เดิมจาก backend
  color?: string;
}

export interface FaultType {
  value: string;
  label: string;
  lookup_id?: string;       // เพิ่ม: field เดิมจาก backend
  lookup_name?: string;     // เพิ่ม: field เดิมจาก backend
  description?: string;
}

export interface FaultCode {
  value: string;
  label: string;
  lookup_id?: string;       // เพิ่ม: field เดิมจาก backend
  lookup_name?: string;     // เพิ่ม: field เดิมจาก backend
  code?: string;            // เปลี่ยนเป็น optional
  description?: string;     // เปลี่ยนเป็น optional (อยู่แล้ว)
  fault_type_id?: number;
}

export interface Personnel {
  value: string;
  label: string;
  pns_id?: string;          // เพิ่ม: field เดิมจาก backend
  pns_name?: string;        // เพิ่ม: field เดิมจาก backend
  employee_code?: string;
}

export interface Department {
  value: string;
  label: string;
  dep_id?: string;          // เพิ่ม: field เดิมจาก backend
  dep_name?: string;        // เพิ่ม: field เดิมจาก backend
  code?: string;
}

export interface Location {
  value: string;
  label: string;
  location_id?: string;     // เพิ่ม: field เดิมจาก backend
  location_name?: string;   // เพิ่ม: field เดิมจาก backend
  building?: string;
}

export interface Equipment {      // เพิ่มใหม่
  value: string;
  label: string;
  equipment_id?: string;
  equipment_name?: string;
}

export interface Customer {       // เพิ่มใหม่
  value: string;
  label: string;
  customer_id?: string;
  customer_name?: string;
}

export interface Impact {         // เพิ่มใหม่
  value: string;
  label: string;
  lookup_id?: string;
  lookup_name?: string;
}

export interface Symptom {        // เพิ่มใหม่ (symptoms = faultTypes)
  value: string;
  label: string;
  lookup_id?: string;
  lookup_name?: string;
}

// Dropdowns สำหรับ form
export interface PreWorkDropdowns {
  priorities: Priority[];
  jobStatuses: JobStatus[];
  faultTypes: Symptom[];        // เปลี่ยนชื่อ type
  faultCodes: FaultCode[];
  personnel: Personnel[];
  departments: Department[];
  locations: Location[];
  equipments?: Equipment[];     // เพิ่ม (optional)
  customers?: Customer[];       // เพิ่ม (optional)
  impacts?: Impact[];           // เพิ่ม (optional)
  symptoms?: Symptom[];         // เพิ่ม (optional)
}