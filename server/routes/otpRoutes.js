import express from "express";
import { forgotPasswordEmail, forgotPasswordVerify, sendOTP,verifyOTP } from "../controllers/otpController.js";
const router= express.Router();

// router.post("/sendOTP",sendOTP);
// router.post("/verifyOTP",verifyOTP);
router.post("/forgotPasswordEmail",forgotPasswordEmail);
router.post("/forgotPasswordVerify",forgotPasswordVerify);

export default router;