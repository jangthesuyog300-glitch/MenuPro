import { useEffect, useState } from "react";
import { getUserBookings } from "../services/bookingService";

export default function BookingHistory() {
  const userId = localStorage.getItem("userId");
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getUserBookings(userId);
        setBookings(data || []);
      } catch (e) {
        setError(e.response?.data || "Failed to load bookings");
      }
    };
    if (userId) load();
  }, [userId]);

  if (!userId) return <p>Please login</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>My Booking History</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((b) => (
          <div
            key={b.bookingId}
            style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8, marginBottom: 10 }}
          >
            <p><b>BookingId:</b> {b.bookingId}</p>
            <p><b>Status:</b> {b.bookingStatus}</p>
            <p><b>Date:</b> {new Date(b.bookingDate).toLocaleString()}</p>
            <p><b>Amount:</b> ₹{b.bookingAmount}</p>
          </div>
        ))
      )}
    </div>
  );
}
