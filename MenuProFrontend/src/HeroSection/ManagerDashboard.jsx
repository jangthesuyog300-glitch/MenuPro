import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function ManagerDashboard() {
  const navigate = useNavigate();

  const restaurantId = localStorage.getItem("restaurantId");
  const role = localStorage.getItem("role");

  const [restaurant, setRestaurant] = useState(null);
  const [tables, setTables] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // ✅ protect route
    if (!role || (role !== "Manager" && role !== "Admin")) {
      navigate("/login");
      return;
    }

    if (!restaurantId) {
      setError("No RestaurantId found for this manager.");
      return;
    }

    const load = async () => {
      try {
        setError("");

        const [rRes, tRes, fRes] = await Promise.all([
          axiosInstance.get(`/restaurants/${restaurantId}`),
          axiosInstance.get(`/tables/restaurant/${restaurantId}`),
          axiosInstance.get(`/fooditems/restaurant/${restaurantId}`),
        ]);

        setRestaurant(rRes.data);
        setTables(tRes.data);
        setFoodItems(fRes.data);
      } catch (e) {
        setError(e.response?.data || "Failed to load dashboard");
      }
    };

    load();
  }, [restaurantId, role, navigate]);

  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;
  if (!restaurant) return <p style={{ padding: 20 }}>Loading dashboard...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Manager Dashboard</h1>

      <div style={{ marginTop: 10 }}>
        <h2>{restaurant.name}</h2>
        <p>📍 {restaurant.location}{restaurant.city ? `, ${restaurant.city}` : ""}</p>
        <p>⭐ {restaurant.rating}</p>
      </div>

      <hr />

      <h3>Tables ({tables.length})</h3>
      <ul>
        {tables.map((t) => (
          <li key={t.tableId}>
            Table #{t.tableNumber} | Capacity: {t.capacity} | {t.status}
          </li>
        ))}
      </ul>

      <h3>Food Items ({foodItems.length})</h3>
      <ul>
        {foodItems.map((f) => (
          <li key={f.foodItemId}>
            {f.foodName} - ₹{f.price} - {f.isAvailable ? "Available" : "Not Available"}
          </li>
        ))}
      </ul>
    </div>
  );
}
