const Notification = require("../models/Notification");

const sendNotification = async ({
  recipient,
  type,
  message,
  relatedJob = null,
  relatedApplication = null,
  relatedRevenue = null,
}) => {
  try {
    await Notification.create({
      recipient,
      type,
      message,
      relatedJob,
      relatedApplication,
      relatedRevenue,
    });
  } catch (error) {
    console.error("Failed to send notification:", error.message);
  }
};

module.exports = sendNotification;
