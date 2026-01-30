// src/components/LoginModal.jsx
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
  onForgotPasswordClick
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
      // const data = await loginUser(email, password);

      // // store auth info
      // localStorage.setItem("token", data.token);
      // localStorage.setItem("role", data.role);


      const data = await loginUser(email, password);

      console.log("LOGIN RESPONSE:", data);

      // token might be named differently depending on backend
      const token = data?.token || data?.accessToken || data?.jwt || data?.data?.token;

      if (!token || token === "undefined" || token === "null") {
        throw new Error("Login response did not include a valid token");
      }

      // clear old bad values
      ["token", "role", "restaurantId"].forEach((k) => localStorage.removeItem(k));

      // store auth info
      localStorage.setItem("token", token);
      console.log("AFTER setItem token:", localStorage.getItem("token"));

      // localStorage.setItem("name", user.name);
      // console.log("Usre Name :", localStorage.getItem("name"));

      if (data?.role) localStorage.setItem("role", data.role);



      if (data.restaurantId) {
        localStorage.setItem("restaurantId", data.restaurantId);
      } else {
        localStorage.removeItem("restaurantId");
      }

      // update context
      login({ userId: data.userId, token });
      // login({ token, role, restaurantId });
      localStorage.setItem("userId", String(data.userId));
      console.log("USER ID : ", localStorage.getItem("userId"));
      console.log("AFTER context login():", localStorage.getItem("token"));


      // close modal + notify parent
      if (typeof onLoginSuccess === "function") onLoginSuccess();
      if (typeof onClose === "function") onClose();

      // role-based navigation
      if (data.role === "Admin") {
        navigate("/admin");
      } else if (data.role === "Manager") {
        navigate("/manager/bookings");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }

    try {
      await registerUser(formData);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Login</h3>
          <span className="close-btn" onClick={onClose}>
            ×
          </span>
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

          {/* New Code to be added */}
          <p>
            <b>Forgot Password?</b>{" "}
            <span className="register-link" onClick={onForgotPasswordClick}>
              Reset Password
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
