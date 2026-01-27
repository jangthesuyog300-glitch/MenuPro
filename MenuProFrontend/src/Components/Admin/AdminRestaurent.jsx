import { useEffect, useState } from "react";
import data from "../../JSON/restaurants.json"; 
import "../../Styles/Admin/AdminRestaurent.css";

export default function AdminRestaurant() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    setRestaurants(data);
  }, []);

  const toggleStatus = (id) => {
    setRestaurants((prev) =>
      prev.map((r) =>
        r.restaurantId === id ? { ...r, isActive: !r.isActive } : r
      )
    );
  };

  return (
    <div className="admin-restaurants">
      <h1>Restaurants Management</h1>

      <table className="restaurants-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Phone</th>
            <th>Rating</th>
            <th>Status</th>
            <th>Price for Two</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {restaurants.map((r) => (
            <tr key={r.restaurantId}>
              <td>{r.restaurantId}</td>
              <td>{r.name}</td>
              <td>{r.city}</td>
              <td>{r.phone}</td>
              <td>{r.rating} ⭐</td>
              <td className={r.isActive ? "active" : "inactive"}>
                {r.isActive ? "Active" : "Inactive"}
              </td>
              <td>₹ {r.priceForTwo}</td>
              <td>
                <button onClick={() => toggleStatus(r.restaurantId)}>
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
