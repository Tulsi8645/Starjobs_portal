const express = require("express");
const router = express.Router();
const { authenticate, authorizeEmployer } = require("../middleware/authMiddleware");

const { getJobStats, getJobConversionRates, getJobPostComparison, getDashboardStats} = require('../controllers/insightController');
  
  router.get('/job-stats', authenticate, authorizeEmployer,  getJobStats);
  router.get('/dashboard-stats', authenticate, authorizeEmployer,  getDashboardStats);
  router.get('/conversion-rates', authenticate, authorizeEmployer, getJobConversionRates);
  router.get('/job-comparison', authenticate, authorizeEmployer, getJobPostComparison);
  
  module.exports = router;