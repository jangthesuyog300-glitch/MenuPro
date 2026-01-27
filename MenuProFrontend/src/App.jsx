

import { Routes, Route } from "react-router-dom";

import Navbar from "./HeroSection/Navbar.jsx";
import Footer from "./HeroSection/Footer.jsx";
import RestaurantDetails from "./HeroSection/RestaurantDetails.jsx";
import BookTablePage from "./HeroSection/BookTablePage.jsx";

import ManagerLayout from "./Components/manager/ManagerLayout.jsx";
import Dashboard from "./Components/manager/Dashboard.jsx";
import MyRestaurant from "./Components/manager/MyRestaurant.jsx";
import FoodMenu from "./Components/manager/FoodMenu.jsx";
import Tables from "./Components/manager/Tables.jsx";
import Bookings from "./Components/manager/Bookings.jsx";
import Payments from "./Components/manager/Payments.jsx";

import Homepage from "./HeroSection/Homepage.jsx";
import AboutUs from "./HeroSection/Aboutus.jsx";
import BookingHistory from "./HeroSection/BookingHistory.jsx";


import "./StylesH/App1.css";

export default function App() {
  return (
    <div className="app-container">

      <Navbar />

      <main className="content">
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutUs/>}/>
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
          <Route path="/history" element={<BookingHistory />} />

        </Routes>
      </main>

      <Footer />

    </div>
  );
}
