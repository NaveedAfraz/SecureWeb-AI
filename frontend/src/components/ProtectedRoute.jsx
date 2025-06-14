import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('jwtToken');

        if (!token) {
          setAuth(false);
          setIsLoading(false);
          return;
        }

        // Verify token with backend
        const response = await fetch("/api/auth/check", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Authentication failed");

        const data = await response.json();
        setAuth(data.authenticated);
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem('jwtToken');
        setAuth(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }


  return auth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
