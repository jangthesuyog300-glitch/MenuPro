import axios from "./axios";

// 🔐 LOGIN
export const loginUser = async (email, password) => {
  const res = await axiosInstance.post("/auth/login", {
    email,
    password,
  });
  return res.data; // { token, userId, name, role, restaurantId }
};
 


// 📝 REGISTER
export const registerUser = async (userData) => {
  console.log("Register payload being sent:", userData); // 🔥 TEMP DEBUG
  return axios.post("/auth/register", userData);
};


// 🚪 LOGOUT (optional but useful)
export const logoutUser = () => {
  localStorage.removeItem("token");
};
