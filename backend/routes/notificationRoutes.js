// routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const { authenticate, authorizeEmployer, authorizeAdmin } = require("../middleware/authMiddleware");
const { getJobseekerNotifications, getEmployerNotifications, getAdminNotifications, generalAnnouncement} = require("../controllers/notificationController");


router.get("/jobseeker",authenticate, getJobseekerNotifications);
router.get("/employer",authenticate, authorizeEmployer, getEmployerNotifications);
router.get("/admin",authenticate, authorizeAdmin, getAdminNotifications);


// route to create general announcement
router.post("/announcement", authenticate, authorizeAdmin, generalAnnouncement);

module.exports = router;
