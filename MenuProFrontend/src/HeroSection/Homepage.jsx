import { useEffect, useState } from "react";
import RestaurantCard from "../Components/RestaurantCard";
import { getActiveRestaurants } from "../services/restaurantService";

export default function Homepage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getActiveRestaurants()
      .then(res => {
        console.log("API DATA:", res.data); // 🔍 debug proof
        setRestaurants(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  if (!restaurants.length) {
    return <p style={{ padding: "30px" }}>Loading restaurants...</p>;
  }

  return (
    <div style={{display:"flex", flexWrap:"wrap" , padding: "30px", gap: "20px" }}>
      {restaurants.map(r => (
        <RestaurantCard
          key={r.restaurantId}
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
