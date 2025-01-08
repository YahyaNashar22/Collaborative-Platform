import express from "express";

import { createAndSendEmailOtp, getAllOtp, verifyEmailOtp } from "../controllers/otpControllers.js";

const otpRoutes = express.Router();

otpRoutes.post("/send-email-otp", createAndSendEmailOtp);
otpRoutes.post("/verify-email-otp", verifyEmailOtp);

otpRoutes.get("/get-all", getAllOtp);


export default otpRoutes;