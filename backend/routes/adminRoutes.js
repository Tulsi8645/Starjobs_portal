const express = require("express");
const router = express.Router();
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");
const {getAdminProfile, getAdminStats, verifyEmployer, getAllApplicantsForEmployerJobs,updateApplication, getAllUsers, deleteUser, getAllJobs,editJob, deleteJob, toggleTrendingStatus} = require("../controllers/adminController");


// Get employer profile
router.get("/profile", authenticate,authorizeAdmin, getAdminProfile);

// Get admin stats
router.get("/admin-stats", authenticate, authorizeAdmin, getAdminStats);

// Verify employer
router.patch("/verify-employer/:id", authenticate, authorizeAdmin, verifyEmployer);

// Get all applicants for employer jobs
router.get("/employer/:employerId/applicants", authenticate, authorizeAdmin, getAllApplicantsForEmployerJobs);

// Update application
router.patch("/applications/:applicationId/status",authenticate, authorizeAdmin,updateApplication);

// Get all users
router.get("/users", authenticate, authorizeAdmin, getAllUsers);


// Delete user
router.delete("/user/:id", authenticate, authorizeAdmin, deleteUser);

// Get all jobs
router.get("/jobs", authenticate, authorizeAdmin, getAllJobs);

// Edit job
router.put("/job/:id", authenticate, authorizeAdmin, editJob);

// Delete job
router.delete("/job/:id", authenticate, authorizeAdmin, deleteJob);

// Update job trending status
router.patch("/jobs/:id/trending", toggleTrendingStatus);


module.exports = router;
