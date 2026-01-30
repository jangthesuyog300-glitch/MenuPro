// Getting the Menu Card from the Backend
import axios from "axios";

const API_BASE_URL = "https://localhost:44315/api";
const fetchFoods = async () => {
  setLoading(true);
  try {
    const res = await fetch(
      `${API_BASE}/fooditems/restaurant/${getRestaurantId()}`,
      { headers: { "Content-Type": "application/json" } }
    );

    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

    const data = await res.json();

    // ✅ handle single OR array
    const list = Array.isArray(data) ? data : [data];

    setFoods(list.map(mapFromApi));
  } catch (err) {
    console.error(err);
    alert("Failed to load food items.");
  } finally {
    setLoading(false);
  }
};


export const getMenuByRestaurant = async (restaurantId) => {
    // tempoarary updating the details
    console.log("🚀 Calling API with restaurantId:", restaurantId, typeof restaurantId);
  
  
    const response = await axios.get(
    `${API_BASE_URL}/fooditems/restaurant/${restaurantId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  return response.data;
};
