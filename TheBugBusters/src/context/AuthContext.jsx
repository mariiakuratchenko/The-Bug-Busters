import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(() => {
    // Initialize from localStorage to avoid false negatives
    const token = localStorage.getItem("token");
    return !!token;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    return adminStatus === "true";
  });

  useEffect(() => {
    // Recheck on mount in case of changes
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
  }, []);

  const login = (token, adminStatus = false) => {
    localStorage.setItem("token", token);
    localStorage.setItem("isAdmin", adminStatus.toString());
    setLoggedIn(true);
    setIsAdmin(adminStatus);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
