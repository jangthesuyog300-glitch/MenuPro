import { useState } from "react";
import "../Styles/Navbar.css";
import LoginModal from "../HeroSection/Login";
import RegisterModal from "../HeroSection/Register";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import UserProfileDropdown from "../Components/UserProfileDropdown";

export default function Navbar() {
  // 🔐 AUTH CONTEXT = SINGLE SOURCE OF TRUTH
  const { user } = useAuth();
  const isLoggedIn = !!user;
  const role = user?.role;

  const [searchText, setSearchText] = useState("");

  // 🔐 MODAL STATES
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search:", searchText);
  };

  // 🔥 CALLED AFTER SUCCESSFUL LOGIN
  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">

          <Link className="navbar-brand" to="/">
            RestaurantApp
          </Link>

          <div className="collapse navbar-collapse">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              {/* ✅ DASHBOARD ONLY FOR MANAGER */}
              {role === "Manager" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/manager">
                    Dashboard
                  </Link>
                </li>
              )}

              {/* ✅ HOME HIDDEN FOR MANAGER */}
              {role !== "Manager" && (
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Home
                  </Link>
                </li>
              )}

              {/* ✅ HISTORY ONLY WHEN LOGGED IN */}
              {isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/history">
                    History
                  </Link>
                </li>
              )}

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

            {/* 🔐 AUTH / PROFILE */}
            {!isLoggedIn ? (
              <button
                className="auth-btn"
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
            ) : (
              <UserProfileDropdown user={user} />
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
