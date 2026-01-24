import "../Styles/Card.css";

export default function RestaurantCard({
  name,
  location,
  rating,
  isActive,
  imagePath
}) {
  return (
    <div className="restaurant-card">

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
