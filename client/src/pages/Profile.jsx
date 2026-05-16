import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      // Removed async since we're not awaiting anything
      try {
        // Check token storage more thoroughly
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        const userData =
          localStorage.getItem("currentUser") ||
          sessionStorage.getItem("currentUser");

        console.log("Token exists:", !!token); // Debugging
        console.log("User data exists:", !!userData); // Debugging

        if (!token || !userData) {
          console.log("No token or user data - redirecting to login");
          navigate("/login");
          return;
        }

        // Verify token structure (basic check)
        if (typeof token !== "string" || token.split(".").length !== 3) {
          console.log("Invalid token format");
          clearAuthData();
          navigate("/login");
          return;
        }

        const parsedUser = JSON.parse(userData);
        if (!parsedUser?.email) {
          // Basic validation
          console.log("Invalid user data");
          clearAuthData();
          navigate("/login");
          return;
        }

        setUser(parsedUser);
      } catch (error) {
        console.error("Authentication error:", error);
        clearAuthData();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    const clearAuthData = () => {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
      sessionStorage.removeItem("currentUser");
      sessionStorage.removeItem("token");
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-red-600 text-4xl mr-3" />
        <span className="text-xl">Loading profile details...</span>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-10 pt-20">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 h-36 relative">
          {/* Profile Avatar */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-16">
            <div className="w-28 h-28 rounded-full bg-white shadow-lg border-4 border-white flex justify-center items-center">
              <span className="text-4xl font-bold text-red-600">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 p-8">
          <h2 className="text-center text-3xl font-bold text-gray-800">
            {user.name}
          </h2>

          <p className="text-center text-gray-500 mt-1 mb-8">Welcome back 👋</p>

          {/* Profile Details */}
          <div className="space-y-5">
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <p className="text-sm text-gray-500">Full Name</p>
              <h3 className="font-semibold text-lg">{user.name}</h3>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <p className="text-sm text-gray-500">Email Address</p>
              <h3 className="font-semibold text-lg">{user.email}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
