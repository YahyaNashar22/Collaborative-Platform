import chalk from "chalk";
import bcrypt from 'bcryptjs';

import User from "../models/userModel.js";
import { createToken, verifyToken } from "../utils/token.js";
import { getUserByEmailService, getUserByIdService } from "../services/userServices.js";

// Register New Admin
export const registerSuper = async (req, res) => {
    // TODO: Find a way to store files on a cloud storage
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

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Check if email already exists
        const existingUser = await getUserByEmailService(email);
        if (existingUser) return res.status(401).json({ message: "email already exists" });


        // TODO: Add profile picture upload

        const newAdmin = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            company,
            address,
            country,
            language,
            role: "super"
        });
        await newAdmin.save();
        console.log(chalk.green.bold(`Super Admin ${firstName} ${lastName} has been registered successfully`));

        const token = createToken(newAdmin);
        const decoded = verifyToken(token);

        return res.status(201).json({
            message: `Super Admin ${firstName} ${lastName} Registered Successfully`,
            payload: decoded
        })
    } catch (error) {
        res.status(500).json({
            message: "Problem Registering Admin",
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
// TODO: Add change role --> super can change provider to admin

