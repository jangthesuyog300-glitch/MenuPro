import { useEffect, useState } from "react";
import RestaurantCard from "../Components/RestaurantCard";
import { getActiveRestaurants } from "../services/restaurantService";
import "../Styles/Homepage.css";

export default function Homepage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getActiveRestaurants()
      .then(res => {
        setRestaurants(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  if (!restaurants.length) {
    return <p className="loading-text">🍽️ Loading restaurants...</p>;
  }

  return (
    <div className="homepage">

      <div className="top_part" >
          <div className="title">
            <h2 className="title2" >Welcome To</h2>
            <h1 className="title1" >Menu Pro</h1>
          </div>
      </div>

      <h2 className="homepage-title">Popular Restaurants Near You</h2>

      <div className="restaurant-grid">
        {restaurants.map(r => (
          <RestaurantCard
            key={r.restaurantId}
            id={r.restaurantId}
            name={r.name}
            location={r.location}
            rating={r.rating}
            isActive={r.isActive}
            imagePath={r.imagePath}
          />
        ))}
      </div>
    </div>
  );
}
