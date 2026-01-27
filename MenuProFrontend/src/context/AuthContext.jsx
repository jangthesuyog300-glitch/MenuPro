import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    if (token && name) {
      setUser({ token, name, userId, role });
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("name", data.name);
    localStorage.setItem("role", data.role);

    if (data.restaurantId) {
      localStorage.setItem("restaurantId", data.restaurantId);
    }

    setUser({
      token: data.token,
      userId: data.userId,
      name: data.name,
      role: data.role,
    });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
