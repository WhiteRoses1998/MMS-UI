// types.ts - Updated for Activity Work Orders

export interface WorkOrder {
  // Core ID - ใช้ workorder_id อย่างเดียว
  workorder_id: number;       // ✅ ใช้ตัวเดียว
  job_reference?: string;
  
  // Fault/Error Info
  breakdown?: boolean;
  faultDesc?: string;
  faultDescription?: string;
  errorDesc?: string;
  
  // Prepare Tab Fields
  standard_jobs?: string;
  work_des?: string;
  insp_note?: string;
  pm_no?: string;
  actions_id?: string;
  pm_desc?: string;
  cuscode_id?: string;
  systemtype_id?: string;
  events_id?: string;
  issuetype_id?: string;
  pending_id?: string;
  em_workleader_id?: string;
  em_prepare_id?: string;
  
  // Report Tab Fields
  errorclass_id?: string;
  performaction_id?: string;
  work_done?: string;
  real_start_datetime?: string;
  real_finish_datetime?: string;
  errortype_id?: string;
  errorcause_id?: string;
  work_desc?: string;
  break_start_datetime?: string;
  break_finish_datetime?: string;
  
  // Equipment/Location
  equipment?: string;
  equipment_id?: string;
  equipment_name?: string;
  siteId?: string;
  location_id?: string;
  location_name?: string;
  
  // Classification
  symptom?: string;
  symptom_id?: string;
  customerCode?: string;
  customer_id?: string;
  customer_name?: string;
  workType?: string;
  worktype_id?: string;
  department?: string;
  dep_id?: string;
  department_name?: string;
  
  // Personnel
  workMaster?: string;
  master_user_id?: string;
  master_user_name?: string;
  reportBy?: string;
  requester_id?: string;
  requester_name?: string;
  requester_user_id?: string;
  requester_user_name?: string;
  main_leader_user_id?: string;
  main_leader_name?: string;
  child_worker_user_id?: string;
  child_worker_name?: string;
  
  // Scheduling
  planStartDate?: string;
  plan_start_datetime?: string;
  planFinishDate?: string;
  plan_finish_datetime?: string;
  req_start_datetime?: string;
  req_finish_datetime?: string;
  woGenDate?: string;
  creation_datetime?: string;
  post_date?: string;
  plan_hrs?: string;
  plan_manday?: string;
  
  // Priority/Status
  priority?: string;
  priority_id?: string;
  status?: string;
  jobstatus_id?: number;
  status_name?: string;
  
  // Additional Fields
  description?: string;
  detail_report?: string;
  workOrderGroup?: string;
  group_id?: string;
  group_name?: string;
  
  // Test Points & Funds
  tp_id?: string;
  testpoint_name?: string;
  fund_id?: string;
  fund_name?: string;
  
  // Planning Details
  include_inspection?: number;
  criticality?: string;
  
  // Fault Details
  faults_id?: number;
  impact_id?: string;
  faultdescription?: string;
  job_breakdown?: number;
  fault_location_id?: string;
  
  // Serial
  serial_no?: number;
  
  // Response Times (legacy)
  planRespondMins?: string;
  respondMins?: string | null;
}

export interface Activity {
  activity_id: number;
  activity?: string;
  employee_id?: string;
  employee_name?: string;
  craft_id?: string;
  craft_name?: string;
  tools_id?: string;
  tools_name?: string;
  datefrom_datetime?: string;
  dateto_datetime?: string;
}

// ✅ เพิ่ม ImageFile interface สำหรับรูปภาพ before/after
export interface ImageFile {
  image_id: number;
  workorder_id: number;
  image_type: 'before' | 'after';
  file_name: string;
  file_path: string;
  created_at: string;
}

export interface DropdownOption {
  value: string;
  label: string;
}

export interface MasterData {
  personnel: DropdownOption[];
  departments: DropdownOption[];
  locations: DropdownOption[];
  equipments: DropdownOption[];
  customers: DropdownOption[];
  testPoints: DropdownOption[];
  funds: DropdownOption[];
  workOrderGroups: DropdownOption[];
  jobStatuses: DropdownOption[];
  pmList: DropdownOption[];
  customerCodes: DropdownOption[];
  workTypes: DropdownOption[];
  priorities: DropdownOption[];
  impacts: DropdownOption[];
  symptoms: DropdownOption[];
  standardJobs: DropdownOption[];
  systemTypes: DropdownOption[];
  events: DropdownOption[];
  issueTypes: DropdownOption[];
  pendingReasons: DropdownOption[];
  actions: DropdownOption[];
  performActions: DropdownOption[];
  workLeaders: DropdownOption[];
  preparedBy: DropdownOption[];
  activityEmployees: DropdownOption[];
  activityCrafts: DropdownOption[];
  activityTools: DropdownOption[];
  errorClasses: DropdownOption[];
  errorTypes: DropdownOption[];
  errorCauses: DropdownOption[];
}

export interface PrepareData {
  standard_jobs?: string;
  work_des?: string;
  insp_note?: string;
  pm_no?: string;
  actions_id?: string;
  pm_desc?: string;
  cuscode_id?: string;
  systemtype_id?: string;
  events_id?: string;
  issuetype_id?: string;
  pending_id?: string;
  em_workleader_id?: string;
  em_prepare_id?: string;
}

export interface ReportData {
  errorclass_id?: string;
  performaction_id?: string;
  symptom_id?: string;
  work_done?: string;
  real_start_datetime?: string;
  real_finish_datetime?: string;
  errortype_id?: string;
  errorcause_id?: string;
  work_desc?: string;
  break_start_datetime?: string;
  break_finish_datetime?: string;
}