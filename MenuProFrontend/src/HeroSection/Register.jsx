// import { useState } from "react";
// import './Register.css'; // reuse same CSS theme

// export default function RegisterModal({ isOpen, onClose }) {

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     role: "Customer"
//   });

//   const [error, setError] = useState("");

//   if (!isOpen) return null;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // 🔁 REST API will be connected here
//     console.log("Register Request Payload:", formData);

//     /*
//     fetch("http://localhost:5000/api/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData)
//     })
//       .then(res => {
//         if (!res.ok) throw new Error("Registration failed");
//         return res.json();
//       })
//       .then(data => {
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
//           <h3>Register</h3>
//           <span className="close-btn" onClick={onClose}>×</span>
//         </div>

//         {/* FORM */}
//         <form onSubmit={handleSubmit}>

//           {error && <p className="error-text">{error}</p>}

//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="tel"
//             name="phone"
//             placeholder="Phone Number"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />

//           {/* ROLE */}
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="login-select"
//           >
//             <option value="Customer">Customer</option>
//             <option value="Staff">Staff</option>
//             <option value="Admin">Admin</option>
//           </select>

//           <button type="submit" className="login-btn">
//             Register
//           </button>

//         </form>

//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import "../Styles/Register.css";
import { registerUser } from "../services/authService";

export default function RegisterModal({ isOpen, onClose }) {

  
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",       // ✅ ONLY password
    role: "Customer",
  });

  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser(formData);
      onClose(); // close modal after successful registration
    } catch (err) {
      setError("Registration failed. Try again."+err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="login-modal">

        {/* HEADER */}
        <div className="modal-header">
          <h3>Register</h3>
          <span className="close-btn" onClick={onClose}>×</span>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          {error && <p className="error-text">{error}</p>}

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />


          {/* ROLE */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="login-select"
          >
            <option value="Customer">Customer</option>
            <option value="Staff">Staff</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
          </select>

          <button type="submit" className="login-btn">
            Register
          </button>

        </form>

      </div>
    </div>
  );
}
