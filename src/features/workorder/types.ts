export interface WorkOrder {
  id: string;
  breakdown?: boolean;
  workOrder: string;
  faultDesc?: string;
  errorDesc?: string;
  equipment?: string;
  symptom?: string;
  customerCode?: string;
  workMaster?: string;
  workType?: string;
  department?: string;
  planStartDate?: string;
  planFinishDate?: string;
  status?: string;
  woGenDate?: string;
  priority?: string;
  planRespondMins?: string;
  respondMins?: string | null;
  siteId?: string;
  description?: string;
  workOrderGroup?: string;
  faultDescription?: string;  
}
