import chalk from "chalk";
import User from "../models/userModel.js";
import { generateExpiryDate, generateOtp } from "../utils/otp.js";

export const getUserByEmailService = async (email) => {
    try {
        const user = await User.findOne({ email });
        console.log(chalk.yellow.bold(`User Fetched By Email --> ${user}`));
        return user;
    } catch (error) {
        console.log(chalk.red.bold("Problem Fetching User By Email"));
        console.error(error);
        return null;
    }
}

export const getUserByIdService = async (id) => {
    try {
        const user = await User.findById(id);
        console.log(chalk.yellow.bold(`User Fetched By Id --> ${user}`));
        return user;
    } catch (error) {
        console.log(chalk.red.bold("Problem Fetching User By Id"));
        console.error(error);
        return null;
    }
}


// Generate OTP For email
export const generateAndSendEmailOtp = async (email) => {
    const otp = generateOtp();
    const expiryDate = generateExpiryDate();

    // update the user with the new email otp and expiry time
    await User.findOneAndUpdate({ email }, { emailOtp: otp, emailOtpExpiredAt: emailOtpExpiredAt });
}