import { useState } from "react";
import "../Styles/Login.css";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginModal({
  isOpen,
  onClose,
  onRegisterClick,
  onLoginSuccess, // 🔥 IMPORTANT
}) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🚫 If modal is not open, render nothing
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submit clicked");
  
    setError("");
    setLoading(true);
  
    try {
      // console.log(" Calling loginUser...");
      const data = await loginUser(email, password);
      // console.log("loginUser response:", data);
  
      if (!data || !data.token) {
        throw new Error("Token missing in response");
      }
  
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // ✅ PASS TOKEN
        login(data.token);

        // ✅ UI updates
        onLoginSuccess();
        onClose();
          
      setTimeout(() => {
        // console.log(" Navigating now");
        if (data.role === "Manager") {
          navigate("/manager");
        } else {
          navigate("/");
        }
      }, 0);
  
    } catch (err) {
      // console.error(" Login error:", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
      // console.log(" Loading false");
    }
  };
  
  
  return (
    <div className="modal-overlay">
      <div className="login-modal">
        {/* HEADER */}
        <div className="modal-header">
          <h3>Login</h3>
          <span className="close-btn" onClick={onClose}>
            ×
          </span>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          {error && <p className="error-text">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="modal-footer">
          <p>
            <b>Don’t have an account?</b>{" "}
            <span className="register-link" onClick={onRegisterClick}>
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
