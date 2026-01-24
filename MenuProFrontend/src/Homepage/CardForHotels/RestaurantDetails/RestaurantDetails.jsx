import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./RestaurantDetails.css";

// adding the tabs Components in our page 
import Overview from "./Tabs/Overview";
import OrderOnline from "./Tabs/OrderOnline";
import Reviews from "./Tabs/Reviews";
import Photos from "./Tabs/Photos";
import Menu from "./Tabs/Menu";
import { useNavigate } from "react-router-dom";



export default function RestaurantDetails() {

    // tempoaray images till backend part is not connected 
    const fallbackPhotos = [
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      ];
      

      const navigate = useNavigate();

  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // 🔁 BACKEND CALL (future-ready)
    /*
    fetch(`/api/restaurants/${id}`)
      .then(res => res.json())
      .then(data => setRestaurant(data));
    */

    // TEMP DATA
    setRestaurant({
      name: "Spice Villa",
      location: "Pune",
      rating: 4.5,
      description: "Authentic Indian cuisine with modern taste",
      imageUrl:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    });
  }, [id]);

  if (!restaurant) return <p className="loading">Loading...</p>;

  return (
    <div className="restaurant-details-page">

      {/* HEADER */}
      <div className="restaurant-header">
        <img src={restaurant.imageUrl} alt={restaurant.name} />

        <div className="header-info">
          <h1>{restaurant.name}</h1>
          <p>{restaurant.description}</p>
          <p className="location">📍 {restaurant.location}</p>
          <span className="rating">⭐ {restaurant.rating}</span>

          <div className="action-buttons">
            <button>📍 Location</button>
            <button>🔗 Share</button>
            <button>⭐ Reviews</button>
          </div>
        </div>
      </div>

      {/* TABS BAR */}
      <div className="tabs-bar">
        {["overview", "order", "reviews", "photos", "menu"].map(tab => (
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

        {/* LEFT CONTENT */}
    
        <div className="left-content">
        {activeTab === "overview" && <Overview restaurant={restaurant} />}
        {activeTab === "order" && <OrderOnline menu={restaurant.menu} />}
        {activeTab === "reviews" && <Reviews reviews={restaurant.reviews} />}
        {activeTab === "photos" && <Photos photos={restaurant.photos} />}
        {activeTab === "menu" && <Menu menu={restaurant.menu} />}
        </div>

        {/* RIGHT SIDEBAR */}
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
