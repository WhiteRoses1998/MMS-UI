export interface WorkOrder {
  id: string;
  breakdown: boolean;
  usageAlert: boolean;
  workOrder: string;
  faultDesc: string;
  errorDesc: string;
  equipment: string;
  symptom: string;
  customerCode: string;
  workMaster: string;
  workType: string;
  department: string;
  planStartDate: string;
  planFinishDate: string;
  status: string;
  woGenDate: string;
  priority: string;
  planRespondMins: string;
  respondMins: string | null;
  siteId: string;

  // ถ้าต้องการ compatibility กับ onSelect (ส่ง object เดิม)
  description?: string;   // optional ถ้า onSelect ต้องการ description
  // ... properties อื่นจาก WorkOrder ถ้าต้องการ
}
