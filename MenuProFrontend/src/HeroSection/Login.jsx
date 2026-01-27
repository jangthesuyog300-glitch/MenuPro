import { useState } from "react";
import "../Styles/Login.css";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function LoginModal({ isOpen, onClose, onRegisterClick }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const data = await loginUser(email, password);
  
      login(data.token);
      onClose();
    } catch (err) {
      console.log("Login error:", err);
      setError("Unable to connect to server");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="login-modal">

        {/* HEADER */}
        <div className="modal-header">
          <h3>Login</h3>
          <span className="close-btn" onClick={onClose}>×</span>
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
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Login
          </button>

        </form>

        {/* FOOTER */}
        <div className="modal-footer">
          <p>
            <b>Don’t have an account?</b>{" "}
            <span
              className="register-link"
              onClick={onRegisterClick}
            >
              Register
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}
