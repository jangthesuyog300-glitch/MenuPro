import axiosInstance from "../services/axiosInstance";

// each item: { bookingId, foodItemId, quantity, price }
export const addBookingFood = async (payload) => {
  const res = await axiosInstance.post("/bookingfoods", payload);
  return res.data;
};
