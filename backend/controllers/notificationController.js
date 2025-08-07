const User = require("../models/User");
const Notification = require("../models/Notification");

exports.getJobseekerNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id })
      .sort({ createdAt: -1 })
      .populate("relatedJob")
      .populate("relatedApplication")
      .populate("relatedRevenue");

    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
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

    res.json(notifications);
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

    res.json(notifications);
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
    let filter = {};

    if (targetRole && targetRole !== "all") {
      filter.role = targetRole;
    }

    const users = await User.find(filter);

    if (!users.length) {
      return res
        .status(404)
        .json({ message: "No users found for this announcement" });
    }

    const notifications = users.map((user) => ({
      recipient: user._id,
      type: "general_announcement",
      message,
    }));

    await Notification.insertMany(notifications);

    res
      .status(201)
      .json({ message: `Announcement sent to ${users.length} user(s)` });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ message: "Server error" });
  }
};