import { useEffect, useState } from "react";
import "../../Styles/manager/Dashboard.css";
import axiosInstance from "../../services/axiosInstance";

export default function Dashboard() {
  const restaurantId = localStorage.getItem("restaurantId");

  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setError("");
        const res = await axiosInstance.get(`/manager/summary/${restaurantId}`);
        setSummary(res.data);
      } catch (e) {
        setError(e.response?.data || "Unable to load dashboard");
      }
    };

    if (restaurantId) load();
  }, [restaurantId]);

  if (!restaurantId) return <p style={{ padding: 20 }}>RestaurantId missing. Login as Manager.</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;
  if (!summary) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div className="manager-dashboard">
      <div className="dashboard-header">
        <h1>Manager Dashboard</h1>
        <p>Today’s restaurant overview</p>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <h3>₹{summary.revenueToday}</h3>
          <p>Revenue Today</p>
        </div>

        <div className="kpi-card">
          <h3>{summary.totalBookingsToday}</h3>
          <p>Total Bookings</p>
        </div>

        <div className="kpi-card">
          <h3>{summary.activeTables}</h3>
          <p>Active Tables</p>
        </div>

        <div className="kpi-card">
          <h3>{summary.averageRating} ⭐</h3>
          <p>Average Rating</p>
        </div>
      </div>
    </div>
  );
}
