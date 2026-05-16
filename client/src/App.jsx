import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './component/Navbar';
import Footer from './component/Footer';

import Home from './pages/Home';
import AllHotels from './pages/AllHotels';
import AllRooms from './pages/AllRooms';
import BookingDetails from './pages/BookingDetails';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Profile from './pages/Profile';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';

import ProtectedRoute from './component/ProtectedRoute';
import AdminProtectedRoute from './component/AdminProtectedRoute';

import AddRoom from "./pages/AddRoom";

export default function App() {
  return (
    <AuthProvider>
      <Navbar />

      <main className="min-h-[70vh]">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/hotels" element={<AllHotels />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/book/:roomid" element={<BookingDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Route */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/addroom"
            element={
              <AdminProtectedRoute>
                <AddRoom />
              </AdminProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </AuthProvider>
  );
}
