const Blog = require("../models/Blog");
const User = require("../models/User");
const Jobseeker = require("../models/Jobseeker");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Employer = require("../models/Employer");

// Generate blog content using Gemini

const generateBlogContent = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Initialize Gemini client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Build the prompt
    const prompt = `
      You are a professional blog writer. 
      Create engaging, informative blog content based on the given title. 
      The content should be well-structured with clear paragraphs and professional tone.
      Title: ${title}
    `;

    // Generate content
    const result = await model.generateContent(prompt);
    const generatedContent = result.response.text();

    res.status(200).json({
      success: true,
      content: generatedContent,
    });
  } catch (error) {
    console.error("Error generating blog content:", error);
    res.status(500).json({
      message: "Failed to generate blog content",
      error: error.message,
    });
  }
};



// Create a new blog
const createBlog = async (req, res) => {
  try {
    const { title, content, images, tags, isAIGenerated } = req.body;
    const userId = req.user.id;

    // Get user details to set author image
    let authorImage = "";
    const user = await User.findById(userId);
    
    if (user.role === "jobseeker") {
      const jobseeker = await Jobseeker.findOne({ _id: userId });
      authorImage = jobseeker?.profilepic || "";
    } else if (user.role === "employer") {
      const employer = await Employer.findOne({ _id: userId });
      authorImage = employer?.companylogo || "";
    }

    const blog = new Blog({
      title,
      content,
      author: userId,
      authorImage,
      images: images || [],
      tags: tags || [],
      isAIGenerated: isAIGenerated || false,
    });

    await blog.save();
    await blog.populate("author", "name email role");

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({
      message: "Failed to create blog",
      error: error.message,
    });
  }
};

// Get all blogs with pagination
const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    let query = { isPublished: true };
    
    if (search) {
      query.$text = { $search: search };
    }

    const blogs = await Blog.find(query)
      .populate("author", "name email role")
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Blog.countDocuments(query);

    res.status(200).json({
      success: true,
      blogs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalBlogs: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({
      message: "Failed to fetch blogs",
      error: error.message,
    });
  }
};

// Get single blog by ID
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const clientIp = req.ip || req.connection.remoteAddress;

    const blog = await Blog.findById(id)
      .populate("author", "name email role")
      .populate("comments.author", "name email role");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Add view if not already viewed by this IP today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingView = blog.views.find(
      view => view.ip === clientIp && view.date >= today
    );

    if (!existingView) {
      blog.views.push({ ip: clientIp, date: new Date() });
      await blog.save();
    }

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({
      message: "Failed to fetch blog",
      error: error.message,
    });
  }
};

// Update blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, images, tags } = req.body;
    const userId = req.user.id;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if user is the author
    if (blog.author.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to update this blog" });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.images = images || blog.images;
    blog.tags = tags || blog.tags;

    await blog.save();
    await blog.populate("author", "name email role");

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({
      message: "Failed to update blog",
      error: error.message,
    });
  }
};

// Delete blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if user is the author
    if (blog.author.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({
      message: "Failed to delete blog",
      error: error.message,
    });
  }
};

// Like/Unlike blog
const toggleLikeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const likeIndex = blog.likes.indexOf(userId);

    if (likeIndex > -1) {
      // Unlike
      blog.likes.splice(likeIndex, 1);
    } else {
      // Like
      blog.likes.push(userId);
    }

    await blog.save();

    res.status(200).json({
      success: true,
      message: likeIndex > -1 ? "Blog unliked" : "Blog liked",
      likesCount: blog.likes.length,
      isLiked: likeIndex === -1,
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({
      message: "Failed to toggle like",
      error: error.message,
    });
  }
};

// Add comment to blog
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.comments.push({
      author: userId,
      content: content.trim(),
    });

    await blog.save();
    await blog.populate("comments.author", "name email role");

    const newComment = blog.comments[blog.comments.length - 1];

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({
      message: "Failed to add comment",
      error: error.message,
    });
  }
};

// Get user's blogs
const getUserBlogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find({ author: userId })
      .populate("author", "name email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Blog.countDocuments({ author: userId });

    res.status(200).json({
      success: true,
      blogs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalBlogs: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    res.status(500).json({
      message: "Failed to fetch user blogs",
      error: error.message,
    });
  }
};

module.exports = {
  generateBlogContent,
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  toggleLikeBlog,
  addComment,
  getUserBlogs,
};
