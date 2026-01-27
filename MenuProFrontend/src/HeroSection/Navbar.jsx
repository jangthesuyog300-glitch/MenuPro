import { useState } from "react";
import "../Styles/Navbar.css";
import LoginModal from "../HeroSection/Login";
import RegisterModal from "../HeroSection/Register";
import { Link } from "react-router-dom";

import UserProfileDropdown from "../Components/UserProfileDropdown";

export default function Navbar() {

  // 🔐 AUTH STATE (read-only)
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  
  const role = localStorage.getItem("role");

  const [searchText, setSearchText] = useState("");

  // 🔐 MODAL STATES (SINGLE SOURCE OF TRUTH)
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // 🔁 HOVER STATE
  const [authMode, setAuthMode] = useState("login");
  const [hoverTimer, setHoverTimer] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search text:", searchText);
  };

  /* ================================
     HOVER LOGIC
  ================================ */

  const handleMouseEnter = () => {
    const timer = setTimeout(() => {
      setAuthMode("register");
    }, 800);
    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
    setAuthMode("login");
  };

  const handleAuthClick = () => {
    if (authMode === "login") {
      setShowLogin(true);
    } else {
      setShowRegister(true);
    }
  };


  const handleLoginSuccess = () => {
    setIsLoggedIn(true);     // 🔥 FORCE RE-RENDER
    setShowLogin(false);    // 🔥 CLOSE MODAL
    setShowRegister(false);
  };
  
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">

          <a className="navbar-brand" href="#">
            RestaurantApp
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {/* ✅ DASHBOARD (ONLY FOR MANAGER) */}
            {role === "Manager" && (
              <li className="nav-item">
                <Link className="nav-link" to="/manager">
                  Dashboard
                </Link>
              </li>
            )}

            {/* HOME (HIDDEN FOR MANAGER) */}
            {role !== "Manager" && (
              <li className="nav-item">
                <a className="nav-link active" href="/">Home</a>
              </li>
            )}

            <li className="nav-item">
              <a className="nav-link" href="#">History</a>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>

            </ul>


            {/* SEARCH */}
            <form className="d-flex me-3" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>

            {/* 🔐 AUTH AREA */}
            {!isLoggedIn ? (
              <button
                className="auth-btn"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleAuthClick}
              >
                <div className={`auth-inner ${authMode === "register" ? "flipped" : ""}`}>
                  <span className="auth-face auth-front">Login</span>
                  <span className="auth-face auth-back">Register</span>
                </div>
              </button>
            ) : (
              <UserProfileDropdown />
            )}

          </div>
        </div>
      </nav>

      {/* 🔐 LOGIN MODAL */}
            <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onRegisterClick={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
        onLoginSuccess={handleLoginSuccess}
      />


      {/* 📝 REGISTER MODAL */}
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onLoginClick={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    </>
  );
}
