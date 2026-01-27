import { useState } from "react";
import "../../Styles/manager/FoodMenu.css";

export default function FoodMenu() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Starters",
      items: [
        { id: 1, name: "Paneer Tikka", price: 220, available: true },
        { id: 2, name: "Veg Manchurian", price: 180, available: true }
      ]
    },
    {
      id: 2,
      name: "Main Course",
      items: [
        { id: 3, name: "Butter Naan", price: 40, available: true },
        { id: 4, name: "Paneer Butter Masala", price: 260, available: false }
      ]
    }
  ]);

  const addCategory = () => {
    const name = prompt("Enter category name");
    if (!name) return;

    setCategories([
      ...categories,
      { id: Date.now(), name, items: [] }
    ]);
  };

  const deleteCategory = (catId) => {
    if (!window.confirm("Delete this category?")) return;
    setCategories(categories.filter(c => c.id !== catId));
  };

  const addItem = (catId) => {
    const name = prompt("Food name?");
    const price = prompt("Price?");
    if (!name || !price) return;

    setCategories(categories.map(c =>
      c.id === catId
        ? {
            ...c,
            items: [
              ...c.items,
              {
                id: Date.now(),
                name,
                price,
                available: true
              }
            ]
          }
        : c
    ));
  };

  const toggleAvailability = (catId, itemId) => {
    setCategories(categories.map(c =>
      c.id === catId
        ? {
            ...c,
            items: c.items.map(i =>
              i.id === itemId
                ? { ...i, available: !i.available }
                : i
            )
          }
        : c
    ));
  };

  const deleteItem = (catId, itemId) => {
    if (!window.confirm("Delete this item?")) return;
    setCategories(categories.map(c =>
      c.id === catId
        ? { ...c, items: c.items.filter(i => i.id !== itemId) }
        : c
    ));
  };

  return (
    <div className="food-menu">
      <div className="food-header">
        <h1>🍽️ Food Menu Management</h1>
        <button className="primary-btn" onClick={addCategory}>
          + Add Category
        </button>
      </div>

      {categories.map(category => (
        <div className="category-card" key={category.id}>
          <div className="category-header">
            <h2>{category.name}</h2>
            <div>
              <button
                className="secondary-btn"
                onClick={() => addItem(category.id)}
              >
                + Add Item
              </button>
              <button
                className="danger-btn"
                onClick={() => deleteCategory(category.id)}
              >
                Delete
              </button>
            </div>
          </div>

          {category.items.length === 0 ? (
            <p className="empty-text">No items added yet</p>
          ) : (
            <table className="food-table">
              <thead>
                <tr>
                  <th>Food Name</th>
                  <th>Price (₹)</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {category.items.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <span
                        className={
                          item.available ? "status active" : "status inactive"
                        }
                      >
                        {item.available ? "Available" : "Out of Stock"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="secondary-btn"
                        onClick={() =>
                          toggleAvailability(category.id, item.id)
                        }
                      >
                        Toggle
                      </button>
                      <button
                        className="danger-btn"
                        onClick={() =>
                          deleteItem(category.id, item.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
}
