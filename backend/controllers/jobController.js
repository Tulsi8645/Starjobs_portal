const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User");
const Jobseeker = require("../models/Jobseeker");

// Get All Jobs
const getJobs = async (req, res) => {
  const { page = 1, limit = 6, location, jobtype, level, status, search } = req.query;
  const userId = req.user?._id;

  try {
    const limitNum = parseInt(limit);
    const skip = (page - 1) * limitNum;

    const filters = {};
    if (location) {filters.location = { $regex: location, $options: "i" };}
    if (jobtype) filters.jobtype = jobtype;
    if (level) filters.level = level;
    if (status) filters.status = status;
    if (search) {
     const keywords = search.trim().split(/\s+/).map(word => word.toLowerCase());
     filters.$or = [
    { title: { $in: keywords.map(word => new RegExp(`^${word}`, 'i')) } },
    { jobcategory: { $in: keywords.map(word => new RegExp(`^${word}`, 'i')) } }
    ];
  }


    const jobs = await Job.find(filters)
      .populate("employer", "name companyLogo")
      .skip(skip)
      .limit(limitNum)
      .lean();

    const jobsWithCounts = jobs.map(job => {
      const isSaved = req.user?.savedJobs?.includes(job._id.toString());
      return {
        ...job,
        likeCount: job.likes?.length || 0,
        dislikeCount: job.dislikes?.length || 0,
        isSaved: !!isSaved,
      };
    });

    const total = await Job.countDocuments(filters);

    res.json({ jobs: jobsWithCounts, total });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Get latest 6 trending jobs
const getTrendingJobs = async (req, res) => {
  try {
    const trendingJobs = await Job.find({ istrending: true })
      .sort({ updatedAt: -1 }) // Latest first
      .limit(6)
      .populate("employer", "name companyLogo")
      .lean();

    const trendingJobsWithCounts = trendingJobs.map(job => {
      const isSaved = req.user?.savedJobs?.includes(job._id.toString());
      return {
        ...job,
        likeCount: job.likes?.length || 0,
        dislikeCount: job.dislikes?.length || 0,
        isSaved: !!isSaved,
      };
    });

    res.json({ jobs: trendingJobsWithCounts });
  } catch (error) {
    console.error("Error fetching trending jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get recent 6 jobs
const getRecentJobs = async (req, res) => {
  try {
    const trendingJobs = await Job.find({ istrending: false })
      .sort({ createdAt: -1 }) 
      .limit(6)
      .populate("employer", "name companyLogo")
      .lean();

    const trendingJobsWithCounts = trendingJobs.map(job => {
      const isSaved = req.user?.savedJobs?.includes(job._id.toString());
      return {
        ...job,
        likeCount: job.likes?.length || 0,
        dislikeCount: job.dislikes?.length || 0,
        isSaved: !!isSaved,
      };
    });

    res.json({ jobs: trendingJobsWithCounts });
  } catch (error) {
    console.error("Error fetching trending jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get job by ID
const getJobById = async (req, res) => {
  const { id } = req.params;
  const viewerIp = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

  try {
    const job = await Job.findById(id)
      .populate("employer", "name email companyLogo");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Allow one view per IP per day
    const hasViewedToday = job.views.some((view) =>
      view.ip === viewerIp &&
      new Date(view.date).toDateString() === new Date().toDateString()
    );

    if (!hasViewedToday) {
      job.views.push({ ip: viewerIp, date: new Date() });
      await job.save();
    }

    const jobData = job.toObject();
    jobData.likeCount = job.likes?.length || 0;
    jobData.dislikeCount = job.dislikes?.length || 0;
    jobData.viewCount = job.views?.length || 0;

    res.json(jobData);
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Get job views per unique ip
const getJobViews = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id).select("views");

    if (!job) return res.status(404).json({ message: "Job not found" });

    let updated = false;

    // Fix invalid dates
    job.views.forEach((view) => {
      if (!(view.date instanceof Date) || isNaN(new Date(view.date))) {
        view.date = new Date();
        updated = true;
      }
    });

    if (updated) {
      await job.save();
    }

    // Get unique IPs
    const uniqueIPs = [...new Map(job.views.map(v => [v.ip, v])).values()];

    res.json({
      uniqueViewCount: uniqueIPs.length,
      uniqueViews: uniqueIPs, // array of unique view objects by IP
    });
  } catch (err) {
    console.error("Error getting job views:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Apply in Job
const applyInJob = async (req, res) => {
  const { jobId, howDidYouHear, coverLetter } = req.body;
  const jobseekerId = req.user.id;

  // Make sure multer uploaded the file
  if (!req.file) {
    return res.status(400).json({ message: "Resume file is required." });
  }

  const resumePath = req.file.path; // multer sets this automatically

  try {
    const user = await User.findById(jobseekerId);
    if (!user || user.role !== "jobseeker") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: jobseekerId,
    });

    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }

    const application = new Application({
      job: jobId,
      applicant: jobseekerId,
      howDidYouHear,
      coverLetter,
      resume: resumePath,  // Use the uploaded file path here
    });

    await application.save();

    // Optional: update job.jobseekers list
    await Job.findByIdAndUpdate(jobId, {
      $addToSet: { jobseekers: jobseekerId },
    });

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Apply error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Like a job
const likeJob = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user || user.role !== "jobseeker") {
      return res.status(403).json({ message: "Only jobseekers can like a job." });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Remove from dislikes if present
    job.dislikes = job.dislikes.filter(uid => uid.toString() !== userId.toString());

    // Toggle like
    if (job.likes.includes(userId)) {
      job.likes = job.likes.filter(uid => uid.toString() !== userId.toString());
    } else {
      job.likes.push(userId);
    }

    await job.save();
    res.json({ message: "Like updated", likes: job.likes.length,dislikes: job.dislikes.length });
  } catch (error) {
    console.error("Error liking job:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Dislike a job
const dislikeJob = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user || user.role !== "jobseeker") {
      return res.status(403).json({ message: "Only jobseekers can dislike a job." });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Remove from likes if present
    job.likes = job.likes.filter(uid => uid.toString() !== userId.toString());

    // Toggle dislike
    if (job.dislikes.includes(userId)) {
      job.dislikes = job.dislikes.filter(uid => uid.toString() !== userId.toString());
    } else {
      job.dislikes.push(userId);
    }

    await job.save();
    res.json({ message: "Dislike updated", dislikes: job.dislikes.length, likes: job.likes.length });
  } catch (error) {
    console.error("Error disliking job:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Save/Unsave job
const saveJob = async (req, res) => {
  const userId = req.user._id;
  const jobId = req.params.id;

  try {
    const jobExists = await Job.exists({ _id: jobId });
    if (!jobExists) {
      return res.status(404).json({ message: "Job not found" });
    }

    const jobseeker = await Jobseeker.findById(userId);
    if (!jobseeker) {
      return res.status(403).json({ message: "Unauthorized or not a jobseeker" });
    }

    const isSaved = jobseeker.savedJobs.includes(jobId);

    if (isSaved) {
      jobseeker.savedJobs.pull(jobId);
    } else {
      jobseeker.savedJobs.addToSet(jobId);
    }

    await jobseeker.save();

    res.status(200).json({
      message: isSaved ? "Job unsaved" : "Job saved",
      saved: !isSaved,
    });
  } catch (error) {
    console.error("Error in toggleSaveJob:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get saved jobs
const getSavedJobs = async (req, res) => {
  const jobseekerId = req.user._id;

  try {
    const jobseeker = await Jobseeker.findById(jobseekerId).lean();

    if (!jobseeker || !jobseeker.savedJobs || jobseeker.savedJobs.length === 0) {
      return res.status(200).json([]);
    }

    const savedJobs = await Job.find({ _id: { $in: jobseeker.savedJobs } })
      .populate("employer", "name email companyLogo")
      .sort({ createdAt: -1 });

    res.status(200).json(savedJobs);
  } catch (error) {
    console.error("Error fetching saved jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get applied jobs
const getAppliedJobs = async (req, res) => {
  const jobseekerId = req.user._id;

  try {
    // Find all applications by the jobseeker
    const applications = await Application.find({ applicant: jobseekerId })
      .populate({
        path: "job",
        populate: { path: "employer", select: "name email companyLogo" },
      })
      .sort({ createdAt: -1 });

    // Filter out any null jobs (in case a job was deleted)
    const appliedJobs = applications
      .map(app => app.job)
      .filter(job => job !== null);

    res.status(200).json(appliedJobs);
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  getJobs,
  getTrendingJobs,
  getRecentJobs,
  getJobById,
  getJobViews,
  applyInJob,
  likeJob,
  dislikeJob,
  saveJob,
  getSavedJobs,
  getAppliedJobs
};
