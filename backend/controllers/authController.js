const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configure Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
  passReqToCallback: true,
  proxy: true
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
          },
          $set: { lastLogin: new Date() }
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
  const expiresIn = user.role === 'admin' ? '1d' : '36500d'; // 100 years effectively no timeout for non-admins
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn }
  );
};

// Google OAuth authentication
const googleAuth = (req, res, next) => {
  // Get the redirect_uri from the query parameters or use the default
  const redirectUri = req.query.redirect_uri || `${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/callback`;

  // Store the redirect_uri in the session
  req.session.redirect_uri = redirectUri;

  // Initialize the Google OAuth authentication with the stored redirect_uri
  const auth = passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
    state: redirectUri // Optional: you can also use state to pass the redirect_uri
  });

  auth(req, res, next);
};


// Verify Google token from mobile app (alternative endpoint name)
const verifyGoogleTokenMobile = async (req, res) => {
  try {
    const { accessToken, idToken, email, name, photoUrl } = req.body;

    if (!accessToken || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Verify the Google token (you can use Google's tokeninfo endpoint or a library)
    // For now, we'll trust the token and create/find the user
    let user = await User.findOne({ email: email });

    if (!user) {
      // Create new user
      user = new User({
        name: name,
        email: email,
        googleId: idToken,
        emailVerified: true,
        isVerified: true,
        authMethod: 'google',
        role: 'jobseeker', // Default role for Google OAuth
        profilePicture: photoUrl,
      });
      await user.save();
    } else {
      // Update existing user
      user.googleId = idToken;
      user.authMethod = 'google';
      user.emailVerified = true;
      user.isVerified = true;
      if (photoUrl) user.profilePicture = photoUrl;
      user.lastLogin = new Date();
      await user.save();
    }

    // Generate JWT token
    const expiresIn = user.role === 'admin' ? '1d' : '36500d';
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    res.json({
      success: true,
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
      }
    });
  } catch (error) {
    console.error('Google token verification error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Google OAuth callback
const googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    // Get the redirect_uri from the session or use the default
    const redirectUri = req.session.redirect_uri || `${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/callback`;
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    if (err) {
      // Check if this is a mobile app request
      if (redirectUri.includes('com.mandmbsofttech.starjobs://')) {
        return res.redirect(`com.mandmbsofttech.starjobs://callback?error=${encodeURIComponent('Authentication failed')}`);
      }
      return res.redirect(`${frontendUrl}/login?error=${encodeURIComponent('Authentication failed')}`);
    }
    if (!user) {
      // Check if this is a mobile app request
      if (redirectUri.includes('com.mandmbsofttech.starjobs://')) {
        return res.redirect(`com.mandmbsofttech.starjobs://callback?error=Authentication%20failed`);
      }
      return res.redirect(`${frontendUrl}/login?error=Authentication%20failed`);
    }

    try {
      // Generate JWT token in the same format as regular login
      const expiresIn = user.role === 'admin' ? '1d' : '36500d';
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn }
      );

      // Check if this is a mobile app request
      if (redirectUri.includes('com.mandmbsofttech.starjobs://')) {
        // Redirect to mobile app with token
        return res.redirect(`com.mandmbsofttech.starjobs://callback?token=${token}&role=${user.role}`);
      } else {
        // Get the base URL from the redirect_uri for web
        const redirectBase = redirectUri.split('/auth/callback')[0];
        // Redirect to the frontend callback URL with token and role
        return res.redirect(`${redirectBase}/auth/callback?token=${token}&role=${user.role}`);
      }
    } catch (error) {
      console.error('Error generating token:', error);
      // Check if this is a mobile app request
      if (redirectUri.includes('com.mandmbsofttech.starjobs://')) {
        return res.redirect(`com.mandmbsofttech.starjobs://callback?error=${encodeURIComponent('Authentication error')}`);
      }
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
  verifyGoogleTokenMobile,
  getCurrentUser,
  logout
};
