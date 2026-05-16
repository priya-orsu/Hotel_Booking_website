const express = require("express");

const router = express.Router();

const adminRoute = require("../middleware/adminRoute");

// IMPORT MODELS
const Room = require("../models/roomModel");
const User = require("../models/userModel");
const Booking = require("../models/bookingModel");

// IMPORT CONTROLLER
const {
  getDashboardData,
} = require("../controllers/adminController");


// DASHBOARD
router.get(
  "/dashboard",
  adminRoute,
  getDashboardData
);


// GET ALL USERS
router.get(
  "/users",
  adminRoute,
  async (req, res) => {
    try {

      const users = await User.find();

      res.send(users);

    } catch (error) {

      res.status(500).send(error);
    }
  }
);


// GET ALL ROOMS
router.get(
  "/rooms",
  adminRoute,
  async (req, res) => {
    try {

      const rooms = await Room.find();

      res.send(rooms);

    } catch (error) {

      res.status(500).send(error);
    }
  }
);


// GET ALL BOOKINGS
router.get(
  "/bookings",
  adminRoute,
  async (req, res) => {
    try {

      const bookings = await Booking.find();

      res.send(bookings);

    } catch (error) {

      res.status(500).send(error);
    }
  }
);


// DELETE ROOM
router.delete(
  "/delete-room/:id",
  adminRoute,
  async (req, res) => {

    try {

      await Room.findByIdAndDelete(
        req.params.id
      );

      res.send("Room Deleted");

    } catch (error) {

      res.status(500).send(error);
    }
  }
);


// DELETE USER
router.delete(
  "/delete-user/:id",
  adminRoute,
  async (req, res) => {

    try {

      await User.findByIdAndDelete(
        req.params.id
      );

      res.send("User Deleted");

    } catch (error) {

      res.status(500).send(error);
    }
  }
);


// DELETE BOOKING
router.delete(
  "/delete-booking/:id",
  adminRoute,
  async (req, res) => {

    try {

      await Booking.findByIdAndDelete(
        req.params.id
      );

      res.send("Booking Deleted");

    } catch (error) {

      res.status(500).send(error);
    }
  }
);

// ADD ROOM
router.post(
  "/addroom",
  adminRoute,
  async (req, res) => {

    try {

      const newRoom = new Room(req.body);

      await newRoom.save();

      res.status(201).json({
        success: true,
        message: "Room Added Successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Failed to add room",
      });
    }
  }
);

module.exports = router;