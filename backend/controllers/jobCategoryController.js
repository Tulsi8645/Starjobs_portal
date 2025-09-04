const JobCategory = require('../models/JobCategory');

// Create
exports.createJobCategory = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Icon file is required' });
    }

    const jobCategory = await JobCategory.create({
      name: req.body.name,
      icon: req.file.filename, // store uploaded filename
      isTrending: req.body.isTrending || false,
    });

    res.status(201).json(jobCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read All
exports.getJobCategories = async (req, res) => {
  try {
    const categories = await JobCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read One
exports.getJobCategoryById = async (req, res) => {
  try {
    const category = await JobCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update (supports updating icon if uploaded)
exports.updateJobCategory = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.icon = req.file.filename;
    }

    const category = await JobCategory.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!category) return res.status(404).json({ error: 'Not found' });
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
exports.deleteJobCategory = async (req, res) => {
  try {
    const category = await JobCategory.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Patch isTrending
exports.patchTrending = async (req, res) => {
  try {
    const { isTrending } = req.body;
    if (typeof isTrending !== 'boolean') {
      return res.status(400).json({ error: 'isTrending must be boolean' });
    }

    const category = await JobCategory.findByIdAndUpdate(
      req.params.id,
      { isTrending },
      { new: true }
    );

    if (!category) return res.status(404).json({ error: 'Not found' });
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Trending
exports.getTrendingCategories = async (req, res) => {
  try {
    const trending = await JobCategory.find({ isTrending: true });
    res.json(trending);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
