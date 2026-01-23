export interface WorkOrder {
  id: string;
  reporter?: string;
  issue?: string;
  department?: string;
  location?: string;
  date?: string;
  status: string;
  statusText?: string;
  breakdown?: string;
  usageAlert?: string;
  description?: string;
}
