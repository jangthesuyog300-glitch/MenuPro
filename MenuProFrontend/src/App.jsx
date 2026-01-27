<<<<<<< HEAD
import { Route, Routes } from "react-router-dom";

=======
import { Routes, Route } from "react-router-dom";

import Navbar from "./HeroSection/Navbar.jsx";
import Footer from "./HeroSection/Footer.jsx";
import RestaurantDetails from "./HeroSection/RestaurantDetails.jsx";
>>>>>>> 93bbc72ea112b80661a29752467a97b5051fdff7
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
<<<<<<< HEAD
import Homepage from "./HeroSection/Homepage.jsx";

/* ================= ADMIN IMPORTS ================= */
import AdminDashboard from "./Components/Admin/AdminDashboard.jsx";
import AdminLayout from "./Components/Admin/AdminLayout.jsx";
=======
import BookingHistory from "./HeroSection/BookingHistory.jsx";

import ManagerRoute from "./Components/manager/ManagerRoute.jsx";
import PublicRoute from "./Components/PublicRoute.jsx";
>>>>>>> 93bbc72ea112b80661a29752467a97b5051fdff7

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
<<<<<<< HEAD
          <Route path="/" element={<Homepage />} />
=======
          <Route path="/" element={<PublicRoute><Homepage /></PublicRoute>}/>
>>>>>>> 93bbc72ea112b80661a29752467a97b5051fdff7
          <Route path="/about" element={<AboutUs />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          <Route path="/restaurant/:id/book" element={<BookTablePage />} />

<<<<<<< HEAD
          {/* ================= MANAGER ROUTES ================= */}
          <Route path="/manager" element={<ManagerLayout />}>
=======
          {/* ================= MANAGER ROUTES (PROTECTED) ================= */}
          <Route
            path="/manager"
            element={
              <ManagerRoute>
                <ManagerLayout />
              </ManagerRoute>
            }
          >
>>>>>>> 93bbc72ea112b80661a29752467a97b5051fdff7
            <Route index element={<Dashboard />} />
            <Route path="restaurant" element={<MyRestaurant />} />
            <Route path="food" element={<FoodMenu />} />
            <Route path="tables" element={<Tables />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="payments" element={<Payments />} />
<<<<<<< HEAD
          </Route>

          {/* ================= ADMIN ROUTES ================= */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="restaurants" element={<AdminRestaurant />} />
            <Route path="managers" element={<AdminManagers />} />
            
=======
>>>>>>> 93bbc72ea112b80661a29752467a97b5051fdff7
          </Route>
          <Route path="/history" element={<BookingHistory />} />

        </Routes>
      </main>

      <Footer />

    </div>
  );
}
