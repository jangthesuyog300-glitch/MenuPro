import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/manager/MyRestaurant.css";

export default function MyRestaurant() {
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState({
    restaurantId: 101,
    managerName: "Rahul Sharma",

    name: "Spice Garden",
    description: "Authentic North Indian & Chinese Cuisine",
    location: "MG Road",
    city: "Pune",

    rating: 4.4,
    totalRatings: 1240,

    isActive: true,
    priceForTwo: 600,

    openTime: "10:00",
    closeTime: "23:00",

    phone: "9876543210",
    imagePath:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",

    tables: 18,
    foodItems: 42,
    bookings: 126
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRestaurant({
      ...restaurant,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSave = () => {
    alert("Restaurant details updated successfully!");
    console.log("UPDATED DATA:", restaurant);
  };

  return (
    <div className="my-restaurant">
      {/* Header */}
      <div className="header-row">
        <h1>🏪 My Restaurant</h1>

        <div className="top-info">
          <div>
            <span className="label">Restaurant ID</span>
            <span className="value">#{restaurant.restaurantId}</span>
          </div>
          <div>
            <span className="label">Manager</span>
            <span className="value">{restaurant.managerName}</span>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="overview-cards">
        <div className="overview-card">⭐ Rating: {restaurant.rating}</div>
        <div className="overview-card">
          👥 Reviews: {restaurant.totalRatings}
        </div>
        <div className="overview-card">
          🍽 Food Items: {restaurant.foodItems}
        </div>
        <div className="overview-card">🪑 Tables: {restaurant.tables}</div>
        <div className="overview-card">
          📅 Bookings: {restaurant.bookings}
        </div>
      </div>

      {/* Main Content */}
      <div className="restaurant-container">
        {/* Left Image */}
        <div className="restaurant-image">
          <img src={restaurant.imagePath} alt="Restaurant" />
          <button className="secondary-btn">Change Image</button>
        </div>

        {/* Right Form */}
        <div className="restaurant-form">
          <div className="form-group">
            <label>Restaurant Name</label>
            <input
              name="name"
              value={restaurant.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={restaurant.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input
                name="location"
                value={restaurant.location}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                name="city"
                value={restaurant.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone</label>
              <input
                name="phone"
                value={restaurant.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Price for Two (₹)</label>
              <input
                type="number"
                name="priceForTwo"
                value={restaurant.priceForTwo}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Open Time</label>
              <input
                type="time"
                name="openTime"
                value={restaurant.openTime}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Close Time</label>
              <input
                type="time"
                name="closeTime"
                value={restaurant.closeTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-toggle">
            <label>
              <input
                type="checkbox"
                name="isActive"
                checked={restaurant.isActive}
                onChange={handleChange}
              />
              Restaurant Active
            </label>
          </div>

          <div className="action-buttons">
            <button className="primary-btn" onClick={handleSave}>
              Save Changes
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/manager/food")}
            >
              Manage Food Menu →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
