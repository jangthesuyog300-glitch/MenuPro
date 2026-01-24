import './Card.css';
import { useNavigate } from "react-router-dom";

export default function RestaurantCard({    
  id,
  name,
  location,
  rating,
  isActive,
  imageUrl
}) {

  const navigate = useNavigate();

  // 🔥 ONE NAVIGATION FUNCTION
  const goToDetails = () => {
    navigate(`/restaurant/${id}`);
  };

  return (
    // 🔥 CARD CLICK
    <div className="restaurant-card" onClick={goToDetails}>

      {/* IMAGE */}
      <div className="restaurant-image">
        <img src={imageUrl} alt={name} />
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

          {/* 🔥 PREVENT DOUBLE CLICK */}
          <button
            className="view-btn"
            onClick={(e) => {
              e.stopPropagation(); // 🔥 VERY IMPORTANT
              goToDetails();
            }}
          >
            View
          </button>

        </div>
      </div>

    </div>
  );
}
