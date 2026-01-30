import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Styles/RestaurantDetails.css";

import Overview from "../Components/Overview";
import OrderOnline from "../Components/OrderOnline";
import Reviews from "../Components/Reviews";
import Photos from "../Components/Photos";
import Menu from "../Components/MenuList";

import axiosInstance, { API_ORIGIN } from "../services/axiosInstance";

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        console.error(".......Id is not there.......")
        return;
      }
      try {
        setLoading(true);
        setError("");

        const res = await axiosInstance.get(`/restaurants/${id}`);
        const r = res.data;

        const menuData = (r.foodItems || []).map((f) => ({
          id: f.foodItemId,
          name: f.foodName,
          price: f.price,
          isAvailable: f.isAvailable,
        }));

        const restaurantId = r.restaurantId ?? r.id;

        setRestaurant({
          restaurantId,
          name: r.name,
          description: r.description,
          location: r.city ? `${r.location}, ${r.city}` : r.location,
          rating: r.rating,
          imagePath: r.imagePath,
          menu: menuData,
          reviews: [],
          photos: [],
        });

        setMenu(menuData);
      } catch (err) {
        console.error("Fetch restaurant failed:", err);
        setError(
          err.response?.data?.message ||
          err.response?.data?.title ||
          err.message ||
          "Failed to load restaurant data."
        )
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);


  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="loading">{error}</p>;
  if (!restaurant) return <p className="loading">Restaurant not found.</p>;

  // ✅ imagePath from backend is like "/images/restaurants/xxx.jpg"
  const imageUrl = restaurant.imagePath
    ? `${API_ORIGIN}${restaurant.imagePath}`
    : "/images/default-restaurant.jpg";

  return (
    <div className="restaurant-details-page">
      {/* HEADER */}
      <div className="restaurant-header">
        <img src={imageUrl} alt={restaurant.name} />

        <div className="header-info">
          <h1>{restaurant.name}</h1>
          <p>{restaurant.description}</p>
          <p className="location">📍 {restaurant.location}</p>
          <span className="rating">⭐ {restaurant.rating}</span>

          <div className="action-buttons">
            <button
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    restaurant.location
                  )}`,
                  "_blank"
                )
              }
            >
              📍 Location
            </button>

            <button
              onClick={() =>
                navigator.share
                  ? navigator.share({
                    title: restaurant.name,
                    text: restaurant.description,
                    url: window.location.href,
                  })
                  : alert("Sharing not supported")
              }
            >
              🔗 Share
            </button>

            <button onClick={() => setActiveTab("reviews")}>⭐ Reviews</button>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs-bar">
        {["overview", "order", "reviews", "photos", "menu"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* BODY */}
      <div className="restaurant-body">
        <div className="left-content">
          {activeTab === "overview" && <Overview restaurant={restaurant} />}
          {activeTab === "order" && <OrderOnline menu={menu} />}
          {activeTab === "reviews" && <Reviews reviews={restaurant.reviews} />}
          {activeTab === "photos" && <Photos photos={restaurant.photos} />}
          {activeTab === "menu" && <Menu menu={menu} />}
        </div>

        {/* BOOKING */}
        <div className="booking-sidebar">
          <h3>Book a Table</h3>
          <p>Reserve your seat instantly</p>
          <button
            className="book-btn"
            onClick={() => navigate(`/restaurant/${id}/book`)}
          >
            Book a Table
          </button>
        </div>
      </div>
    </div>
  );
}
