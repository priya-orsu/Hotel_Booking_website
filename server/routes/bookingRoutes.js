const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { verifyAdmin } = require("../middleware/authMiddleware");

const Booking = require("../models/bookingModel");
const Room = require("../models/roomModel");

// Configuration constants (replace these with your actual values in production)
const MAX_BOOKING_DAYS = 30; // Maximum allowed booking duration
const MIN_BOOKING_HOURS = 2; // Minimum time between bookings for same room
const CANCELLATION_WINDOW_HOURS = 24; // Hours before check-in when cancellation is allowed

// Helper: Enhanced input validation
const validateBookingInput = ({ roomId, userId, checkIn, checkOut, guests, totalPrice }) => {
  try {
    const isValidDates = (
      new Date(checkIn).toString() !== 'Invalid Date' && 
      new Date(checkOut).toString() !== 'Invalid Date'
    );
    
    return (
      mongoose.Types.ObjectId.isValid(roomId) &&
      mongoose.Types.ObjectId.isValid(userId) &&
      isValidDates &&
      typeof guests === "number" && guests > 0 &&
      typeof totalPrice === "number" && totalPrice >= 0
    );
  } catch (err) {
    return false;
  }
};

// Create new booking
router.post("/create", async (req, res) => {
  try {
    const { roomId, userId, checkIn, checkOut, guests, totalPrice } = req.body;

    if (!validateBookingInput(req.body)) {
      return res.status(400).json({ success: false, message: "Invalid booking data" });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const now = new Date();

    if (checkInDate >= checkOutDate || checkInDate < now) {
      return res.status(400).json({
        success: false,
        message: "Invalid dates"
      });
    }

    const overlapping = await Booking.findOne({
      room: roomId,
      status: { $ne: "cancelled" },
      checkIn: { $lt: checkOutDate },
      checkOut: { $gt: checkInDate }
    });

    if (overlapping) {
      return res.status(400).json({
        success: false,
        message: "Room not available for selected dates"
      });
    }

    const booking = new Booking({
      room: roomId,
      user: userId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      totalPrice,
      status: "confirmed"
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking
    });

  } catch (err) {
    console.error("Create booking error:", err);
    res.status(500).json({
      success: false,
      message: "Server error creating booking",
      error: err.message
    });
  }
});


// Modify the /all endpoint
router.get("/all", verifyAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("room", "name rentperday maxcount type description")
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    res.json({ 
      success: true, 
      count: bookings.length, 
      bookings 
    });
  } catch (err) {
    console.error("Fetch bookings error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error fetching bookings.",
      error: err.message 
    });
  }
});

// Get bookings for specific user
router.get("/user/:userId", async (req, res) => {

  const { userId } = req.params;

  try {

    const bookings = await Booking.find({
      user: userId,
    })

    .populate({
      path: "room",
      model: "rooms",
      select:
        "name imageurls rentperday type description",
    })

    .populate({
      path: "user",
      model: "users",
      select: "name email",
    })

    .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings,
    });

  } catch (err) {

    console.log("BOOKING ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Get single booking by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid booking ID." 
    });
  }

  try {
    const booking = await Booking.findById(id)
      .populate("room", "name description rentperday maxcount type imageurls")
      .populate("user", "name email phone");

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: "Booking not found." 
      });
    }

    res.json({ 
      success: true, 
      booking 
    });
  } catch (err) {
    console.error("Fetch booking error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error fetching booking.",
      error: err.message 
    });
  }
});

// Cancel booking
router.patch("/:id/cancel", async (req, res) => {

  const { id } = req.params;

  try {

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // ALREADY CANCELLED
    if (booking.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking already cancelled",
      });
    }

    // UPDATE STATUS
    booking.status = "cancelled";

    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });

  } catch (err) {

    console.log("CANCEL ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Server error cancelling booking",
      error: err.message,
    });
  }
});

module.exports = router;