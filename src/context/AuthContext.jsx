import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null); // full user object
  const [role, setRole] = useState(null);         // "admin" or "user"

  // Check for stored user data on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    const storedRole = localStorage.getItem('userRole');
    
    if (storedUser && storedRole) {
      try {
        setAuthUser(JSON.parse(storedUser));
        setRole(storedRole);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('authUser');
        localStorage.removeItem('userRole');
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(
        `http://localhost:3000/users?email=${email}&password=${password}`
      );
      const data = await res.json();

      if (data.length > 0) {
        const user = data[0];
        
        // Check if user is blocked
        if (user.isBlocked) {
          return { success: false, message: "Your account has been blocked. Please contact support." };
        }
        
        setAuthUser(user);
        setRole(user.role);
        
        // Store user data in localStorage for persistence
        localStorage.setItem('authUser', JSON.stringify(user));
        localStorage.setItem('userRole', user.role);
        
        return { success: true, role: user.role };
      } else {
        return { success: false, message: "Invalid credentials" };
      }
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, message: "Login failed" };
    }
  };

  const logout = () => {
    setAuthUser(null);
    setRole(null);
    
    // Clear stored user data
    localStorage.removeItem('authUser');
    localStorage.removeItem('userRole');
    
    // Dispatch a custom event to notify other components about logout
    window.dispatchEvent(new CustomEvent('userLogout'));
  };

  const register = async ({ name, email, password }) => {
    try {
      // Check for duplicate email first
      const checkRes = await fetch(
        `http://localhost:3000/users?email=${email}`
      );
      const existingUsers = await checkRes.json();

      if (existingUsers.length > 0) {
        return { error: "Email is already registered." };
      }

      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now().toString(), // Generate unique ID
          name,
          email,
          password,
          role: "user", // default role
          isBlocked: false
        }),
      });

      if (!res.ok) {
        return { error: "Failed to register user." };
      }

      return { success: true };
    } catch (err) {
      console.error("Registration error:", err);
      return { error: "Something went wrong." };
    }
  };

  const updateUser = (updatedUser) => {
    setAuthUser(updatedUser);
    localStorage.setItem('authUser', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ 
      authUser, 
      role, 
      login, 
      logout, 
      register, 
      updateUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);