import "../Styles/Card.css";
import { useNavigate } from "react-router-dom";
export default function RestaurantCard({
  id,
  name,
  location,
  rating,
  isActive,
  imagePath
}) {
  const navigate = useNavigate();

  if (!id) {
    console.error("❌ RestaurantCard rendered without id", {
      name,
      location
    });
    return null;
  }

  return (
    <div
      className="restaurant-card"
      onClick={() => navigate(`/restaurant/${id}`)}
      style={{ cursor: "pointer" }}
    >
      {/* IMAGE */}
      <div className="restaurant-image">
        <img
          src={`https://localhost:44315/${imagePath}`}
          alt={name}
        />

        <span className={`status-badge ${isActive ? "active" : "inactive"}`}>
          {isActive ? "Open" : "Closed"}
        </span>
      </div>

      {/* CONTENT */}
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
