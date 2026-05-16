const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,

      // FIXED
      ref: "rooms",

      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,

      // FIXED
      ref: "users",

      required: true,
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,

      enum: [
        "pending",
        "confirmed",
        "cancelled",
      ],

      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const bookingModel = mongoose.model(
  "bookings",
  bookingSchema
);

module.exports = bookingModel;