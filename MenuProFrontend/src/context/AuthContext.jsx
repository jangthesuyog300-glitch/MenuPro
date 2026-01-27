// Context = “WHO is logged in + UI reaction”

import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { logoutUser } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🔁 AUTO LOGIN ON REFRESH
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role,
      });
    }
  }, []);

  const login = (token) => {
    const decoded = jwtDecode(token);
    setUser({
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role,
    });
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);