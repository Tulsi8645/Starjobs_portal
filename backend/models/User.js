const mongoose = require("mongoose");

const options = { discriminatorKey: "role", timestamps: true };

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  googleId: { type: String, sparse: true },
  role: {
    type: String,
    enum: ["jobseeker", "employer", "admin"],
    default: "jobseeker",
  },
  isVerified: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
  otpCode: { type: String },
  otpExpires: { type: Date },
  authMethod: {
    type: String,
    enum: ["email", "google"],
    default: "email"
  }
}, options);

// Add method to find or create user from Google profile
userSchema.statics.findOrCreate = async function(profile) {
  let user = await this.findOne({ googleId: profile.id });
  
  if (!user) {
    // Check if user with this email already exists
    user = await this.findOne({ email: profile.emails[0].value });
    
    if (!user) {
      // Create new user
      user = new this({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        emailVerified: true,
        isVerified: false,
        authMethod: 'google'
      });
      await user.save();
    } else if (user.authMethod === 'email') {
      // Link Google account to existing email user
      user.googleId = profile.id;
      user.authMethod = 'both';
      user.emailVerified = true;
      user.isVerified = false;
      await user.save();
    }
  }
  
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
