// src/lib/axios.ts
import Axios from "axios";

const axios = Axios.create({
  baseURL: "/api", // 👈 ใช้ proxy ของ Vite
  withCredentials: true,
});

export default axios;
