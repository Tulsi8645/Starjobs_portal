const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    howDidYouHear: {
      type: String,
      trim: true,
    },
    coverLetter: {
      type: String, 
      required: true,
    },
    resume: {
      type: String, 
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
