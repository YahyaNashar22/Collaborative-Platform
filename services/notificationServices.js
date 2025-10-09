import chalk from "chalk";

import Notification from "../models/notificationModel.js";


// utility to create notification
export const createNotificationService = async (userId, text) => {
    try {
        const notification = new Notification({ userId, text });
        await notification.save();
    } catch (error) {
        console.log(chalk.yellow.bold(error));
    }
}

// get all notifications
export const getAllNotificationsForUserService = async (userId) => {
    try {
        const notifications = await Notification.find({ userId });
        return notifications;
    } catch (error) {
        console.log(chalk.yellow.bold(error));
    }
}

// delete notification - mark as read
export const deleteNotificationService = async (notificationId) => {
    try {
        await Notification.findByIdAndDelete(notificationId);
    } catch (error) {
        console.log(chalk.yellow.bold(error));
    }
}


// delete all notifications - mark all read
export const deleteAllNotificationsService = async (userId) => {
    try {
        await Notification.deleteMany({ userId });
    } catch (error) {
        console.log(chalk.red.bold(error.message));
    }
}