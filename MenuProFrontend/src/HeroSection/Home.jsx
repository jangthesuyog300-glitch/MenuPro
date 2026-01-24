import { useEffect, useState } from "react";
import { getActiveRestaurants } from "../services/restaurantService";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActiveRestaurants()
      .then(res => {
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
      {restaurants.map(r => (
        <div key={r.restaurantId} className="restaurant-card">
          <img
            src={`https://localhost:5001${r.imagePath}`}
            alt={r.name}
          />

          <h3>{r.name}</h3>
          <p>{r.location}</p>
          <p>⭐ {r.rating}</p>

          <button
            onClick={() => window.location.href = `/restaurant/${r.restaurantId}`}
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}
