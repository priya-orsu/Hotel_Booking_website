import { useState } from "react";
import axios from "axios";
import { FaUser, FaLock, FaSignInAlt, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://hotel-booking-backend.onrender.com/api/users/login", {
        email,
        password,
      });


      localStorage.setItem("token", response.data.token);
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));

      if (response.data.user?.isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || 
        err.message || 
        "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-red-600 mb-2">VS-Hotel</h2>
          <p className="text-gray-600">Login to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              <div className="flex items-center gap-2">
                <FaUser className="text-gray-500" /> Email Address
              </div>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email"
            />
          </div>


          <div>
            <label className="block text-gray-700 font-medium mb-1">
              <div className="flex items-center gap-2">
                <FaLock className="text-gray-500" /> Password
              </div>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input 
                type="checkbox" 
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" 
              />
              Remember me
            </label>
            <a 
              href="/forgot-password" 
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md flex justify-center items-center gap-2 transition-colors ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" /> Logging in...
              </>
            ) : (
              <>
                <FaSignInAlt /> Login
              </>
            )}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <a 
            href="/register" 
            className="text-red-600 font-medium hover:text-red-700 hover:underline"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;