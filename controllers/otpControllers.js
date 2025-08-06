import {
  createEmailOtpService,
  createPhoneOtpService,
  deleteOtpByIdService,
  findOtpByEmailService,
  findOtpByPhoneService,
  getAllOtpService,
} from "../services/otpServices.js";
import { otpTemplate } from "../utils/emailTemplates.js";
import { generateExpiryDate, generateOtp } from "../utils/otp.js";
import { sendPhoneOtp } from "../utils/twilioClient.js";

// Create and send email OTP
export const createAndSendEmailOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Generate OTP
    const emailOtp = generateOtp();
    const expiryDate = generateExpiryDate();

    // add otp to db
    const otp = createEmailOtpService(email, emailOtp, expiryDate);

    // send email
    otpTemplate(email, emailOtp);

    res.status(201).json({
      message: "Email OTP Sent Successfully",
      payload: otp,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Creating Email Otp",
      error: error.message,
    });
  }
};

// Verify email OTP
export const verifyEmailOtp = async (req, res) => {
  try {
    const { email, emailOtp } = req.body;

    const otp = await findOtpByEmailService(email);

    if (!otp)
      return res
        .status(404)
        .json({ message: "OTP not found!", success: false });

    const currentTime = Date.now();
    // verify otp
    if (otp.emailOtp != emailOtp || otp.emailOtpExpiresAt < currentTime) {
      return res
        .status(400)
        .json({ message: "Invalid or expired email OTP", success: false });
    }

    // delete otp after verification
    await deleteOtpByIdService(otp._id);

    // if OTP is valid, proceed
    return res.status(200).json({
      message: "OTP verified successfully. Proceed.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Verifying Email Otp",
      error: error.message,
      success: false,
    });
  }
};

// create and send phone OTP
export const createAndSendPhoneOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    // Generate OTP
    const phoneOtp = generateOtp();
    const expiryDate = generateExpiryDate();

    // add otp to db
    const otp = createPhoneOtpService(phone, phoneOtp, expiryDate);

    // send sms
    sendPhoneOtp(phone, phoneOtp);

    res.status(201).json({
      message: "Phone OTP Sent Successfully",
      payload: otp,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Creating Phone Otp",
      error: error.message,
    });
  }
};

// verify phone OTP
export const verifyPhoneOtp = async (req, res) => {
  try {
    const { phone, phoneOtp } = req.body;

    const otp = await findOtpByPhoneService(phone);

    if (!otp) return res.status(404).json({ message: "OTP not found!" });

    const currentTime = Date.now();

    // verify otp
    if (otp.phoneOtp != phoneOtp || otp.phoneOtpExpiresAt < currentTime) {
      return res.status(400).json({ message: "Invalid or expired phone OTP" });
    }

    // delete otp after verification
    await deleteOtpByIdService(otp._id);

    // if OTP is valid, proceed
    return res.status(200).json({
      message: "OTP verified successfully. Proceed.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Verifying Phone Otp",
      error: error.message,
    });
  }
};

// -----------------------------------------------------------------------------------------------
// TEST GET ALL OTP
// -----------------------------------------------------------------------------------------------
export const getAllOtp = async (req, res) => {
  try {
    const otp = await getAllOtpService();

    if (!otp || otp.length === 0)
      return res.status(404).json({ message: "no current otp" });

    return res.status(200).json({
      message: "current otp found",
      payload: otp,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Fetching Otp",
      error: error.message,
    });
  }
};
// -----------------------------------------------------------------------------------------------
