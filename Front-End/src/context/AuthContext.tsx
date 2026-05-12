import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/lib/types";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - In production, this would call backend API
    // Demo credentials: admin@sparecar.com / admin123 (admin), user@sparecar.com / user123 (customer)

    if (email === "admin@sparecar.com" && password === "admin123") {
      const adminUser: User = {
        id: "1",
        email: "admin@sparecar.com",
        name: "Admin User",
        role: "admin",
      };
      setUser(adminUser);
      toast.success("Welcome back, Admin!");

      // ✅ Admin يروح للـ Dashboard مباشرة بعد نصف ثانية
      setTimeout(() => {
        window.location.href = "/admin";
      }, 500);

      return true;
    } else if (email === "user@sparecar.com" && password === "user123") {
      const customerUser: User = {
        id: "2",
        email: "user@sparecar.com",
        name: "John Doe",
        role: "customer",
      };
      setUser(customerUser);
      toast.success("Welcome back!");

      // ✅ العميل يبقى في نفس المكان أو يرجع للصفحة اللي كان فيها
      // الـ redirect هيتعامل معاه Login page component

      return true;
    }

    toast.error("Invalid credentials");
    return false;
  };

  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<boolean> => {
    // Mock registration - In production, this would call backend API
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: "customer",
    };
    setUser(newUser);
    toast.success("Account created successfully!");
    return true;
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully");

    // ✅ بعد الـ logout يروح للصفحة الرئيسية
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
