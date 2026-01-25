import axios from "axios";
const API_URL = "https://localhost:44315/api/restaurants";

// const API_URL = "https://localhost:44315/api/restaurants";

// export const getActiveRestaurants = () => {
//   return axios.get(`${API_URL}/public`);
// };

export const getRestaurantById = (id) => {
  return axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
};


export const getActiveRestaurants = () => {
  return axios.get(`${API_URL}/public`);
};


// import axios from "axios";

// const API_URL = "https://localhost:5001/api/restaurants";

// export const getRestaurantById = (id) => {
//   return axios.get(`${API_URL}/${id}`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`
//     }
//   });
// };
