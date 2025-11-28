const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "application_update",
        "new_application",
        "job_status_update",
        "password_reset",  
        "password_change",
        "job_application",
        "employer_registration",
        "job_post",
        "account_verification",
        "general_announcement", 
      ],
    },
    message: {
      type: String,
      required: true,
    },
    relatedJob: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    relatedApplication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
    relatedRevenue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Revenue",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
