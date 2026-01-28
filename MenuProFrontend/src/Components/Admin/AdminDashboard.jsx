import { useEffect, useState } from "react";
import "../../Styles/Admin/AdminDashboard.css";
import { getAdminStats } from "../../services/adminService";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setError("");
        const data = await getAdminStats();
        setStats(data);
      } catch (e) {
        setError(e.response?.data || "Failed to load stats");
      }
    };
    load();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!stats) return <p>Loading...</p>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h2>Total Restaurants</h2>
          <p>{stats.restaurants}</p>
        </div>

        <div className="card">
          <h2>Total Managers</h2>
          <p>{stats.managers}</p>
        </div>

        <div className="card active">
          <h2>Active Restaurants</h2>
          <p>{stats.active}</p>
        </div>

        <div className="card inactive">
          <h2>Inactive Restaurants</h2>
          <p>{stats.inactive}</p>
        </div>
      </div>
    </div>
  );
}
