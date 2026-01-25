// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }
// export default App

import { Routes, Route } from "react-router-dom";

import Navbar from "./HeroSection/Navbar.jsx";
import Footer from "./HeroSection/Footer.jsx";
import Homepage from "./HeroSection/Homepage.jsx";
import RestaurantDetails from "./HeroSection/RestaurantDetails.jsx";
import BookTablePage from "./HeroSection/BookTablePage.jsx";

import ManagerLayout from "./Components/manager/ManagerLayout.jsx";
import Dashboard from "./Components/manager/Dashboard.jsx";
import MyRestaurant from "./Components/manager/MyRestaurant.jsx";
import FoodMenu from "./Components/manager/FoodMenu.jsx";
import Tables from "./Components/manager/Tables.jsx";
import Bookings from "./Components/manager/Bookings.jsx";
import Payments from "./Components/manager/Payments.jsx";

import "./StylesH/App1.css";

export default function App() {
  return (
    <div className="app-container">

      <Navbar />

      <main className="content">
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Homepage />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          <Route path="/restaurant/:id/book" element={<BookTablePage />} />

          {/* ================= MANAGER ROUTES ================= */}
          <Route path="/manager" element={<ManagerLayout />}>

            <Route index element={<Dashboard />} />
            <Route path="restaurant" element={<MyRestaurant />} />
            <Route path="food" element={<FoodMenu />} />
            <Route path="tables" element={<Tables />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="payments" element={<Payments />} />

          </Route>

        </Routes>
      </main>

      <Footer />

    </div>
  );
}
