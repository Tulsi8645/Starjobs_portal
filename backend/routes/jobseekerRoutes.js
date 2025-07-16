const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const userUpload = require('../middleware/userUploadMiddleware');
const {
  getJobseekerProfile,
  updateJobseekerProfile,
  getAppliedJobs,
  getDashboardStats
} = require("../controllers/jobseekerController");

// Get jobseeker profile
router.get("/profile", authenticate, getJobseekerProfile);

// Update jobseeker profile
router.put("/profile", authenticate,  userUpload, updateJobseekerProfile);

// Get applied jobs
router.get("/applied-jobs", authenticate, getAppliedJobs);

// Get dashboard stats
router.get("/dashboard-stats", authenticate, getDashboardStats);


module.exports = router;
