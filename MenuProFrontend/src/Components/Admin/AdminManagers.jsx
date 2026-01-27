import { useState } from "react";
import "../../Styles/Admin/AdminManagers.css";

export default function AdminManagers() {
  const [managers, setManagers] = useState([
    {
      id: 1,
      name: "Amit Patil",
      email: "amit@gmail.com",
      restaurantId: 1,
      status: "Active",
    },
    {
      id: 2,
      name: "Rohit Sharma",
      email: "rohit@gmail.com",
      restaurantId: 3,
      status: "Active",
    },
    {
      id: 3,
      name: "Sneha Joshi",
      email: "sneha@gmail.com",
      restaurantId: 2,
      status: "Inactive",
    },
  ]);

  const toggleStatus = (id) => {
    setManagers((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === "Active" ? "Inactive" : "Active" }
          : m
      )
    );
  };

  const changeRestaurant = (id, newRestaurantId) => {
    setManagers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, restaurantId: newRestaurantId } : m
      )
    );
  };

  return (
    <div className="admin-managers">
      <h1>Managers Management</h1>

      <table className="managers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Restaurant ID</th>
            <th>Status</th>
            <th>Change Restaurant</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {managers.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.restaurantId}</td>
              <td className={m.status.toLowerCase()}>{m.status}</td>
              <td>
                <input
                  type="number"
                  placeholder="New ID"
                  onBlur={(e) =>
                    changeRestaurant(m.id, Number(e.target.value))
                  }
                />
              </td>
              <td>
                <button onClick={() => toggleStatus(m.id)}>
                  {m.status === "Active" ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
