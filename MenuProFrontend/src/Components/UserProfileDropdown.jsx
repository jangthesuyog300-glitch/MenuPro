import { useState } from "react";
import "../Styles/UserProfileDropdown.css";
import { useNavigate } from "react-router-dom";

export default function UserProfileDropdown() {
  const [open, setOpen] = useState(false);

  const userName = localStorage.getItem("name") || "User";
  const email = localStorage.getItem("email");

  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.clear(); 
    // ✅ redirect to base URL 
    navigate("/"); 
    window.location.reload(); // simple & safe for now
  };

  return (
    <div className="profile-wrapper">
      <button
        className="profile-btn"
        onClick={() => setOpen(!open)}
      >
        👤 {userName}
      </button>

      {open && (
        <div className="profile-dropdown">
          <p><b>{userName}</b></p>
          <p className="email">{email}</p>
          <hr />
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
