import chalk from "chalk";
import User from "../models/userModel.js";

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