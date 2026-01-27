import { Navigate } from "react-router-dom";

export default function ManagerRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" />;
  }

  if (role !== "Manager") {
    return <Navigate to="/" />;
  }

  return children;
}
