import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(() => {
    // Initialize from localStorage to avoid false negatives
    const token = localStorage.getItem("token");
    return !!token;
  });

  useEffect(() => {
    // Recheck on mount in case of changes
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
