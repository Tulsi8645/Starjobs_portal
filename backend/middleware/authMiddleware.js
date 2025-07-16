const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to authenticate user

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token malformed" });
    } else {
      console.error("Unexpected auth error:", error);
      return res.status(500).json({ message: "Authentication error" });
    }
  }
};

// Middleware to authorize employer
const authorizeEmployer = (req, res, next) => {
  if (req.user.role !== "employer" || !req.user.isVerified) {
    return res
      .status(403)
      .json({ message: "Access denied. Not an employer or not verified." });
  }
  next();
};

// Middleware to authorize admins
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Not an admin." });
  }
  next();
};

module.exports = { authenticate, authorizeEmployer, authorizeAdmin };
