import { useEffect, useState } from "react";
import "../../Styles/manager/Bookings.css";
import axiosInstance from "../../services/axiosInstance";

export default function Bookings() {
  const restaurantId = localStorage.getItem("restaurantId");

  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setError("");
        const res = await axiosInstance.get(`/bookings/restaurant/${restaurantId}`);
        setBookings(res.data || []);
      } catch (e) {
        setError(e.response?.data || "Unable to load bookings");
      }
    };

    if (restaurantId) load();
  }, [restaurantId]);

  const updateStatus = async (bookingId, newStatus) => {
    try {
      await axiosInstance.put(`/bookings/${bookingId}/status`, JSON.stringify(newStatus), {
        headers: { "Content-Type": "application/json" },
      });

      setBookings((prev) =>
        prev.map((b) => (b.bookingId === bookingId ? { ...b, status: newStatus } : b))
      );
    } catch (e) {
      alert(e.response?.data || "Failed to update status");
    }
  };

  if (!restaurantId) return <p style={{ padding: 20 }}>RestaurantId missing.</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

  return (
    <div className="bookings-container">
      <h1>Bookings</h1>

      {bookings.map((b) => (
        <div key={b.bookingId} className="booking-card">
          <h3>{b.customerName}</h3>
          <p>📞 {b.customerPhone}</p>
          <p>📅 {new Date(b.bookingDate).toLocaleDateString()}</p>
          <p>⏰ {b.time}</p>
          <p>🪑 Table: {b.tableNo}</p>
          <p>Status: <b>{b.status}</b></p>
          <p>Payment: <b>{b.payment}</b></p>

          <div className="booking-actions">
            <button onClick={() => updateStatus(b.bookingId, "Confirmed")}>Confirm</button>
            <button onClick={() => updateStatus(b.bookingId, "Cancelled")}>Cancel</button>
          </div>
        </div>
      ))}
    </div>
  );
}
