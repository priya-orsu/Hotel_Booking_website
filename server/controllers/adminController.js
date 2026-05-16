const Booking = require("../models/bookingModel");
const User = require("../models/userModel");
const Room = require("../models/roomModel");

const getDashboardData = async (req, res) => {
  try {

    const users = await User.find();

    const bookings = await Booking.find();

    const rooms = await Room.find();

    console.log("USERS:", users);
    console.log("BOOKINGS:", bookings);
    console.log("ROOMS:", rooms);

    res.json({
      success: true,

      count: {
        users: users.length,
        bookings: bookings.length,
        rooms: rooms.length,
      },

      data: {
        users,
        bookings,
        rooms,
      },
    });

  } catch (error) {

    console.log("DASHBOARD ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Dashboard Error",
    });
  }
};

module.exports = {
  getDashboardData,
};