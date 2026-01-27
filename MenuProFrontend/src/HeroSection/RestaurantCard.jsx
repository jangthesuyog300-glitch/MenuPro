import { useNavigate } from "react-router-dom";
import "../Styles/RestaurantCard.css";

export default function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();

  return (
    <div
      className="restaurant-card"
      onClick={() => navigate(`/restaurant/${restaurant.restaurantId}`)}
    >
      {/* IMAGE */}
      <div className="image-wrapper">
        <img
          src={`/${restaurant.imagePath}`}
          alt={restaurant.name}
        />

        <span className="rating-badge">
          ⭐ {restaurant.rating}
        </span>
      </div>

      {/* INFO */}
      <div className="card-info">
        <h3>{restaurant.name}</h3>

        <p className="cuisines">
          {restaurant.cuisines?.slice(0, 3).join(", ")}
        </p>

        <p className="location">
          📍 {restaurant.city}
        </p>

        <div className="price-row">
          <span>₹{restaurant.priceForTwo} for two</span>
        </div>
      </div>
    </div>
  );
}
