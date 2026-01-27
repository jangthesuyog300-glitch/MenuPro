import { Route, Routes } from "react-router-dom";

import BookTablePage from "./HeroSection/BookTablePage.jsx";
import Footer from "./HeroSection/Footer.jsx";
import Navbar from "./HeroSection/Navbar.jsx";
import RestaurantDetails from "./HeroSection/RestaurantDetails.jsx";

import Bookings from "./Components/manager/Bookings.jsx";
import Dashboard from "./Components/manager/Dashboard.jsx";
import FoodMenu from "./Components/manager/FoodMenu.jsx";
import ManagerLayout from "./Components/manager/ManagerLayout.jsx";
import MyRestaurant from "./Components/manager/MyRestaurant.jsx";
import Payments from "./Components/manager/Payments.jsx";
import Tables from "./Components/manager/Tables.jsx";

import AboutUs from "./HeroSection/Aboutus.jsx";
import Homepage from "./HeroSection/Homepage.jsx";

/* ================= ADMIN IMPORTS ================= */
import AdminDashboard from "./Components/Admin/AdminDashboard.jsx";
import AdminLayout from "./Components/Admin/AdminLayout.jsx";

import AdminRestaurant from "./Components/Admin/AdminRestaurent.jsx";
import "./StylesH/App1.css";
import AdminManagers from "./Components/Admin/AdminManagers.jsx";

export default function App() {
  return (
    <div className="app-container">

      <Navbar />

      <main className="content">
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutUs />} />
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

          {/* ================= ADMIN ROUTES ================= */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="restaurants" element={<AdminRestaurant />} />
            <Route path="managers" element={<AdminManagers />} />
            
          </Route>

        </Routes>
      </main>

      <Footer />

    </div>
  );
}
