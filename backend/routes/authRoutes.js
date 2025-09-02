const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');
const cors = require('cors');

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
};

// Apply CORS to all auth routes
router.use(cors(corsOptions));

// Trust proxy for production
if (process.env.NODE_ENV === 'production') {
  router.set('trust proxy', 1);
}

// Google OAuth routes
router.get('/google', authController.googleAuth);
router.get(
  '/google/callback',
  authController.googleAuthCallback
);

// Get current user
router.get('/me', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  res.json(req.user);
});

// Logout
router.get('/logout', authController.logout);

module.exports = router;
