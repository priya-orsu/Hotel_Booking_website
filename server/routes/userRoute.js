const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

// Configuration constants (replace these with your actual values)
const JWT_SECRET = "your_very_strong_jwt_secret_key_here";
const JWT_EXPIRES_IN = "10y";// Token expiration time
const SALT_ROUNDS = 12; // For password hashing

// Helper function to escape regex special characters
const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required" 
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long"
      });
    }

    // Check for existing user (case-insensitive)
    const sanitizedEmail = escapeRegex(email);
    const existingUser = await User.findOne({
      email: { $regex: new RegExp(`^${sanitizedEmail}$`, 'i') }
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email"
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save user
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Prepare response
    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin
    };

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: userResponse
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during registration",
      error: error.message // Always show error in this simplified version
    });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find user (case-insensitive) and select password
    const sanitizedEmail = escapeRegex(email);
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${sanitizedEmail}$`, 'i') }
    }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Prepare response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    };

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: userResponse
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during login",
      error: error.message // Always show error in this simplified version
    });
  }
});

module.exports = router;