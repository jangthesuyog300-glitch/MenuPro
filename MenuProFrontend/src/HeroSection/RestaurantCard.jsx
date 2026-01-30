import "../Styles/Card.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

export default function RestaurantCard({
  id,
  name,
  location,
  rating,
  isActive,
  imagePath,
}) {
  const navigate = useNavigate();

  if (!id) return null;

  const handleRestaurantClick = async () => {
    const token = localStorage.getItem("token");

    // ✅ Always store selected restaurant
    localStorage.setItem("selectedRestaurantId", String(id));

    // 🚶 If not logged in → just navigate
    if (!token || token === "undefined" || token === "null") {
      console.warn("⚠️ No token found. Skipping DB save.");
      navigate(`/restaurant/${id}`);
      return;
    }

    // 🔐 Logged in → save selection to backend
    try {
      await axiosInstance.put("/users/me/restaurant", {
        restaurantId: id,
      });
      console.log("✅ Selected restaurant saved to backend:", id);
    } catch (err) {
      console.error(
        "❌ Failed to save selected restaurant:",
        err.response?.status,
        err.response?.data
      );
    }

    navigate(`/restaurant/${id}`);
  };

  return (
    <div className="restaurant-card" onClick={handleRestaurantClick}>
      <div className="restaurant-image">
        <img
          src={`https://localhost:44315/${imagePath}`.replace(
            "44315//",
            "44315/"
          )}
          alt={name}
        />
        <span className={`status-badge ${isActive ? "active" : "inactive"}`}>
          {isActive ? "Open" : "Closed"}
        </span>
      </div>

      <div className="restaurant-content">
        <h3 className="restaurant-name">{name}</h3>
        <p className="restaurant-location">📍 {location}</p>
        <div className="restaurant-footer">
          <span className="restaurant-rating">⭐ {rating}</span>
        </div>
      </div>
    </div>
  );
}
