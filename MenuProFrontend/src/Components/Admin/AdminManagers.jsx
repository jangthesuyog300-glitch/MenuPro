import { useEffect, useState } from "react";
import "../../Styles/Admin/AdminManagers.css";
import {
  getAdminManagers,
  createManager,
  deleteManager,
  getAdminRestaurants
} from "../../services/adminService";

export default function AdminManagers() {
  const [managers, setManagers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "manager123",
    restaurantId: ""
  });

  const load = async () => {
    try {
      setLoading(true);
      setError("");

      const [m, r] = await Promise.all([
        getAdminManagers(),
        getAdminRestaurants()
      ]);

      setManagers(m || []);
      setRestaurants(r || []);
    } catch (e) {
      setError(e.response?.data || "Failed to load managers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      setError("");

      await createManager({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        restaurantId: Number(form.restaurantId)
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        password: "manager123",
        restaurantId: ""
      });

      load();
    } catch (e2) {
      setError(e2.response?.data || "Failed to create manager");
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to remove this manager?");
    if (!ok) return;

    try {
      setError("");
      await deleteManager(id);
      setManagers((prev) => prev.filter((m) => m.userId !== id));
    } catch (e) {
      setError(e.response?.data || "Failed to delete manager");
    }
  };

  return (
    <div className="admin-managers">
      <h1>Managers Management</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      {/* ✅ ADD MANAGER FORM */}
      <form onSubmit={handleCreate} className="add-manager-form" style={{ marginBottom: 20 }}>
        <h3>Add Manager</h3>

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <select
          value={form.restaurantId}
          onChange={(e) => setForm({ ...form, restaurantId: e.target.value })}
          required
        >
          <option value="">Select Restaurant</option>
          {restaurants.map((r) => (
            <option key={r.restaurantId} value={r.restaurantId}>
              {r.restaurantId} - {r.name}
            </option>
          ))}
        </select>

        <button type="submit">Add Manager</button>
      </form>

      {/* ✅ MANAGER LIST */}
      <table className="managers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Restaurant ID</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {managers.map((m) => (
            <tr key={m.userId}>
              <td>{m.userId}</td>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.phone}</td>
              <td>{m.restaurantId ?? "-"}</td>
              <td>
                <button onClick={() => handleDelete(m.userId)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
