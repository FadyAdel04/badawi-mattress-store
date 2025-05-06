
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AdminProtectedRouteProps {
  children: JSX.Element;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Check if admin is authenticated
    const adminAuth = localStorage.getItem("adminAuthenticated");
    setIsAuthenticated(adminAuth === "true");
  }, [location]);

  if (isAuthenticated === null) {
    // Still checking authentication status
    return <div className="flex h-screen items-center justify-center">جاري التحميل...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" />;
  }

  // Render children if authenticated
  return children;
};

export default AdminProtectedRoute;
