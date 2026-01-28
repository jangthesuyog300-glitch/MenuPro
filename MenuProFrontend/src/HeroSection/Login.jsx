import { useState } from "react";
import "../Styles/Login.css";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginModal({
  isOpen,
  onClose,
  onRegisterClick,
  onLoginSuccess,
}) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);

      if (!data || !data.token) {
        throw new Error("Token missing");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      login(data.token);

      onLoginSuccess();
      onClose();

     if (data.role === "Admin") {
  navigate("/admin");
} else if (data.role === "Manager") {
  navigate("/manager");
} else {
  navigate("/");
}
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <div className="modal-header">
          <h3>Login</h3>
          <span className="close-btn" onClick={onClose}>×</span>
        </div>

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
