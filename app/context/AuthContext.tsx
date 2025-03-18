import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

type AuthState = {
  isAuthenticated: boolean;
  user: { id: string; name: string } | null;
  token: string | null;
};

type AuthContextType = {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  logout: () => void;
};

type TokenPayload = {
  id: string;
  name: string;
  exp: number; // Expiration timestamp (Unix format)
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  //  check token validity
  const validateToken = (token: string | null) => {
    if (!token) return false;

    try {
      const decoded: TokenPayload = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now(); // Convert to milliseconds
      return !isExpired;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false;
    }
  };

  // log out the user
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuth({ isAuthenticated: false, user: null, token: null });
  };

  // Check token on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken && validateToken(storedToken)) {
      const decoded: TokenPayload = jwtDecode(storedToken);
      setAuth({
        isAuthenticated: true,
        user: { id: decoded.id, name: decoded.name },
        token: storedToken,
      });
    } else {
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
