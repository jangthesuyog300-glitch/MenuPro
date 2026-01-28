import { useEffect, useState } from "react";
import "../../Styles/manager/Tables.css";
import axiosInstance from "../../services/axiosInstance";

export default function Tables() {
  const restaurantId = localStorage.getItem("restaurantId");
  const [tables, setTables] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setError("");
        const res = await axiosInstance.get(`/tables/restaurant/${restaurantId}`);
        setTables(res.data || []);
      } catch (e) {
        setError(e.response?.data || "Unable to load tables");
      }
    };

    if (restaurantId) load();
  }, [restaurantId]);

  if (!restaurantId) return <p style={{ padding: 20 }}>RestaurantId missing.</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

  return (
    <div className="tables-container">
      <h1>Restaurant Tables Management</h1>

      <div className="tables-grid">
        {tables.map((t) => (
          <div key={t.id} className="table-card">
            <h3>Table #{t.id}</h3>
            <p>Seats: {t.seats}</p>
            <p>Status: <b>{t.status}</b></p>
          </div>
        ))}
      </div>
    </div>
  );
}
