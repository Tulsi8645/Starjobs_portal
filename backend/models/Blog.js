const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorImage: {
      type: String, // Will store profilepic or companylogo URL
    },
    images: [
      {
        url: { type: String, required: true },
        caption: { type: String },
      }
    ],
    tags: [
      {
        type: String,
        trim: true,
      }
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    comments: [commentSchema],
    views: [
      {
        ip: { type: String, required: true },
        date: { type: Date, required: true, default: Date.now },
      }
    ],
    isPublished: {
      type: Boolean,
      default: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    isAIGenerated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better performance
blogSchema.index({ author: 1, publishedAt: -1 });
blogSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("Blog", blogSchema);
