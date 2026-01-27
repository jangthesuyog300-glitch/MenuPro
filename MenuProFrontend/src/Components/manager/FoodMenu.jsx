import { useState } from "react";
import "../../Styles/manager/FoodMenu.css";

export default function FoodMenu() {
  const [categories] = useState(["Starters", "Main Course"]);

  // ✅ FOOD LIST WITH 2 DUMMY ITEMS (EXTENDED STRUCTURE)
  const [foods, setFoods] = useState([
    {
      id: 1,
      category: "Starters",
      name: "Paneer Tikka",
      price: 220,
      ingredients: "Paneer, Spices, Butter",
      calories: 320,
      carbs: 18,
      protein: 20,
      fat: 22,
      type: "Veg",
      spice: "Medium",
      image: "",
      description: "Grilled paneer cubes with spices",
      available: true
    },
    {
      id: 2,
      category: "Main Course",
      name: "Paneer Butter Masala",
      price: 260,
      ingredients: "Paneer, Tomato, Butter, Cream",
      calories: 420,
      carbs: 30,
      protein: 18,
      fat: 28,
      type: "Veg",
      spice: "Mild",
      image: "",
      description: "Creamy tomato-based curry",
      available: false
    }
  ]);

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
    description: ""
  };

  const [form, setForm] = useState(emptyForm);

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // SAVE / UPDATE FOOD
  const saveFood = () => {
    if (!form.category || !form.name || !form.price) {
      alert("Category, Food Name and Price are mandatory");
      return;
    }

    if (editId) {
      setFoods(
        foods.map((f) =>
          f.id === editId ? { ...f, ...form } : f
        )
      );
    } else {
      setFoods([
        ...foods,
        { id: Date.now(), ...form }
      ]);
    }

    resetForm();
  };

  // DELETE FOOD
  const deleteFood = (id) => {
    if (!window.confirm("Delete this food item?")) return;
    setFoods(foods.filter((f) => f.id !== id));
  };

  // EDIT FOOD
  const editFood = (food) => {
    setForm(food);
    setEditId(food.id);
    setShowModal(true);
  };

  const resetForm = () => {
    setShowModal(false);
    setEditId(null);
    setForm(emptyForm);
  };

  return (
    <div className="food-menu">
      <div className="food-header">
        <h1>🍽 Food Menu Management</h1>
        <button
          className="primary-btn"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          + Add Food Item
        </button>
      </div>

      {/* FOOD LIST */}
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
                <td>{food.category}</td>
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
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box large">
            <button className="close-btn" onClick={resetForm}>✖</button>

            <h2>{editId ? "Update Food Item" : "Add Food Item"}</h2>

            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="">Select Category</option>
                {categories.map((c, i) => (
                  <option key={i}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Food Name *</label>
              <input name="name" value={form.name} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Price (₹) *</label>
              <input type="number" name="price" value={form.price} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Ingredients</label>
              <input name="ingredients" value={form.ingredients} onChange={handleChange} />
            </div>

            {/* NUTRITION */}
            <div className="nutrition">
              <input placeholder="Calories" name="calories" value={form.calories} onChange={handleChange} />
              <input placeholder="Carbs (g)" name="carbs" value={form.carbs} onChange={handleChange} />
              <input placeholder="Protein (g)" name="protein" value={form.protein} onChange={handleChange} />
              <input placeholder="Fat (g)" name="fat" value={form.fat} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Food Type</label>
              <select name="type" value={form.type} onChange={handleChange}>
                <option>Veg</option>
                <option>Non-Veg</option>
                <option>Vegan</option>
              </select>
            </div>

            <div className="form-group">
              <label>Spice Level</label>
              <select name="spice" value={form.spice} onChange={handleChange}>
                <option>Mild</option>
                <option>Medium</option>
                <option>Spicy</option>
              </select>
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input name="image" value={form.image} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} />
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
