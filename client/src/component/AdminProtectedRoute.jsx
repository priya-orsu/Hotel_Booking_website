import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminProtectedRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = () => {
      try {
        const token = localStorage.getItem("token");

        const user = JSON.parse(
          localStorage.getItem("currentUser")
        );

        if (token && user?.isAdmin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.log("Admin verification error:", error);

        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Loading...
        </h1>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;