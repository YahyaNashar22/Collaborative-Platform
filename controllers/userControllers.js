import chalk from "chalk";
import bcrypt from 'bcryptjs';

import User from "../models/userModel.js";
import { createToken, verifyToken } from "../utils/token.js";
import { getUserByEmailService, getUserByIdService } from "../services/userServices.js";
import removeImage from "../utils/removeImage.js";
import { otpTemplate } from "../utils/emailTemplates.js";
import { sendPhoneOtp } from "../utils/twilioClient.js";


// Register New Super
export const registerSuper = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            phone,
            company,
            address,
            country,
            language,
        } = req.body;

        const image = req.file?.filename;

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Check if email already exists
        const existingUser = await getUserByEmailService(email);
        if (existingUser) return res.status(401).json({ message: "email already exists" });

        const newSuper = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            company,
            address,
            country,
            language,
            profilePicture: image,
            role: "super"
        });
        await newSuper.save();
        console.log(chalk.green.bold(`Super Admin ${firstName} ${lastName} has been registered successfully`));

        // sign in after registration
        const token = createToken(newSuper);
        const decoded = verifyToken(token);

        return res.status(201).json({
            message: `Super Admin ${firstName} ${lastName} Registered Successfully`,
            payload: decoded
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Problem Registering Super",
            error: error.message
        });
    }
}

// Fetch All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });

        if (users.length === 0) return res.status(404).json({ message: "No users found!", payload: users });
        return res.status(200).json({ message: "Users found!", payload: users });

    } catch (error) {
        res.status(500).json({
            message: "Problem fetching all users",
            error: error.message
        });
    }
}

// Fetch a Single User By Id
export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await getUserByIdService(id);

        if (!user) return res.status(404).json({ message: "User Not Found" });
        return res.status(200).json({ message: "User Found", payload: user });
    } catch (error) {
        res.status(500).json({
            message: "Problem fetching user",
            error: error.message
        });
    }
}

// Delete User
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await getUserByIdService(id);
        if (!user) return res.status(404).json({ message: "User not found!" });

        if (user && user.profilePicture && user.profilePicture !== "/images/profile.png") removeImage(user.profilePicture);

        await User.findByIdAndDelete(id);

        res.status(200).json({
            message: `${user.firstName} ${user.lastName} Deleted Successfully`,
            payload: user
        });
    } catch (error) {
        res.status(500).json({
            message: "Problem deleting user",
            error: error.message
        });
    }
}

// TODO: Add profile edits
// TODO: Add forget password
// TODO: Add ban user
// TODO: Add login
// TODO: Add OTP email
// TODO: Add OTP phone number
// TODO: Add upload Files
// TODO: Add change availability ( for providers )
// TODO: Add provider sign up
// TODO: Add client sign up
// TODO: Add create admin --> admin should have his own customers and only the super as provider -- admin can only view
// TODO: Find a way to store files on a cloud storage ( Recommended files.fm )






// ----------------------------------------------------------------------
// TEST EMAIL CONTROLLER
// ----------------------------------------------------------------------
export const sendEmail = (req, res) => {
    try {
        otpTemplate("2silentninja2@gmail.com", "124232");
        res.status(201).json({ message: "Email Sent Successfully" });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Something Went Wrong" });
    }

}
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------
// TEST SMS CONTROLLER
// ----------------------------------------------------------------------
export const sendSMS = async (req, res) => {
    try {
        await sendPhoneOtp("+96176153425", "123456");
        res.status(200).json({ message: "sms sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something Went Wrong", error: error.message });
    }
}
// ----------------------------------------------------------------------