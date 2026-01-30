// import axios from "axios";

// const API_ORIGIN = import.meta.env.VITE_API_URL || "https://localhost:44315";

// const axiosInstance = axios.create({
//   baseURL: `${API_ORIGIN}/api`,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
//   timeout: 15000,
// });

// // ✅ Attach ONLY "token" (one key everywhere)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     } else {
//       console.warn("⚠️ No JWT token found in localStorage");
//     }

//     console.log("➡️ API CALL:", config.method?.toUpperCase(), config.url);
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ✅ Clear session only if user really had a token
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       const token = localStorage.getItem("token");
//       console.warn("🔒 401 from", error.config?.url);

//       if (token) {
//         console.warn("🔒 Token expired/invalid. Clearing session...");
//         localStorage.removeItem("token");
//         localStorage.removeItem("role");
//         localStorage.removeItem("restaurantId");
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
// export { API_ORIGIN };





import axios from "axios";


const API_ORIGIN = import.meta.env.VITE_API_URL || "https://localhost:44315";

const axiosInstance = axios.create({
  baseURL: `${API_ORIGIN}/api`,
  headers: { "Content-Type": "application/json" }
});

// Attach token if exists
// axiosInstance.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token");
//   // console.log("TOKEN IN STORAGE:", token);

//   // config.headers = config.headers || {};
//   // if (token) config.headers.Authorization = `Bearer ${token}`;

//   // console.log("AUTH HEADER:", config.headers.Authorization);
//   // return config;


//   const token = localStorage.getItem("token");
// console.log("TOKEN IN STORAGE:", token);

// if (token && token !== "undefined" && token !== "null") {
//   config.headers.Authorization = `Bearer ${token}`;
//   console.log("AUTH HEADER:", config.headers.Authorization);
// } else {
//   delete config.headers.Authorization;
//   console.log("AUTH HEADER: (not set)");
// }

// });

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("TOKEN IN STORAGE:", token);

  if (token && token !== "undefined" && token !== "null") {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("AUTH HEADER:", config.headers.Authorization);
  } else {
    delete config.headers.Authorization;
    console.log("AUTH HEADER: (not set)");
  }

  return config; // ✅ IMPORTANT
}, (error) => Promise.reject(error));



// ❌ DO NOT auto-logout guests
axiosInstance.interceptors.response.use(
  res => res,
  err => Promise.reject(err)
);

export default axiosInstance;
export { API_ORIGIN };