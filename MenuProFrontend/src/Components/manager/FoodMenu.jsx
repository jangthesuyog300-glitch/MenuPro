import { useEffect, useMemo, useState } from "react";
import "../../Styles/manager/FoodMenu.css";
import { useNavigate } from "react-router-dom";

export default function FoodMenu() {
  const API_BASE = useMemo(() => "https://localhost:44315", []); // keep "" if same domain
  const navigate = useNavigate();

  // ---------- Helpers ----------
  const readRestaurantId = () =>
    Number(localStorage.getItem("restaurantId") || 0);

  const readRole = () => localStorage.getItem("role") || "";

  const readErrorText = async (res) => {
    try {
      const text = await res.text();
      return text && text.trim() ? text : `HTTP ${res.status}`;
    } catch {
      return `HTTP ${res.status}`;
    }
  };

  // ---------- State ----------
  const [restaurantId, setRestaurantId] = useState(readRestaurantId());

  const [categories] = useState(["Starters", "Main Course"]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const emptyForm = {
    category: "",
    name: "",
    price: "",
    ingredients: "",
    calories: "",
    carbs: "",
    protein: "",
    fat: "",
    type: "Veg",
    spice: "Medium",
    image: "",
    available: true,
    description: "",
    restaurantId: restaurantId,
  };

  const [form, setForm] = useState(emptyForm);

  // Keep form restaurantId updated
  useEffect(() => {
    setForm((prev) => ({ ...prev, restaurantId }));
  }, [restaurantId]);

  // ✅ Watch localStorage changes (login may set restaurantId after component mounts)
  useEffect(() => {
    const interval = setInterval(() => {
      const rid = readRestaurantId();
      setRestaurantId((prev) => (prev !== rid ? rid : prev));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // ✅ If manager but no restaurantId -> kick to login/home
  useEffect(() => {
    const role = readRole();
    if (role === "Manager" && !restaurantId) {
      // You can change the route if your login page is different
      alert("RestaurantId missing. Please login again.");
      navigate("/");
    }
  }, [restaurantId, navigate]);

  // -----------------------------
  // API <-> UI mapping
  // -----------------------------
  const mapFromApi = (item) => ({
    id: item.foodItemId,
    restaurantId: item.restaurantId ?? restaurantId,
    name: item.foodName ?? "",
    price: item.price ?? 0,
    available: item.isAvailable ?? false,

    // UI-only fields
    category: "",
    ingredients: "",
    calories: "",
    carbs: "",
    protein: "",
    fat: "",
    type: "Veg",
    spice: "Medium",
    image: "",
    description: "",
  });

  // ✅ Create payload (POST)
  const mapToApiCreate = (uiItem) => ({
    restaurantId: parseInt(uiItem.restaurantId, 10),
    foodName: (uiItem.name || "").trim(),
    price: parseFloat(uiItem.price),
    isAvailable: !!uiItem.available,
  });

  // ✅ Update payload (PUT)
  const mapToApiUpdate = (uiItem) => ({
    foodName: (uiItem.name || "").trim(),
    price: parseFloat(uiItem.price),
    isAvailable: !!uiItem.available,
  });

  // -----------------------------
  // Fetch foods (by restaurant)
  // -----------------------------
  const fetchFoods = async (rid) => {
    if (!rid) {
      setFoods([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/fooditems/restaurant/${rid}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const msg = await readErrorText(res);
        throw new Error(msg);
      }

      const data = await res.json();
      const list = Array.isArray(data) ? data : [data];

      setFoods(list.map(mapFromApi));
    } catch (err) {
      console.error("FETCH FOODS ERROR:", err);
      alert(`Failed to load food items: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ IMPORTANT: Refetch when restaurantId changes
  useEffect(() => {
    if (!restaurantId) return;
    fetchFoods(restaurantId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId]);

  // -----------------------------
  // Handlers
  // -----------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openAddModal = () => {
    if (!restaurantId) {
      alert("RestaurantId missing. Please login again.");
      return;
    }
    setEditId(null);
    setForm({ ...emptyForm, restaurantId });
    setShowModal(true);
  };

  const editFood = (food) => {
    setForm({ ...food, restaurantId }); // enforce current restaurantId
    setEditId(food.id);
    setShowModal(true);
  };

  const resetForm = () => {
    setShowModal(false);
    setEditId(null);
    setForm({ ...emptyForm, restaurantId });
  };

  // ✅ SAVE / UPDATE (API)
  const saveFood = async () => {
    if (!form.category || !form.name || !form.price) {
      alert("Category, Food Name and Price are mandatory");
      return;
    }

    if (!restaurantId) {
      alert("RestaurantId missing. Please login again.");
      return;
    }

    try {
      if (editId) {
        const payload = mapToApiUpdate(form);

        console.log("PUT payload:", payload);

        const res = await fetch(`${API_BASE}/api/fooditems/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const msg = await readErrorText(res);
          throw new Error(msg);
        }

        await fetchFoods(restaurantId);
        resetForm();
      } else {
        const payload = mapToApiCreate({ ...form, restaurantId });

        console.log("POST restaurantId(localStorage):", localStorage.getItem("restaurantId"));
        console.log("POST payload:", payload);

        const res = await fetch(`${API_BASE}/api/fooditems`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const msg = await readErrorText(res);
          throw new Error(msg);
        }

        await fetchFoods(restaurantId);
        resetForm();
      }
    } catch (err) {
      console.error("SAVE ERROR:", err);
      alert(`Save failed: ${err.message}`);
    }
  };

  // ✅ DELETE (API)
  const deleteFood = async (id) => {
    if (!window.confirm("Delete this food item?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/fooditems/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const msg = await readErrorText(res);
        throw new Error(msg);
      }

      await fetchFoods(restaurantId);
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert(`Delete failed: ${err.message}`);
    }
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="food-menu">
      <div className="food-header">
        <h1>🍽 Food Menu Management</h1>
        <button className="primary-btn" onClick={openAddModal}>
          + Add Food Item
        </button>
      </div>

      {!restaurantId && (
        <p style={{ marginTop: 10 }}>
          RestaurantId not found. Please login again.
        </p>
      )}

      {loading && <p style={{ marginTop: 10 }}>Loading food items...</p>}

      <div className="menu-card">
        <table className="food-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Food Name</th>
              <th>Price (₹)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {foods.map((food) => (
              <tr key={food.id}>
                <td>{food.category || "General"}</td>
                <td>{food.name}</td>
                <td>{food.price}</td>
                <td>
                  <span className={`status ${food.available ? "active" : "inactive"}`}>
                    {food.available ? "Available" : "Out of Stock"}
                  </span>
                </td>
                <td>
                  <button className="secondary-btn" onClick={() => editFood(food)}>
                    Update
                  </button>
                  <button className="danger-btn" onClick={() => deleteFood(food.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {!loading && foods.length === 0 && restaurantId !== 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: 16 }}>
                  No food items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box large">
            <button className="close-btn" onClick={resetForm}>
              ✖
            </button>

            <h2>{editId ? "Update Food Item" : "Add Food Item"}</h2>

            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="">Select Category</option>
                {categories.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Food Name *</label>
              <input name="name" value={form.name} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
              />
            </div>

            <div className="checkbox">
              <input
                type="checkbox"
                name="available"
                checked={form.available}
                onChange={handleChange}
              />
              <span>Available</span>
            </div>

            <button className="save-btn" onClick={saveFood}>
              {editId ? "Update Food" : "Save Food"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
