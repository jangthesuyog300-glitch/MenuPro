import axios from "axios";

const API_ORIGIN = import.meta.env.VITE_API_URL || "https://localhost:44315";

const axiosInstance = axios.create({
  baseURL: `${API_ORIGIN}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// ✅ Attach JWT token to every request (if present)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle expired token
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("restaurantId");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
export { API_ORIGIN };
