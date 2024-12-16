import chalk from "chalk";
import User from "../models/userModel.js";

// Register New Admin
export const registerAdmin = async (req, res) => {
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
            language,
        } = req.body;

        const newAdmin = new User({
            firstName,
            lastName,
            email,
            password,
            phone,
            company,
            address,
            language,
            role: "super"
        });
        await newAdmin.save();
        console.log(chalk.green.bold(`Admin ${firstName} ${lastName} has been registered successfully`));

        return res.status(201).json({
            message: `Admin ${firstName} ${lastName} Registered Successfully`,
            payload: newAdmin
        })
    } catch (error) {
        res.status(500).json({
            message: "Problem Registering Admin",
            error: error.message
        });
    }
}