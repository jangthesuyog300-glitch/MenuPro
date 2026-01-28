import { useEffect, useState } from "react";
import "../../Styles/Admin/AdminRestaurent.css";
import {
  getAdminRestaurants,
  toggleRestaurantStatus
} from "../../services/adminService";

export default function AdminRestaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAdminRestaurants();
      setRestaurants(data || []);
    } catch (e) {
      setError(e.response?.data || "Failed to load restaurants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleToggleStatus = async (id) => {
    try {
      setError("");

      // optimistic UI update
      setRestaurants((prev) =>
        prev.map((r) =>
          r.restaurantId === id ? { ...r, isActive: !r.isActive } : r
        )
      );

      await toggleRestaurantStatus(id);
    } catch (e) {
      setError(e.response?.data || "Failed to update status");
      // revert by reloading from server
      load();
    }
  };

  return (
    <div className="admin-restaurants">
      <h1>Restaurants Management</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      <table className="restaurants-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {restaurants.map((r) => (
            <tr key={r.restaurantId}>
              <td>{r.restaurantId}</td>
              <td>{r.name}</td>
              <td>{r.city}</td>
              <td>{r.location}</td>
              <td className={r.isActive ? "active" : "inactive"}>
                {r.isActive ? "Active" : "Inactive"}
              </td>
              <td>
                <button onClick={() => handleToggleStatus(r.restaurantId)}>
                  {r.isActive ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
