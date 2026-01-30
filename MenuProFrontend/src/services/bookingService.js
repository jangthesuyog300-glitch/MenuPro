import axiosInstance from "../services/axiosInstance";

// bookingPayload must match Booking model:
// { userId, restaurantId, tableId, timeSlotId, bookingDate, bookingStatus, bookingAmount }
export const createBooking = async (bookingPayload) => {
  const res = await axiosInstance.post("/bookings", bookingPayload);
  return res.data; // returns Booking with bookingId
};

export const getUserBookings = async (userId) => {
  const res = await axiosInstance.get(`/bookings/user/${userId}`);
  return res.data;
};

export const getMyBookingHistory = async (userId) => {
  const res = await axiosInstance.get(`/history/${userId}`);
  return res.data;
};