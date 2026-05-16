import React, { useEffect, useState } from "react";
import { FaSpinner, FaUserShield } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

const MyBookings = () => {

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [isAdminView, setIsAdminView] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, [isAdminView]);

  // TOGGLE ADMIN VIEW
  const toggleAdminView = () => {
    setLoading(true);
    setIsAdminView((prev) => !prev);
  };

  // FETCH BOOKINGS
  const fetchBookings = async () => {
    try {

      const authToken =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

      const currentUserString =
        localStorage.getItem("currentUser") ||
        sessionStorage.getItem("currentUser");

      if (!currentUserString) {
        throw new Error("Authentication required");
      }

      const currentUser = JSON.parse(
        currentUserString
      );

      const BASE_URL =
        "https://hotel-booking-backend.onrender.com";

      const endpoint =
        isAdminView && currentUser.isAdmin
          ? `${BASE_URL}/api/bookings/all`
          : `${BASE_URL}/api/bookings/user/${currentUser._id}`;

      const response = await fetch(endpoint, {
        headers: {
          Authorization: authToken
            ? `Bearer ${authToken}`
            : "",

          "Content-Type":
            "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          "Failed to fetch bookings"
        );
      }

      const data = await response.json();

      setBookings(data.bookings || []);

      setError(null);

    } catch (err) {

      console.log(err);

      setError(err.message);

    } finally {

      setLoading(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">

        <FaSpinner className="animate-spin text-red-600 text-4xl mb-4" />

        <span className="text-xl">
          Loading bookings...
        </span>

      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="text-center mt-40">

        <h2 className="text-2xl font-bold text-red-700 mb-3">
          Something went wrong
        </h2>

        <p className="text-gray-600">
          {error}
        </p>

      </div>
    );
  }

  // CURRENT USER
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") ||
      sessionStorage.getItem("currentUser")
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-28">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-red-700">

          {isAdminView
            ? "All Bookings (Admin)"
            : "My Bookings"}

        </h1>

        {/* ADMIN TOGGLE */}
        {currentUser?.isAdmin && (

          <button
            onClick={toggleAdminView}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold ${
              isAdminView
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >

            {isAdminView ? (
              <>
                <FaUserShield />
                User View
              </>
            ) : (
              <>
                <MdAdminPanelSettings />
                Admin View
              </>
            )}

          </button>

        )}

      </div>

      {/* NO BOOKINGS */}
      {bookings.length === 0 ? (

        <div className="text-center mt-20">

          <h2 className="text-2xl font-bold text-gray-700">
            No Bookings Found
          </h2>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-8">

          {bookings.map((booking) => (

            <BookingCard
              key={booking._id}
              booking={booking}
              showUserDetails={isAdminView}
              refreshBookings={fetchBookings}
            />

          ))}

        </div>
      )}

    </div>
  );
};


// BOOKING CARD
const BookingCard = ({
  booking,
  showUserDetails,
  refreshBookings,
}) => {

  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  const roomDetails = booking.room || {};

  const userDetails = booking.user || {};

  const checkInDate = booking.checkIn
    ? new Date(booking.checkIn)
    : null;

  const checkOutDate = booking.checkOut
    ? new Date(booking.checkOut)
    : null;

  // CANCEL BOOKING
  const cancelBooking = async () => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {

      const response = await fetch(
        `https://hotel-booking-backend.onrender.com/api/bookings/${booking._id}/cancel`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: token
              ? `Bearer ${token}`
              : "",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Cancellation failed"
        );
      }

      alert(
        "Booking Cancelled Successfully"
      );

      refreshBookings();

    } catch (error) {

      console.log(error);

      alert(error.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

      {/* ROOM IMAGE */}
      <img
        src={
          roomDetails.imageurls?.[0] ||
          "https://via.placeholder.com/600x300"
        }
        alt="room"
        className="w-full h-60 object-cover"
      />

      <div className="p-6">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-4">

          <h2 className="text-2xl font-bold text-red-700">
            {roomDetails.name ||
              "Unknown Room"}
          </h2>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              booking.status === "cancelled"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {booking.status}
          </span>

        </div>

        {/* USER DETAILS */}
        {showUserDetails && (

          <div className="bg-gray-100 p-4 rounded-xl mb-4">

            <p className="font-semibold">
              User:
              {" "}
              {userDetails.name}
            </p>

            <p>
              {userDetails.email}
            </p>

          </div>

        )}

        {/* DETAILS */}
        <div className="space-y-2 text-gray-700">

          <p>
            <span className="font-semibold">
              Room Type:
            </span>
            {" "}
            {roomDetails.type}
          </p>

          <p>
            <span className="font-semibold">
              Check-In:
            </span>
            {" "}
            {checkInDate?.toLocaleDateString()}
          </p>

          <p>
            <span className="font-semibold">
              Check-Out:
            </span>
            {" "}
            {checkOutDate?.toLocaleDateString()}
          </p>

          <p>
            <span className="font-semibold">
              Guests:
            </span>
            {" "}
            {booking.guests}
          </p>

          <p>
            <span className="font-semibold">
              Total:
            </span>
            {" "}
            ₹{booking.totalPrice}
          </p>

        </div>

        {/* CANCEL BUTTON */}
        {booking.status !== "cancelled" && (

          <button
            onClick={cancelBooking}
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
          >
            Cancel Booking
          </button>

        )}

      </div>

    </div>
  );
};

export default MyBookings;