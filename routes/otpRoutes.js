import express from "express";

import { createAndSendEmailOtp, createAndSendPhoneOtp, getAllOtp, verifyEmailOtp, verifyPhoneOtp } from "../controllers/otpControllers.js";

const otpRoutes = express.Router();

otpRoutes.post("/send-email-otp", createAndSendEmailOtp);
otpRoutes.post("/verify-email-otp", verifyEmailOtp);

otpRoutes.post("/send-phone-otp", createAndSendPhoneOtp);
otpRoutes.post("/verify-phone-otp", verifyPhoneOtp);

otpRoutes.get("/get-all", getAllOtp);


export default otpRoutes;