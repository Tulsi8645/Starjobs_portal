const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const {
  generateBlogContent,
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  toggleLikeBlog,
  addComment,
  getUserBlogs,
} = require("../controllers/blogController");

// Public routes (no authentication required)
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

// Protected routes (authentication required)
router.post("/generate-content", authenticate, generateBlogContent);
router.post("/", authenticate, createBlog);
router.get("/user/my-blogs", authenticate, getUserBlogs);
router.put("/:id", authenticate, updateBlog);
router.delete("/:id", authenticate, deleteBlog);
router.post("/:id/like", authenticate, toggleLikeBlog);
router.post("/:id/comment", authenticate, addComment);

module.exports = router;
