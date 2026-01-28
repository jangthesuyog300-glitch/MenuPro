import { useState } from "react";
import "../Styles/Register.css";
import { registerUser } from "../services/authService";

export default function RegisterModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "User",
    restaurantId: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "role" && value !== "Manager") {
        return { ...prev, role: value, restaurantId: "" }; // clear it
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // ✅ Validate ONLY Manager
    if (formData.role === "Manager" && !formData.restaurantId) {
      setError("RestaurantId is required for Manager.");
      setLoading(false);
      return;
    }

    try {
      await registerUser(formData);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <h3>Register</h3>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="phone" placeholder="Phone" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="User">User</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>

          {formData.role === "Manager" && (
            <input
              type="number"
              name="restaurantId"
              placeholder="Restaurant ID"
              onChange={handleChange}
              required
            />
          )}

          <button disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
