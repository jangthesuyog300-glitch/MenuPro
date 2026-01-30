import { useState } from "react";
import "../Styles/Login.css"; // you can make separate css if you want

// ✅ call your backend: POST /api/auth/forgot-password
async function forgotPassword(email) {
  const res = await fetch("http://localhost:44315/api/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Failed to send reset link");
  }

  return res.json();
}

export default function ForgotPasswordModal({ isOpen, onClose, onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");
    setLoading(true);

    try {
      await forgotPassword(email);
      setMsg("If that email exists, we sent a reset link.");
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Forgot Password</h3>
          <span className="close-btn" onClick={onClose}>
            ×
          </span>
        </div>

        {error && <p className="error-text">{error}</p>}
        {msg && <p style={{ marginTop: 8 }}>{msg}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="modal-footer">
          <p>
            <span className="register-link" onClick={onBackToLogin}>
              Back to Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}



