const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

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

module.exports = passport;
