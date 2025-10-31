import { createContext, useContext, useState, useEffect } from "react";
import API from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------------------
  // Load user from localStorage
  // ---------------------
  useEffect(() => {
    try {
      const access = localStorage.getItem("access");
      const userData = localStorage.getItem("authUser");

      if (access && userData) {
        const parsedUser = JSON.parse(userData);
        setAuthUser(parsedUser);
        setRole(parsedUser.role);
      }
    } catch (error) {
      console.error("Error loading user:", error);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("authUser");
    } finally {
      setLoading(false);
    }

    // ✅ Handle forced logout (when token refresh fails)
    const handleLogoutEvent = () => {
      setAuthUser(null);
      setRole(null);
    };

    window.addEventListener("userLogout", handleLogoutEvent);
    return () => window.removeEventListener("userLogout", handleLogoutEvent);
  }, []);

  // ---------------------
  // Login
  // ---------------------
  const login = async (email, password) => {
    try {
      const res = await API.post("login/", { email, password });
      const { user, token } = res.data;

      localStorage.setItem("access", token.access);
      localStorage.setItem("refresh", token.refresh);
      localStorage.setItem("authUser", JSON.stringify(user));

      setAuthUser(user);
      setRole(user.role);

      return { success: true, user, role: user.role, error: null };
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      return {
        success: false,
        user: null,
        role: null,
        error: err.response?.data?.error || "Invalid email or password",
      };
    }
  };

  // ---------------------
  // Register (no token)
  // ---------------------
  const register = async (userData) => {
    try {
      const res = await API.post("register/", userData);
      if (res.status === 201) {
        return { success: true, user: res.data.user, error: null };
      }
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      return {
        success: false,
        user: null,
        error: err.response?.data?.error || "Registration failed",
      };
    }
  };

  // ---------------------
  // Logout
  // ---------------------
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("authUser");
    setAuthUser(null);
    setRole(null);
    window.dispatchEvent(new CustomEvent("userLogout"));
  };

  // ---------------------
  // Update user (e.g. profile edit)
  // ---------------------
  const updateUser = (updatedUser) => {
    setAuthUser(updatedUser);
    localStorage.setItem("authUser", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        role,
        loading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
