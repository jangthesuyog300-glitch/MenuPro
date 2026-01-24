import { useState } from "react";
import "./Styles/Navbar.css";
import LoginModal from "./Login_Register/Login";
import RegisterModal from "./Login_Register/Register";

export default function Navbar() {

  const [searchText, setSearchText] = useState("");

  // 🔐 AUTH MODAL STATES
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // 🔁 HOVER STATE
  const [authMode, setAuthMode] = useState("login"); // login | register
  const [hoverTimer, setHoverTimer] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search text:", searchText);
  };

  /* ================================
     HOVER LOGIC (FINAL)
  ================================ */

  const handleMouseEnter = () => {
    const timer = setTimeout(() => {
      setAuthMode("register");
    }, 800); // 🔥 2 seconds

    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }

    // 🔥 Immediate reset
    setAuthMode("login");
  };

  const handleAuthClick = () => {
    if (authMode === "login") {
      setShowLogin(true);
    } else {
      setShowRegister(true);
    }
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
              <li className="nav-item">
                <a className="nav-link active" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Menu</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                  Manage
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Orders</a></li>
                  <li><a className="dropdown-item" href="#">Reservations</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Inventory</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Admin Only</a>
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

            {/* 🔁 LOGIN / REGISTER BUTTON */}
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
