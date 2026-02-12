import axios from "@/lib/axios";

/** ดึง work order 1 ตัว */
export const getPreWorkOrder = (id: string) => {
  return axios.get(`/prework-orders/${id}`);
};

/** ดึง master dropdown ทั้งหมด */
export const getPreWorkDropdowns = () => {
  return axios.get(`/prework-orders/dropdowns`);
};

/** ดึง master dropdown ทั้งหมด */
export const getPreWorkList = () => {
  return axios.get(`/prework-orders/prework-list`);
};

/** update work order */
export const updatePreWorkOrder = (id: string, data: any) => {
  return axios.put(`/prework-orders/${id}`, data)
};
