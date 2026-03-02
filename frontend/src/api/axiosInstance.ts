import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "https://localhost:44368/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const raw = localStorage.getItem("firy_auth");
  if (raw) {
    const auth = JSON.parse(raw);
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

export default axiosInstance;
