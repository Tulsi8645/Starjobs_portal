const User = require("../models/User");
const Notification = require("../models/Notification");
const Announcement = require("../models/Announcement");


exports.getJobseekerNotifications = async (req, res) => {
  try {
    // Fetch user-specific notifications
    const notifications = await Notification.find({ recipient: req.user.id })
      .sort({ createdAt: -1 })
      .populate("relatedJob")
      .populate("relatedApplication")
      .populate("relatedRevenue");

    // Fetch announcements for jobseekers and all users
    const announcements = await Announcement.find({
      targetRole: { $in: ["jobseeker", "all"] },
    }).sort({ createdAt: -1 });

    // Merge and sort by date
    const merged = [...notifications, ...announcements].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.json(merged);
  } catch (error) {
    console.error("Error fetching jobseeker notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getEmployerNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id })
      .sort({ createdAt: -1 })
      .populate("relatedJob")
      .populate("relatedApplication")
      .populate("relatedRevenue");

    const announcements = await Announcement.find({
      targetRole: { $in: ["employer", "all"] },
    }).sort({ createdAt: -1 });

    const merged = [...notifications, ...announcements].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.json(merged);
  } catch (error) {
    console.error("Error fetching employer notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAdminNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id })
      .sort({ createdAt: -1 })
      .populate("relatedJob")
      .populate("relatedApplication")
      .populate("relatedRevenue");

    const announcements = await Announcement.find({
      targetRole: { $in: ["admin", "all"] },
    }).sort({ createdAt: -1 });

    const merged = [...notifications, ...announcements].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.json(merged);
  } catch (error) {
    console.error("Error fetching admin notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
};



exports.generalAnnouncement = async (req, res) => {
  const { message, targetRole } = req.body;

  if (!message) {
    return res
      .status(400)
      .json({ message: "Announcement message is required" });
  }

  try {
    const announcement = new Announcement({
      message,
      targetRole: targetRole || "all",
      createdBy: req.user._id, 
    });

    await announcement.save();

    res
      .status(201)
      .json({ message: "Announcement created successfully", announcement });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ message: "Server error" });
  }
};
