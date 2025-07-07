const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");
const mongoose = require("mongoose");

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

module.exports = { getJobseekerProfile, getAppliedJobs, getDashboardStats };
