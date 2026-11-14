
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("auth_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() =>
    localStorage.getItem("auth_token")
  );

  const [loading, setLoading] = useState(true);

  const saveAuth = (userData, accessToken) => {
    localStorage.setItem("auth_user", JSON.stringify(userData));
    localStorage.setItem("auth_token", accessToken);

    setUser(userData);
    setToken(accessToken);
  };

  const clearAuth = () => {
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_token");

    setUser(null);
    setToken(null);
  };

  const login = async (email, password) => {
    const response = await api.post("/login", {
      email,
      password,
    });

    saveAuth(response.data.user, response.data.token);
    return response.data;
  };

  const register = async (name, email, password) => {
    const response = await api.post("/register", {
      name,
      email,
      password,
    });

    saveAuth(response.data.user, response.data.token);
    return response.data;
  };

  const logout = async () => {
    try {
      if (token) {
        await api.post("/logout");
      }
    } finally {
      clearAuth();
    }
  };

  useEffect(() => {
    const handleUnauthorized = () => clearAuth();

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    setLoading(false);

    return () => {
      window.removeEventListener(
        "auth:unauthorized",
        handleUnauthorized
      );
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        clearAuth,
        isAuthenticated: Boolean(token && user),
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
