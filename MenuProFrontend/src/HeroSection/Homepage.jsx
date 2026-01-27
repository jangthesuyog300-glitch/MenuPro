// React hooks for managing state and side effects
import { useEffect, useState } from "react";

// Reusable card component to display individual restaurant data
import RestaurantCard from "../Components/RestaurantCard";

// Service function to fetch active restaurants from backend API
import { getActiveRestaurants } from "../services/restaurantService";


// Page-level styles (uses variables.css internally)
import "../Styles/Homepage.css";

export default function Homepage() {

  // State to store list of restaurants fetched from backend
  const [restaurants, setRestaurants] = useState([]);

  // useEffect runs once when the component mounts
  // Used here to fetch restaurant data from backend
  useEffect(() => {
    getActiveRestaurants()
      .then(res => {
        console.log("API DATA:", res.data); // Debug: verify API response
        setRestaurants(res.data);           // Update state with fetched data
      })
      .catch(err => console.error(err));    // Handle API errors
  }, []); // Empty dependency array → runs only once

  // Show loading text while data is being fetched
  if (!restaurants.length) {
    return <p className="loading-text">Loading restaurants...</p>;
  }

  // Render list of restaurants using reusable RestaurantCard component
  return (
    <div className="homepage-container">
      
      {restaurants.map(r => (
       <RestaurantCard
       key={r.restaurantId}
       id={r.restaurantId}          // ✅ THIS IS THE MISSING LINE
       name={r.name}
       location={r.location}
       rating={r.rating}
       isActive={r.isActive}
       imagePath={r.imagePath}
     />
     
      ))}
    </div>
  );
}
