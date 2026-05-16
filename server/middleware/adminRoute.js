const jwt = require("jsonwebtoken");

const adminRoute = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      "your_very_strong_jwt_secret_key_here"
    );

    // IMPORTANT FIX
    if (!decoded.isAdmin) {
      return res.status(403).json({
        message: "Admin access only",
      });
    }

    req.user = decoded;

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = adminRoute;