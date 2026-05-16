const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyAdmin = async (req, res, next) => {
  try {
    // 1. Check for authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "Authorization token required" 
      });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Check if user exists and is admin
    const user = await User.findById(decoded.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ 
        success: false, 
        message: "Admin privileges required" 
      });
    }

    // 4. Attach user to request and proceed
    req.user = user;
    next();
  } catch (err) {
    console.error("Admin verification error:", err);
    res.status(401).json({ 
      success: false, 
      message: "Invalid or expired token" 
    });
  }
};

module.exports = { verifyAdmin };