import { useEffect, useMemo, useState } from "react";
import "../../Styles/manager/Bookings.css";
import axiosInstance from "../../services/axiosInstance";

export default function Bookings() {
  const restaurantId = localStorage.getItem("restaurantId");

  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setError("");
        const res = await axiosInstance.get(`/managersummary/${restaurantId}`);
        setSummary(res.data);
        setBookings(res.data?.recentBookings || []);
      } catch (e) {
        setError(e.response?.data || "Unable to load bookings");
      }
    };

    if (restaurantId) load();
  }, [restaurantId]);

  const updateStatus = async (bookingId, newStatus) => {
    try {
      await axiosInstance.put(`/managersummary/bookings/${bookingId}/status`, {
        status: newStatus,
      });

      setBookings((prev) =>
        prev.map((b) => (b.bookingId === bookingId ? { ...b, status: newStatus } : b))
      );
    } catch (e) {
      alert(e.response?.data || "Failed to update status");
    }
  };

  const statusClass = (status = "") => {
    const s = status.toLowerCase();
    if (s === "confirmed") return "badge badge--confirmed";
    if (s === "cancelled" || s === "canceled") return "badge badge--cancelled";
    if (s === "pending") return "badge badge--pending";
    return "badge";
  };

  const paymentClass = (payment = "") => {
    const p = payment.toLowerCase();
    if (p === "success") return "badge badge--confirmed";
    if (p === "failed") return "badge badge--cancelled";
    if (p === "pending") return "badge badge--pending";
    return "badge";
  };

  const calcCartTotal = (foodItems) => {
    if (!Array.isArray(foodItems) || foodItems.length === 0) return 0;
    return foodItems.reduce((sum, item) => {
      const price = Number(item.price || 0);
      const qty = Number(item.quantity || 0);
      return sum + price * qty;
    }, 0);
  };

  const sortedBookings = useMemo(() => {
    return [...bookings].sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
  }, [bookings]);

  if (!restaurantId) return <p style={{ padding: 20 }}>RestaurantId missing.</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

  return (
    <div className="bookings-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Bookings</h1>
          <p className="page-subtitle">Manage and update table reservations</p>
        </div>
      </div>

      {summary && (
        <div className="summary-card">
          <div className="summary-left">
            <div className="summary-title">
              <span className="summary-restaurant">{summary.restaurantName}</span>
              <span className="summary-meta">
                {summary.city} • {summary.location}
              </span>
            </div>

            <div className="summary-badges">
              <span className="pill">Open: {summary.openTime} - {summary.closeTime}</span>
              <span className="pill">
                Food: {summary.availableFoodItems}/{summary.totalFoodItems} available
              </span>
              <span className="pill">
                Tables: {summary.availableTables}/{summary.totalTables} available
              </span>
            </div>
          </div>

          <div className="summary-right">
            <div className="summary-stat">
              <div className="stat-label">Today</div>
              <div className="stat-value">{summary.todayBookings}</div>
            </div>
            <div className="summary-stat">
              <div className="stat-label">Upcoming</div>
              <div className="stat-value">{summary.upcomingBookings}</div>
            </div>
            <div className="summary-stat">
              <div className="stat-label">Revenue Today</div>
              <div className="stat-value">₹{summary.revenueToday}</div>
            </div>
          </div>
        </div>
      )}

      {sortedBookings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-title">No bookings found</div>
          <div className="empty-text">Bookings will appear here when customers reserve tables.</div>
        </div>
      ) : (
        <div className="booking-grid">
          {sortedBookings.map((b) => {
            const status = b.status || "Pending";
            const isConfirmed = status.toLowerCase() === "confirmed";
            const isCancelled =
              status.toLowerCase() === "cancelled" || status.toLowerCase() === "canceled";

            const cartTotal = calcCartTotal(b.foodItems);

            return (
              <div key={b.bookingId} className="booking-card-v2">
                <div className="booking-top">
                  <div className="customer">
                    <div className="avatar">{(b.customerName || "C").trim().charAt(0).toUpperCase()}</div>
                    <div className="customer-info">
                      <div className="customer-name">{b.customerName}</div>
                      <div className="customer-phone">📞 {b.customerPhone || "—"}</div>

                      {/* ✅ Booking ID */}
                      <div className="booking-id">Booking ID: <b>#{b.bookingId}</b></div>
                    </div>
                  </div>

                  <div className="booking-tags">
                    <span className={statusClass(status)}>{status}</span>
                    <span className={paymentClass(b.payment)}>{b.payment || "Unpaid"}</span>
                  </div>
                </div>

                <div className="booking-meta">
                  <div className="meta-item">📅 {new Date(b.bookingDate).toLocaleDateString()}</div>
                  <div className="meta-item">⏰ {b.time || "—"}</div>
                  <div className="meta-item">🪑 Table: {b.tableNo || "—"}</div>

                  {/* ✅ Cart total */}
                  <div className="meta-item">🧾 Cart Total: ₹{cartTotal}</div>
                </div>

                {Array.isArray(b.foodItems) && b.foodItems.length > 0 && (
                  <div className="menu-block">
                    <div className="menu-title">Menu</div>
                    <div className="menu-pills">
                      {b.foodItems.map((item, idx) => (
                        <span className="menu-pill" key={`${b.bookingId}-${item.foodItemId ?? idx}`}>
                          {item.name} × {item.quantity} • ₹{item.price}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="booking-actions-v2">
                  <button
                    className={`btn ${isConfirmed ? "btn--disabled" : "btn--primary"}`}
                    disabled={isConfirmed}
                    onClick={() => updateStatus(b.bookingId, "Confirmed")}
                  >
                    ✅ Confirm
                  </button>

                  <button
                    className={`btn ${isCancelled ? "btn--disabled" : "btn--danger"}`}
                    disabled={isCancelled}
                    onClick={() => updateStatus(b.bookingId, "Cancelled")}
                  >
                    ❌ Cancel
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
