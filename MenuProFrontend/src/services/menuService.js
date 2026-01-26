// Getting the Menu Card from the Backend
import axios from "axios";

const API_BASE_URL = "https://localhost:44315/api";

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
