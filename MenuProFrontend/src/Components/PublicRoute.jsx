// Block Homepage for Manager

// We’ll create a Homepage guard.

import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const role = localStorage.getItem("role");

  // 🔒 If Manager, redirect to manager dashboard
  if (role === "Manager") {
    return <Navigate to="/manager" />;
  }

  return children;
}
