import { useEffect, useState } from "react";
import "../../Styles/manager/Tables.css";
import axiosInstance from "../../services/axiosInstance";

export default function Tables() {
  const [restaurantId, setRestaurantId] = useState(null);
  const [tables, setTables] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("restaurantId");
    setRestaurantId(id);
  }, []);

useEffect(() => {
  if (!restaurantId) return;

  const load = async () => {
    try {
      setError("");
      const res = await axiosInstance.get(`/tables/restaurant/${restaurantId}`);
      setTables(res.data || []);
    } catch (e) {
      console.log("TABLES API ERROR:", e.response?.status, e.response?.data);

      const status = e.response?.status;
      if (status === 401) setError("401 Unauthorized: Token missing/expired.");
      else if (status === 403) setError("403 Forbidden: Only Manager/Admin can view tables.");
      else if (status === 404) setError("404 Not Found: Check API route (/api/tables/restaurant/...).");
      else setError(e.response?.data?.message || e.message || "Unable to load tables");
    }
  };

  load();
}, [restaurantId]);


  if (!restaurantId)
    return <p style={{ padding: 20 }}>RestaurantId missing.</p>;

  if (error)
    return <p style={{ padding: 20, color: "red" }}>{error}</p>;

  return (
    <div className="tables-container">
      <h1>Restaurant Tables Management</h1>

      <div className="tables-grid">
        {tables.map((t) => (
          <div key={t.id ?? t.Id} className="table-card">
            <h3>Table #{t.id ?? t.Id}</h3>
            <p>Seats: {t.seats ?? t.Seats}</p>
            <p>
              Status: <b>{t.status ?? t.Status}</b>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
