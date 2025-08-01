const express = require("express");
const router = express.Router();
const { authenticate, authorizeEmployer } = require("../middleware/authMiddleware");
const userUpload = require('../middleware/userUploadMiddleware');
const { getEmployerProfile, updateEmployerProfile, createJob, editJob, updateApplication, deleteJob, getAppliedJobseekers, getEmployerJobs, getEmployerDashboardStats, getAllApplicantsForEmployer, getAllApplicantsForEmployerJobs} = require("../controllers/employerController");

// Get employer profile
router.get("/profile", authenticate, getEmployerProfile);

// Update employer profile
router.put("/profile", authenticate,  userUpload, updateEmployerProfile);

// Create job
router.post("/jobs", authenticate, authorizeEmployer, createJob);

// Edit job
router.put("/jobs/:jobId", authenticate, authorizeEmployer, editJob);

//Patch job
router.patch("/jobs/:jobId", authenticate, authorizeEmployer, editJob);

// Update application
router.patch("/applications/:applicationId/status",authenticate, authorizeEmployer,updateApplication);

// Delete job
router.delete("/jobs/:jobId", authenticate, authorizeEmployer, deleteJob);

// Get applied jobseekers
router.get("/jobs/:jobId/jobseekers", authenticate, authorizeEmployer, getAppliedJobseekers);

// Get employer jobs
router.get("/my-jobs", authenticate, authorizeEmployer, getEmployerJobs);

// Get employer dashboard stats
router.get("/dashboard-stats", authenticate, authorizeEmployer, getEmployerDashboardStats);

// Get employer jobs applications
router.get("/my-jobs/applications", authenticate, authorizeEmployer, getAllApplicantsForEmployer);

// Get all applicants for employer jobs
router.get("/my-jobs/applicants", authenticate, authorizeEmployer, getAllApplicantsForEmployerJobs);

module.exports = router;
