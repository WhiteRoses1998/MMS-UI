// src/lib/axios.ts
import Axios from "axios";

const axios = Axios.create({
  baseURL: "/api", // 👈 ใช้ proxy ของ Vite
  withCredentials: true,
});

// ✅ Request Interceptor: เพิ่ม token ไปกับ request
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor: จัดการ 401 error
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token หมดอายุ หรือไม่ถูกต้อง
      localStorage.removeItem("token");
      window.location.href = "/login"; // redirect ไป login
    }
    return Promise.reject(error);
  }
);

export default axios;
