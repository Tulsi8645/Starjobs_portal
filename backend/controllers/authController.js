const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configure Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      // Only allow jobseeker role for Google OAuth
      const user = await User.findOneAndUpdate(
        { googleId: profile.id },
        { 
          $setOnInsert: {
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            emailVerified: true,
            isVerified: true,
            authMethod: 'google',
            role: 'jobseeker' // Enforce jobseeker role for Google OAuth
          }
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

// Serialize user into the sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the sessions
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// Google OAuth authentication
const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
  prompt: 'select_account'
});

// Google OAuth callback
const googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    
    if (err) {
      return res.redirect(`${frontendUrl}/login?error=${encodeURIComponent('Authentication failed')}`);
    }
    if (!user) {
      return res.redirect(`${frontendUrl}/login?error=Authentication%20failed`);
    }
    
    try {
      // Generate JWT token in the same format as regular login
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      
      // Redirect to frontend with token and role
      return res.redirect(`${frontendUrl}/auth/callback?token=${token}&role=${user.role}`);
    } catch (error) {
      console.error('Error generating token:', error);
      return res.redirect(`${frontendUrl}/login?error=${encodeURIComponent('Authentication error')}`);
    }
  })(req, res, next);
};

// Get current user
const getCurrentUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  });
};

// Logout
const logout = (req, res) => {
  req.logout();
  res.json({ message: 'Logged out successfully' });
};

module.exports = {
  googleAuth,
  googleAuthCallback,
  getCurrentUser,
  logout
};
