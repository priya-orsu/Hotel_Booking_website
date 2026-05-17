import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaBed,
  FaUser,
  FaCalendarAlt,
  FaCreditCard,
  FaLock,
  FaSpinner,
  FaCheck,
} from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function BookingDetails() {
  const { roomid } = useParams();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.post(
          "https://hotel-booking-website-szw4.onrender.com/api/rooms/getroombyid",
          { roomid },
        );
        setRoom(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room details:", error);
        setError(true);
        setLoading(false);
      }
    };
    fetchRoom();
  }, [roomid]);

  const handleGuestChange = (value) => {
    if (value > 0 && value <= (room?.maxcount || 2)) {
      setGuests(value);
    }
    setShowGuestDropdown(false);
  };

  const getTotalNights = () => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = checkOutDate - checkInDate;
    return Math.max(diffTime / (1000 * 60 * 60 * 24), 0);
  };

  const totalNights = getTotalNights();
  const totalPrice = totalNights * (room?.rentperday || 0) * rooms;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (
      !room?._id ||
      !user?._id ||
      !checkIn ||
      !checkOut ||
      guests <= 0 ||
      rooms <= 0
    ) {
      alert("Please fill all booking details properly.");
      return;
    }

    const bookingData = {
      roomId: room._id,
      userId: user._id,
      checkIn: new Date(checkIn).toISOString(),
      checkOut: new Date(checkOut).toISOString(),
      guests,
      rooms,
      totalPrice,
    };

    console.log("Booking Data Payload →", bookingData);

    try {
      if (!checkIn || !checkOut) {
        alert("Please select check-in and check-out dates");
        return;
      }

      if (new Date(checkOut) <= new Date(checkIn)) {
        alert("Check-out date must be after check-in date");
        return;
      }

      setSubmitting(true);

      const response = await axios.post(
        "https://hotel-booking-website-szw4.onrender.com/api/bookings/create",
        bookingData,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (response.data.success) {
        setBookingSuccess(true);
      } else {
        alert(response.data.message || "Booking failed");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Error: " + (error.response?.data?.message || error.message));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-red-600 text-4xl mr-3" />
        <span className="text-xl">Loading booking details...</span>
      </div>
    );
  }

  if (bookingSuccess) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="bg-green-100 rounded-full p-4 inline-block mb-4">
            <FaCheck className="text-green-600 text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 mb-6">
            Your reservation for {room.name} has been successfully booked.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-6 text-left">
            <p className="font-semibold">
              Booking Reference:{" "}
              {Math.random().toString(36).substring(2, 10).toUpperCase()}
            </p>
            <p>Room: {room.name}</p>
            <p>
              Dates: {checkIn} to {checkOut}
            </p>
            <p>Guests: {guests}</p>
            <p>Total: ₹{totalPrice}</p>
          </div>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-red-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Complete Your Booking</h1>
      </header>

      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {room && (
            <section className="lg:w-1/2">
              <h2 className="text-xl font-bold mb-4 border-b-2 border-red-600 pb-2">
                Room Details
              </h2>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={
                    room?.imageurls?.[0] ||
                    "https://via.placeholder.com/800x500?text=Room+Image"
                  }
                  alt={room.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-red-600">
                    {room.name}
                  </h3>
                  <p className="text-gray-700 mt-2">{room.description}</p>
                  <div className="mt-6 flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-red-600">
                        ₹{room.rentperday}
                      </span>
                      <span className="text-gray-600"> / night</span>
                    </div>
                    <div className="flex items-center">
                      <FaBed className="mr-1 text-red-600" />
                      <span>Max {room.maxcount} guests</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          <section className="lg:w-1/2">
            <h2 className="text-xl font-bold mb-4 border-b-2 border-red-600 pb-2">
              Booking Information
            </h2>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <FaCalendarAlt className="mr-2 text-red-600" />
                  Dates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Check-in</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split("T")[0]}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6 relative">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <FaUser className="mr-2 text-red-600" />
                  Guests
                </h3>
                <div
                  className="w-full p-2 border border-gray-300 rounded flex justify-between items-center cursor-pointer"
                  onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                >
                  <span>
                    {guests} {guests === 1 ? "Guest" : "Guests"}
                  </span>
                  {showGuestDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {showGuestDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg">
                    {[...Array(room?.maxcount || 2).keys()].map((i) => (
                      <div
                        key={i + 1}
                        className={`p-2 hover:bg-gray-100 cursor-pointer ${guests === i + 1 ? "bg-red-100" : ""}`}
                        onClick={() => handleGuestChange(i + 1)}
                      >
                        {i + 1} {i + 1 === 1 ? "Guest" : "Guests"}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <FaBed className="mr-2 text-red-600" />
                  No. of Rooms
                </h3>

                <input
                  type="number"
                  min="1"
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <FaCreditCard className="mr-2 text-red-600" />
                  Payment
                </h3>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <p className="text-gray-700">
                    For demonstration purposes, payment will be automatically
                    processed.
                  </p>
                  <p className="text-gray-700 mt-2">
                    No real payment information is required.
                  </p>
                </div>
              </div>

              <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Booking Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Room:</span>
                    <span className="font-semibold">{room?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per night:</span>
                    <span className="font-semibold">₹{room?.rentperday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total nights:</span>
                    <span className="font-semibold">{totalNights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span className="font-semibold">{guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>No. of Rooms:</span>
                    <span className="font-semibold">{rooms}</span>
                  </div>
                  <div className="border-t border-gray-300 my-2 pt-2 font-bold text-lg flex justify-between">
                    <span>Total:</span>
                    <span className="text-red-600">₹{totalPrice}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-bold hover:bg-red-700 transition duration-200 flex items-center justify-center"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FaLock className="mr-2" />
                    Confirm Booking
                  </>
                )}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
