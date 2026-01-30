import axiosInstance from "../services/axiosInstance";

// ================= MANAGERS =================
export const getAdminManagers = async () => {
  const res = await axiosInstance.get("/admin/managers");
  return res.data;
};

export const createManager = async (payload) => {
  const res = await axiosInstance.post("/admin/managers", payload);
  return res.data;
};

export const deleteManager = async (id) => {
  const res = await axiosInstance.delete(`/admin/managers/${id}`);
  return res.data;
};

// ================= RESTAURANTS =================
export const getAdminRestaurants = async () => {
  const res = await axiosInstance.get("/admin/restaurants");
  return res.data;
};

// ✅ NEW: Toggle restaurant active / inactive
export const toggleRestaurantStatus = async (id) => {
  const res = await axiosInstance.put(`/admin/restaurants/${id}/toggle`);
  return res.data;
};

// ================= DASHBOARD =================
export const getAdminStats = async () => {
  const res = await axiosInstance.get("/admin/stats");
  return res.data;
};

// =================ADD RESTAURANTS =================
export const createRestaurant = async (payload) => {
  const res = await axiosInstance.post("/restaurants", payload);
  return res.data;
};