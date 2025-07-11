const Job = require("../models/Job");
const User = require("../models/User");
const Jobseeker = require("../models/Jobseeker");
const Employer = require("../models/Employer");
const Application = require("../models/Application");

// Get Admin Profile
const getAdminProfile = async (req, res) => {
  try {
    // Fetch the user by ID and ensure they are an admin
    const admin = await User.findById(req.user.id).select("-password");
    
    // Check if the user exists and is an admin
    if (!admin || admin.role !== "admin") {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Return the admin profile data
    res.json(admin);
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get Admin Stats
const getAdminStats = async (req, res) => {
  try {
    const totalJobseekers = await User.countDocuments({ role: "jobseeker" });
    const totalEmployers = await User.countDocuments({ role: "employer" });
    const totalJobs = await Job.countDocuments();

    res.status(200).json({
      totalJobseekers,
      totalEmployers,
      totalJobs,
    });
  } catch (error) {
    console.error("Error getting admin stats:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Verify Employer
const verifyEmployer = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user || user.role !== "employer") {
      return res.status(400).json({ message: "User is not an employer" });
    }

    user.isVerified = !user.isVerified;
    await user.save();

    res.json({
      message: user.isVerified
        ? "Employer verified successfully"
        : "Employer banned successfully",
    });
  } catch (error) {
    console.error("Error verifying employer status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Applicants for Employer Jobs
const getAllApplicantsForEmployerJobs = async (req, res) => {
  const employerId = req.params.employerId;

  try {
    // Step 1: Get all jobs posted by this employer
    const jobs = await Job.find({ employer: employerId }).select("_id title");

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for this employer" });
    }

    // Step 2: Collect all job IDs
    const jobIds = jobs.map((job) => job._id);

    // Step 3: Find all applications for these jobs
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate("applicant", "name profilePic email") // Include applicant details
      .populate("job", "title"); // Optional: include job title

    // Step 4: Group applications by job
    const groupedApplications = {};

    applications.forEach((app) => {
      const jobId = app.job._id.toString();

      if (!groupedApplications[jobId]) {
        groupedApplications[jobId] = {
          jobTitle: app.job.title,
          jobId: app.job._id,
          applicants: [],
        };
      }

      groupedApplications[jobId].applicants.push({
        applicationId: app._id,
        applicant: app.applicant,
        coverLetter: app.coverLetter,
        resume: app.resume,
        status: app.status,
        appliedAt: app.createdAt,
      });
    });

    // Convert grouped object to array
    const result = Object.values(groupedApplications);

    res.json(result);
  } catch (error) {
    console.error("Error fetching applicants for employer jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Application 
const updateApplication = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  const allowedStatuses = ["Pending", "Reviewed", "Accepted", "Rejected"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();

    res.json({
      message: "Application status updated successfully",
      updatedApplication: {
        applicationId: application._id,
        status: application.status,
      },
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const jobseekers = await Jobseeker.find();
    const employers = await Employer.find();
    const admins = await User.find({ role: "admin" });

    const users = [...jobseekers, ...employers, ...admins];
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // Fetch the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is an admin
    if (user.role === "admin") {
      return res.status(403).json({ message: "Admins cannot be deleted" });
    }

    // Proceed with deleting the user
    await User.findByIdAndDelete(userId);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get All Jobs
const getAllJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const search = req.query.search || "";

    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const [jobs, total] = await Promise.all([
      Job.find(query)
        .populate("employer", "name")
        .skip((page - 1) * limit)
        .limit(limit),
      Job.countDocuments(query),
    ]);

    res.json({
      jobs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Delete a Job
const deleteJob = async (req, res) => {
  const jobId = req.params.id;

  try {
    const job = await Job.findByIdAndDelete(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {getAdminProfile, getAdminStats, verifyEmployer, getAllApplicantsForEmployerJobs, updateApplication, getAllUsers, deleteUser, getAllJobs, deleteJob};