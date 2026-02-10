import axios from "@/lib/axios";

/** ดึง work order 1 ตัว */
export const getPreWorkOrder = (id: string) => {
  return axios.get(`/preworkorders/${id}`);
};

/** ดึง master dropdown ทั้งหมด */
export const getPreWorkDropdowns = () => {
  return axios.get(`/preworkorders/dropdowns`);
};

/** update work order */
export const updatePreWorkOrder = (id: string, data: any) => {
  return axios.put(`/preworkorders/${id}`, data);
};
