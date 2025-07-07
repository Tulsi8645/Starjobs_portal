const mongoose = require("mongoose");
const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User");
const Jobseeker = require("../models/Jobseeker");


// Job Stats
const getJobStats = async (req, res) => {
  const employerId = req.user.id;

  try {
    const jobs = await Job.find({ employer: employerId }).select("title views").lean();

    const comparisonData = await Promise.all(
      jobs.map(async (job) => {
        const applications = await Application.countDocuments({ job: job._id });
        const views = job.views?.length || 0;

        return {
          title: job.title,
          views,
          applications,
        };
      })
    );

    res.status(200).json({ success: true, data: comparisonData });
  } catch (error) {
    console.error("Error in getJobStats:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};



// Conversion Rates (Pie Chart)
const getJobConversionRates = async (req, res) => {
  const employerId = req.user.id;
  try {
    const jobs = await Job.find({ employer: employerId }).select("title views").lean();

    const conversionData = await Promise.all(
      jobs.map(async (job) => {
        const apps = await Application.countDocuments({ job: job._id });
        const views = job.views?.length || 0;
        const rate = views ? ((apps / views) * 100).toFixed(1) : 0;
        return {
          name: job.title,
          value: parseFloat(rate),
        };
      })
    );

    res.json(conversionData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get job conversion rates" });
  }
};

// Job Post Comparison (Table)
const getJobPostComparison = async (req, res) => {
  const employerId = req.user.id;
  try {
    const jobs = await Job.find({ employer: employerId }).select("title views").lean();

    const comparisonData = await Promise.all(
      jobs.map(async (job) => {
        const applications = await Application.countDocuments({ job: job._id });
        const views = job.views?.length || 0;
        const conversionRate = views ? ((applications / views) * 100).toFixed(1) + "%" : "0%";

        return {
          title: job.title,
          views,
          applications,
          conversionRate,
        };
      })
    );

    res.json(comparisonData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get job post comparison" });
  }
};


// Dashboard Stats 
const getDashboardStats = async (req, res) => {
  try {
    // Total Jobs
    const totalJobs = await Job.countDocuments();
    // Total Applications
    const totalApplications = await Application.countDocuments();
    // Pending Applications
    const pendingApplications = await Application.countDocuments({ status: "Pending" });
    // Total Views (sum of all views arrays' lengths)
    const jobs = await Job.find({}, "views");
    const totalViews = jobs.reduce((sum, job) => sum + (job.views?.length || 0), 0);
    // Optional: Conversion rate
    const conversionRate = totalViews > 0 ? ((totalApplications / totalViews) * 100).toFixed(2) : "0";

    res.status(200).json({
      totalJobs,
      totalViews,
      totalApplications,
      pendingApplications,
      conversionRate: `${conversionRate}%`,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Failed to get dashboard stats" });
  }
};



module.exports = {
  getJobStats,
  getJobConversionRates,
  getDashboardStats,
  getJobPostComparison,
};
