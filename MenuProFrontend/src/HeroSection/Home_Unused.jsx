import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActiveRestaurants } from "../services/restaurantService";
import RestaurantCard from "../Components/RestaurantCard";

export default function Homepage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getActiveRestaurants()
      .then(res => {
        console.log("API DATA:", res.data);
        setRestaurants(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading restaurants...</p>;

  return (
    <div className="restaurant-list">
      {restaurants.map(restaurant => (
        <RestaurantCard
          key={restaurant.restaurantId}
          id={restaurant.restaurantId}          // ✅ CRITICAL FIX
          name={restaurant.name}
          location={restaurant.location}
          rating={restaurant.rating}
          isActive={restaurant.isActive}
          imagePath={restaurant.imagePath}
        />
      ))}
    </div>
  );
}
