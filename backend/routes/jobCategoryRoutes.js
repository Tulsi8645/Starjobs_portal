const express = require('express');
const router = express.Router();
const jobCategoryController = require('../controllers/jobCategoryController');
const iconUpload = require('../middleware/iconUploadMiddleware');
const { authenticate,  authorizeAdmin } = require("../middleware/authMiddleware");

// CRUD
router.post('/', iconUpload, authenticate, authorizeAdmin, jobCategoryController.createJobCategory);
router.get('/', jobCategoryController.getJobCategories);
router.get('/:id', jobCategoryController.getJobCategoryById);
router.put('/:id', iconUpload, authenticate, authorizeAdmin, jobCategoryController.updateJobCategory);
router.delete('/:id', authenticate, authorizeAdmin, jobCategoryController.deleteJobCategory);

// Extra Routes
router.patch('/:id/trending', authenticate, authorizeAdmin, jobCategoryController.patchTrending);
router.get('/trending/all', jobCategoryController.getTrendingCategories);

module.exports = router;

