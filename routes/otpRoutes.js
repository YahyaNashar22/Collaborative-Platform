import express from "express";

import { createAndSendEmailOtp, verifyEmailOtp } from "../controllers/otpControllers.js";

const otpRoutes = express.Router();

otpRoutes.post("/send-email-otp", createAndSendEmailOtp);
otpRoutes.post("/verify-email-otp", verifyEmailOtp);


export default otpRoutes;