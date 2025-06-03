import React, { useContext, useEffect, useMemo, useState } from "react";
import { firebaseConfig } from "@/config/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";

const API_BASE_URL_USER = "http://localhost:3002/nguoi-dung";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface AuthContextType {
  authUser: any | null;
  isAuthenticated: boolean;
  idToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider(props: any) {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        const { data, token } = await getInfoUser(user);
        setAuthUser(data);
        setIsAuthenticated(true);
        setIdToken(token);
        localStorage.setItem("idToken", token); // Lưu token
      } else {
        setAuthUser(null);
        setIsAuthenticated(false);
        setIdToken(null);
        localStorage.removeItem("idToken");
      }
      setIsLoading(false);
    });

    const unsubscribeToken = auth.onIdTokenChanged(async (user: any) => {
      if (user) {
        const token = await user.getIdToken();
        setIdToken(token);
        localStorage.setItem("idToken", token);
      } else {
        setIdToken(null);
        localStorage.removeItem("idToken");
      }
    });

    return () => {
      unsubscribe();
      unsubscribeToken();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      let errorMessage = error.message;
      if (error.code === "auth/wrong-password") {
        errorMessage = "Sai mật khẩu";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Thông tin không chính xác";
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = "Mật khẩu không đúng định dạng";
      } else if (error.code === "auth/missing-password") {
        errorMessage = "Vui lòng nhập mật khẩu";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "Không tìm thấy người dùng";
      }
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    auth.signOut();
    localStorage.removeItem("idToken");
    setAuthUser(null);
    setIdToken(null);
    setIsAuthenticated(false);
  };

  const getInfoUser = async (user: any) => {
    try {
      const token = await user.getIdToken();
      const response = await fetch(`${API_BASE_URL_USER}/dang-nhap`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      return { data, token };
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const value = useMemo(
    () => ({
      authUser,
      isAuthenticated,
      idToken,
      isLoading,
      login,
      logout,
    }),
    [authUser, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
