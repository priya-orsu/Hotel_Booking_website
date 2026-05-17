import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {FaSpinner} from 'react-icons/fa'

const AdminDashboard = () => {

  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("users");

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    fetchData();
  }, []);

  // FETCH DATA
  const fetchData = async () => {

    try {

      // USERS
      const usersRes = await axios.get(
        "https://hotel-booking-website-szw4.onrender.com/api/admin/users",
        { headers }
      );

      // ROOMS
      const roomsRes = await axios.get(
        "https://hotel-booking-website-szw4.onrender.com/api/admin/rooms",
        { headers }
      );

      // BOOKINGS
      const bookingsRes = await axios.get(
        "https://hotel-booking-website-szw4.onrender.com/api/admin/bookings",
        { headers }
      );

      setUsers(usersRes.data);

      setRooms(roomsRes.data);

      setBookings(bookingsRes.data);

    } catch (error) {

      console.log("ADMIN ERROR:", error);

    } finally {

      setLoading(false);
    }
  };

  // DELETE ROOM
  const deleteRoom = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this room?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `https://hotel-booking-website-szw4.onrender.com/api/admin/delete-room/${id}`,
        { headers }
      );

      alert("Room Deleted");

      fetchData();

    } catch (error) {

      console.log(error);

      alert("Failed to delete room");
    }
  };

  // DELETE USER
  const deleteUser = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this user?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `https://hotel-booking-website-szw4.onrender.com/api/admin/delete-user/${id}`,
        { headers }
      );

      alert("User Deleted");

      fetchData();

    } catch (error) {

      console.log(error);

      alert("Failed to delete user");
    }
  };

  // DELETE BOOKING
  const deleteBooking = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this booking?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `https://hotel-booking-website-szw4.onrender.com/api/admin/delete-booking/${id}`,
        { headers }
      );

      alert("Booking Deleted");

      fetchData();

    } catch (error) {

      console.log(error);

      alert("Failed to delete booking");
    }
  };

  // LOADING
  if (loading) return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-red-600 text-4xl mr-3" />
        <span className="text-xl">Loading room details...</span>
      </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 pt-32 px-6 md:px-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-5">

        <div>

          <h1 className="text-5xl font-bold text-red-700">
            Admin Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Manage users, rooms, and bookings
          </p>

        </div>

        {/* ADD ROOM BUTTON */}
        <Link to="/addroom">

          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-semibold shadow-lg transition duration-300">

            + Add Room

          </button>

        </Link>

      </div>

      {/* TABS */}
      <div className="flex flex-wrap gap-4 mb-10">

        <button
          onClick={() => setActiveTab("users")}
          className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
            activeTab === "users"
              ? "bg-red-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Users
        </button>

        <button
          onClick={() => setActiveTab("rooms")}
          className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
            activeTab === "rooms"
              ? "bg-red-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Rooms
        </button>

        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
            activeTab === "bookings"
              ? "bg-red-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Bookings
        </button>

      </div>

      {/* USERS */}
      {activeTab === "users" && (

        <div className="bg-white rounded-3xl shadow-lg p-6 overflow-x-auto mb-20">

          <h2 className="text-3xl font-bold mb-6 text-red-700">
            All Users
          </h2>

          {users.length === 0 ? (

            <p>No Users Found</p>

          ) : (

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-4">
                    Name
                  </th>

                  <th className="text-left py-4">
                    Email
                  </th>

                  <th className="text-left py-4">
                    Admin
                  </th>

                  <th className="text-left py-4">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {users.map((user) => (

                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="py-4">
                      {user.name}
                    </td>

                    <td className="py-4">
                      {user.email}
                    </td>

                    <td className="py-4">

                      {user.isAdmin
                        ? "Admin"
                        : "User"}

                    </td>

                    <td className="py-4">

                      <button
                        onClick={() =>
                          deleteUser(user._id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>
      )}

      {/* ROOMS */}
      {activeTab === "rooms" && (

        <div className="bg-white rounded-3xl shadow-lg p-6 overflow-x-auto mb-20">

          <h2 className="text-3xl font-bold mb-6 text-red-700">
            All Rooms
          </h2>

          {rooms.length === 0 ? (

            <p>No Rooms Found</p>

          ) : (

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-4">
                    Name
                  </th>

                  <th className="text-left py-4">
                    Type
                  </th>

                  <th className="text-left py-4">
                    Price
                  </th>

                  <th className="text-left py-4">
                    Max Count
                  </th>

                  <th className="text-left py-4">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {rooms.map((room) => (

                  <tr
                    key={room._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="py-4">
                      {room.name}
                    </td>

                    <td className="py-4">
                      {room.type}
                    </td>

                    <td className="py-4">
                      ₹ {room.rentperday}
                    </td>

                    <td className="py-4">
                      {room.maxcount}
                    </td>

                    <td className="py-4">

                      <button
                        onClick={() =>
                          deleteRoom(room._id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>
      )}

      {/* BOOKINGS */}
      {activeTab === "bookings" && (

        <div className="bg-white rounded-3xl shadow-lg p-6 overflow-x-auto mb-20">

          <h2 className="text-3xl font-bold mb-6 text-red-700">
            All Bookings
          </h2>

          {bookings.length === 0 ? (

            <p>No Bookings Found</p>

          ) : (

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-4">
                    Status
                  </th>

                  <th className="text-left py-4">
                    Total Price
                  </th>

                  <th className="text-left py-4">
                    Guests
                  </th>

                  <th className="text-left py-4">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {bookings.map((booking) => (

                  <tr
                    key={booking._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="py-4">
                      {booking.status}
                    </td>

                    <td className="py-4">
                      ₹ {booking.totalPrice}
                    </td>

                    <td className="py-4">
                      {booking.guests}
                    </td>

                    <td className="py-4">

                      <button
                        onClick={() =>
                          deleteBooking(booking._id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>
      )}

    </div>
  );
};

export default AdminDashboard;