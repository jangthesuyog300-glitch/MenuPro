// This automatically attaches the token to every request.

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:44315",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
