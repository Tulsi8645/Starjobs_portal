const express = require("express");
const cors = require("cors");
const path = require('path');
const dotenv = require("dotenv");
const passport = require('passport');
const session = require('express-session');
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Import passport configuration
require('./config/passport');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS
app.use(cors({
  origin: process.env.FRONTEND_URL ,
  credentials: true
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/jobseeker", require("./routes/jobseekerRoutes"));
app.use("/api/employer", require("./routes/employerRoutes"));
app.use("/api/insights", require("./routes/insightRoutes"));
app.use("/api/revenue", require("./routes/revenueRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/notification", require("./routes/notificationRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
