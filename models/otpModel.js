import mongoose from "mongoose";

const { Schema, model } = mongoose;

const otpSchema = new Schema({
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    emailOtp: {
        type: String
    },
    phoneOtp: {
        type: String
    },
    emailOtpExpiresAt: {
        type: Date
    },
    phoneOtpExpiresAt: {
        type: Date
    },
});


const Otp = model("Otp", otpSchema);
export default Otp;
