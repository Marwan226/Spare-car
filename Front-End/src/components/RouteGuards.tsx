import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// ===========================================
// 1. Admin Route - للأدمن فقط
// ===========================================
export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  // لو مش مسجل دخول → روح Login
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // لو مسجل بس مش Admin → روح للصفحة الرئيسية
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

// ===========================================
// 2. Customer Route - للعملاء فقط (مش Admin)
// ===========================================
export function CustomerRoute({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  // لو مش مسجل دخول → روح Login
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // لو Admin → روح Dashboard
  if (isAdmin()) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}

// ===========================================
// 3. Public Route - للي مش مسجلين دخول بس
// ===========================================
export function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = useAuth();

  // لو مسجل دخول كـ Admin → Dashboard
  if (user && isAdmin()) {
    return <Navigate to="/admin" replace />;
  }

  // لو مسجل دخول كـ Customer → Home
  if (user && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
