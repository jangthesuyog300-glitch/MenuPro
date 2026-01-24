// import { useState } from "react";
// import "./Login.css";

// export default function LoginModal({ isOpen, onClose, onRegisterClick }) {

//   // REST-ready state
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   if (!isOpen) return null;

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // 🔴 BACKEND CONNECTIVITY WILL COME HERE
//     console.log("Login request:", { username, password });

//     /*
//     fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password })
//     })
//       .then(res => {
//         if (!res.ok) throw new Error("Invalid credentials");
//         return res.json();
//       })
//       .then(data => {
//         localStorage.setItem("token", data.token);
//         onClose();
//       })
//       .catch(err => setError(err.message));
//     */
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="login-modal">

//         {/* HEADER */}
//         <div className="modal-header">
//           <h3>Login</h3>
//           <span className="close-btn" onClick={onClose}>×</span>
//         </div>

//         {/* FORM */}
//         <form onSubmit={handleSubmit}>

//           {error && <p className="error-text">{error}</p>}

//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button type="submit" className="login-btn">
//             Login
//           </button>

//         </form>

//         {/* FOOTER */}
//         <div className="modal-footer">
//           <p>
//             <b>Don’t have an account?</b>{" "}
//             <span
//               className="register-link"
//               onClick={onRegisterClick}
//             >
//               Register
//             </span>
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import "../Styles/Login.css";
import { loginUser } from "../services/authService";

export default function LoginModal({ isOpen, onClose, onRegisterClick }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(email, password);
      onClose(); // close modal after successful login
    } catch (err) {
      setError("Invalid email or password"+err);
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
