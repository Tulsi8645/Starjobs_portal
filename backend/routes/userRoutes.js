const express = require("express");
const router = express.Router();
const userUpload = require('../middleware/userUploadMiddleware');
const { authenticate } = require("../middleware/authMiddleware");
const {registerUser,loginUser,forgotPassword,resetPassword,changePassword} = require("../controllers/userController");
const { verifyOtp, resendOtp } = require("../controllers/verifyController");


router.post("/register", userUpload, registerUser);

router.post("/login", loginUser);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password",authenticate,  changePassword);


module.exports = router;