import { useEffect, useState } from "react";
import "../Styles/HistoryPage.css";
import { getMyBookingHistory } from "../services/bookingService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HistoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ GET USER FROM CONTEXT
  const { user } = useAuth();
  const userId = user?.userId;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined" || token === "null") {
      navigate("/", { replace: true });
      return;
    }

    if (!userId) {
      // context not ready yet
      return;
    }

    const run = async () => {
      try {
        setLoading(true);
        setError("");

        // ✅ PASS userId CORRECTLY
        const data = await getMyBookingHistory(userId);
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("History fetch failed:", e);
        setError(
          e.response?.data?.message ||
            e.response?.data ||
            e.message ||
            "Failed to load history."
        );
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [navigate, userId]);

  if (loading) return <div className="hist-wrap">Loading...</div>;
  if (error) return <div className="hist-wrap hist-error">{String(error)}</div>;

  return (
    <div className="hist-wrap">
      <div className="hist-header">
        <h1>My Booking History</h1>
        <p>Paid amount, restaurant, items, time slot and guests.</p>
      </div>

      {items.length === 0 ? (
        <div className="hist-empty">
          <h3>No bookings found</h3>
          <button className="hist-btn" onClick={() => navigate("/")}>
            Browse Restaurants
          </button>
        </div>
      ) : (
        <div className="hist-grid">
          {items.map((b) => (
            <div className="hist-card" key={b.bookingId}>
              <div className="hist-top">
                <div>
                  <div className="hist-id">Booking #{b.bookingId}</div>
                  <div className="hist-sub">
                    {new Date(b.bookingDate).toLocaleString()}
                  </div>
                </div>

                <span
                  className={`hist-status ${String(
                    b.bookingStatus || ""
                  ).toLowerCase()}`}
                >
                  {b.bookingStatus}
                </span>
              </div>

              <div className="hist-restro">
                <div className="hist-restro-name">{b.restaurantName}</div>
                <div className="hist-meta">
                  <span>
                    Time: <b>{b.timeSlot}</b>
                  </span>
                  <span>
                    Guests: <b>{b.guests}</b>
                  </span>
                </div>
              </div>

              <div className="hist-amounts">
                <div className="hist-amt">
                  <span>Bill Amount</span>
                  <b>₹{Number(b.bookingAmount).toFixed(2)}</b>
                </div>
                <div className="hist-amt paid">
                  <span>Paid Amount</span>
                  <b>₹{Number(b.paidAmount).toFixed(2)}</b>
                </div>
              </div>

              <div className="hist-items">
                <div className="hist-items-title">Food Items</div>

                {!b.foodItems || b.foodItems.length === 0 ? (
                  <div className="hist-items-empty">
                    No food items saved.
                  </div>
                ) : (
                  <ul className="hist-items-list">
                    {b.foodItems.map((fi, idx) => (
                      <li key={idx} className="hist-item">
                        <span className="hist-item-name">{fi.name}</span>
                        <span className="hist-item-qty">
                          × {fi.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
