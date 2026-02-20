import axios from "@/lib/axios";
import { SearchFilters } from "@/components/common/SearchBox";

/** ดึง work order 1 ตัว */
export const getPreWorkOrder = (id: string) => {
  return axios.get(`/prework-orders/${id}`);
};

/** ดึง master dropdown ทั้งหมด */
export const getPreWorkDropdowns = () => {
  return axios.get(`/prework-orders/dropdowns`);
};

/** ดึง master dropdown ทั้งหมด */
export const getPreWorkList = async (filters?: SearchFilters) => {
  const params = new URLSearchParams();
  
  if (filters?.workOrder) params.append("workOrder", filters.workOrder);
  if (filters?.equipment) params.append("equipment", filters.equipment);
  if (filters?.siteId) params.append("siteId", filters.siteId);
  if (filters?.department) params.append("department", filters.department);

  const url = `/prework-orders/prework-list${params.toString() ? `?${params}` : ""}`;
  
  console.log("📡 API Call:", url);
  
  return axios.get(url);
};

/** update work order */
export const updatePreWorkOrder = (id: string, data: any) => {
  return axios.put(`/prework-orders/${id}`, data)
};
