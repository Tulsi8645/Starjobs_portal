// controllers/employerController.js
const Job = require("../models/Job");
const User = require("../models/User");
const Employer = require("../models/Employer");
const Application = require("../models/Application");
const fs = require("fs");
const path = require("path");

// Get Employer Profile
const getEmployerProfile = async (req, res) => {
  try {
    // Fetch the user by ID and ensure they are an employer
    const employer = await User.findById(req.user.id).select("-password");
    if (!employer || employer.role !== "employer") {
      return res.status(404).json({ message: "Employer not found" });
    }

    // Return the employer profile data
    res.json(employer);
  } catch (error) {
    console.error("Error fetching employer profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Helper to delete old files and update Employer Profile
const deleteFile = (subfolder, filename) => {
  const filePath = path.join(__dirname, `../uploads/${subfolder}/${filename}`);
  fs.unlink(filePath, (err) => {
    if (err) console.error(`Failed to delete file: ${filePath}`, err.message);
  });
};

const updateEmployerProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const employer = await Employer.findById(userId);

    if (!employer || employer.role !== "employer") {
      return res.status(404).json({ message: "Employer not found" });
    }

    // Destructure and update fields if present
    const {
      name,
      industryType,
      address,
      telephone,
      panNumber,
      companySize,
      establishedDate,
      description,
    } = req.body;

    if (name) employer.name = name;
    if (industryType) employer.industryType = industryType;
    if (address) employer.address = address;
    if (telephone) employer.telephone = telephone;
    if (panNumber) employer.panNumber = panNumber;
    if (companySize) employer.companySize = companySize;
    if (establishedDate) employer.establishedDate = establishedDate;
    if (description) employer.description = description;

    // Handle companyLogo upload
    if (req.files?.companyLogo?.[0]) {
      if (employer.companyLogo) {
        const oldFilename = path.basename(employer.companyLogo);
        deleteFile("company_logos", oldFilename);
      }

      employer.companyLogo = `/uploads/company_logos/${req.files.companyLogo[0].filename}`;
    }

    await employer.save();

    res.status(200).json(employer);
  } catch (error) {
    console.error("Error in updateEmployerProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Create Job
const createJob = async (req, res) => {
  const {
    title,
    location,
    jobtype,
    salary,
    experience,
    jobcategory,
    level,
    deadline,
    openings,
    istrending,
    status,
    description,
  } = req.body;

  const employerId = req.user.id;

  try {
    const employer = await User.findById(employerId);

    if (!employer || employer.role !== "employer" || !employer.isVerified) {
      return res
        .status(403)
        .json({ message: "User is not authorized to create jobs" });
    }

    const job = new Job({
      title,
      location,
      jobtype,
      salary,
      experience,
      jobcategory,
      level,
      deadline,
      openings,
      istrending: istrending || false,
      status: status || "Active",
      description,
      employer: employerId,
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Edit Job
const editJob = async (req, res) => {
  const { jobId } = req.params;
  const employerId = req.user.id;

  try {
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.employer.toString() !== employerId) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this job" });
    }

    // Update only fields present in req.body
    const updatableFields = [
      "title",
      "location",
      "jobtype",
      "salary",
      "experience",
      "jobcategory",
      "level",
      "deadline",
      "openings",
      "istrending",
      "status",
      "description",
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        job[field] = req.body[field];
      }
    });

    await job.save();
    res.json(job);
  } catch (error) {
    console.error("Error editing job:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Application 
const updateApplication = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;
  const employerId = req.user.id;

  const allowedStatuses = ["Pending", "Reviewed", "Accepted", "Rejected"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    // Find the application
    const application = await Application.findById(applicationId).populate("job");
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Check if the employer owns the job related to the application
    if (application.job.employer.toString() !== employerId) {
      return res.status(403).json({ message: "Not authorized to update this application" });
    }

    // Update status
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

// Delete Job
const deleteJob = async (req, res) => {
  const { jobId } = req.params;
  const employerId = req.user.id;

  try {
    // Find the job by ID
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the employer is authorized to delete this job
    if (job.employer.toString() !== employerId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this job" });
    }

    // Use deleteOne method to delete the job
    await Job.deleteOne({ _id: jobId });
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get applicants for a specific job with full application details
const getAppliedJobseekers = async (req, res) => {
  const { jobId } = req.params;
  const employerId = req.user.id;

  try {
    // Step 1: Validate job ownership
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.employer.toString() !== employerId) {
      return res.status(403).json({ message: "Not authorized to view this job's applicants" });
    }

    // Step 2: Get applications for this job
    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email")
      .sort({ createdAt: -1 });

    // Step 3: Format response
    const applicants = applications.map((app) => ({
      applicationId: app._id,
      applicant: app.applicant,
      coverLetter: app.coverLetter,
      resume: app.resume,
      status: app.status,
      appliedAt: app.createdAt,
    }));

    res.json({
      jobTitle: job.title,
      jobId: job._id,
      applicants,
    });
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get Employer's Jobs
const getEmployerJobs = async (req, res) => {
  const employerId = req.user.id; // Get the authenticated user's ID

  try {
    // Find jobs where the employer is the logged-in user
    const jobs = await Job.find({ employer: employerId });

    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found for this employer" });
    }

    res.json(jobs);
  } catch (error) {
    console.error("Error fetching employer jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get All Applicants for Employer Jobs
const getAllApplicantsForEmployerJobs = async (req, res) => {
  const employerId = req.user.id;

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


module.exports = {
  getEmployerProfile,
  updateEmployerProfile,
  createJob,
  editJob,
  updateApplication,
  deleteJob,
  getAppliedJobseekers,
  getEmployerJobs,
  getAllApplicantsForEmployerJobs
};
