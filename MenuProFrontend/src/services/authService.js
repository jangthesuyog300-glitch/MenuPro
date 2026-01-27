import axios from "./axios";

// 🔐 LOGIN
export const loginUser = async (email, password) => {
  const response = await axios.post("/auth/login", {
    email,
    password,
  });

  // Save JWT token
  localStorage.setItem("token", response.data.token);

  return response.data;
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
