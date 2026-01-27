import axiosInstance from "../services/axiosInstance";

// { bookingId, amount, paymentType, paymentStatus, paymentDate }
export const createPayment = async (payload) => {
  const res = await axiosInstance.post("/payments", payload);
  return res.data;
};
