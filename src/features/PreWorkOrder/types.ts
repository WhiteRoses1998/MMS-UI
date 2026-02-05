// src/types/prework.ts
export interface PreWorkJob {
  id: string;
  workOrder: string;
  reportedDate: string;
  reportBy: string;
  shortDescription: string;
  description: string;
  department: string;
  equipment: string;
  errorSymptom: string;
  customerCode: string;
  requiredStart: string;
  requiredFinish: string;
  siteId: string;
}
