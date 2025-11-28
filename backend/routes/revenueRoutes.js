const express = require("express");
const router = express.Router();
const revenueController = require("../controllers/revenueController");

router.get("/allemployers", revenueController.getEmployerJobs);
router.get("/employer/:employerId/jobs", revenueController.getJobsByEmployer);
router.get("/", revenueController.getAllRevenue);
router.post("/", revenueController.addRevenue);
router.put("/:id", revenueController.editRevenue);
router.delete("/:id", revenueController.deleteRevenue);

module.exports = router;
