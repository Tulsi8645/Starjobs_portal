const User = require("../models/User");
const Jobseeker = require("../models/Jobseeker");
const Job = require("../models/Job");
const Application = require("../models/Application");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Get Jobseeker Profile
const getJobseekerProfile = async (req, res) => {
  try {
    const jobseeker = await User.findById(req.user.id).select("-password");
    if (!jobseeker || jobseeker.role !== "jobseeker") {
      return res.status(404).json({ message: "Jobseeker not found" });
    }

    res.json(jobseeker);
  } catch (error) {
    console.error("Error in getJobseekerProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Helper to delete old files and update Jobseeker Profile
const deleteFile = (subfolder, filename) => {
  const filePath = path.join(__dirname, `../uploads/${subfolder}/${filename}`);
  fs.unlink(filePath, (err) => {
    if (err) console.error(`Failed to delete file: ${filePath}`, err.message);
  });
};

const updateJobseekerProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobseeker = await Jobseeker.findById(userId);

    if (!jobseeker || jobseeker.role !== "jobseeker") {
      return res.status(404).json({ message: "Jobseeker not found" });
    }

    // Destructure other fields from req.body
    const { name, skills, qualifications, experiences } = req.body;

    if (name) jobseeker.name = name;
    if (skills) jobseeker.skills = Array.isArray(skills) ? skills : skills.split(",");
    if (qualifications) jobseeker.qualifications = JSON.parse(qualifications);
    if (experiences) jobseeker.experiences = JSON.parse(experiences);

    // Handle profilePic file
      if (req.files?.profilePic) {
        if (jobseeker.profilePic) deleteFile("profile_pics", jobseeker.profilePic);
        jobseeker.profilePic = `/uploads/profile_pics/${req.files.profilePic[0].filename}`; 
      }

    // Handle resume file
     if (req.files?.resume) {
       if (jobseeker.resume) deleteFile("resumes", jobseeker.resume);
       jobseeker.resume = `/uploads/resumes/${req.files.resume[0].filename}`; 
     }

    await jobseeker.save();

    res.json({ message: "Profile updated successfully", jobseeker });
  } catch (error) {
    console.error("Error in updateJobseekerProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get Applied Jobs with application status
const getAppliedJobs = async (req, res) => {
  try {
    const jobseekerId = req.user.id;

    // Find applications by current jobseeker and populate job details
    const applications = await Application.find({ applicant: jobseekerId })
      .populate({
        path: "job",
        populate: {
          path: "employer", 
          select: "name email", 
        },
      })
      .select("job status createdAt"); 

    // Transform into desired response
    const jobsWithStatus = applications.map((app) => ({
      ...app.job.toObject(),
      applicationStatus: app.status,
      appliedAt: app.createdAt,
    }));

    res.json(jobsWithStatus);
  } catch (error) {
    console.error("Error in getAppliedJobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const jobseekerId = req.user.id;

    const stats = await Application.aggregate([
      {
        $match: {
          applicant: new mongoose.Types.ObjectId(jobseekerId), 
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const result = {
      totalApplications: 0,
      pending: 0,
      reviewed: 0,
      accepted: 0,
      rejected: 0,
    };

    stats.forEach((stat) => {
      result.totalApplications += stat.count;
      switch (stat._id) {
        case "Pending":
          result.pending = stat.count;
          break;
        case "Reviewed":
          result.reviewed = stat.count;
          break;
        case "Accepted":
          result.accepted = stat.count;
          break;
        case "Rejected":
          result.rejected = stat.count;
          break;
      }
    });

    res.json(result);
  } catch (error) {
    console.error("Error in getDashboardStats:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getJobseekerProfile, updateJobseekerProfile, getAppliedJobs, getDashboardStats };
