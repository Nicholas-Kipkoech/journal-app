import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";

export type User = {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  role: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
};

type AuthContextType = {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  logout: () => void;
};

export type TokenPayload = {
  user: User;
  exp: number; // Expiration timestamp (Unix format)
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  // Check if token is still valid
  const validateToken = (token: string | null) => {
    if (!token) return false;

    try {
      const decoded: TokenPayload = jwtDecode(token);
      return decoded.exp * 1000 > Date.now(); // Token must not be expired
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const pathname = usePathname();

  // Logout user and redirect
  const logout = () => {
    localStorage.removeItem("access_token");
    setAuth({ isAuthenticated: false, user: null, token: null });

    // Ensure navigation happens after state updates
    setTimeout(() => {
      if (pathname !== "/") router.push("/");
    }, 0);
  };

  // Check token validity on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");

    if (storedToken && validateToken(storedToken)) {
      const decoded: TokenPayload = jwtDecode(storedToken);

      setAuth({
        isAuthenticated: true,
        user: decoded.user,
        token: storedToken,
      });
    } else {
      localStorage.removeItem("access_token"); // Prevent infinite logout loop
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
