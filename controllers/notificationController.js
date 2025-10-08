import { deleteAllNotificationsService, deleteNotificationService, getAllNotificationsForUserService } from "../services/notificationServices.js";

// get all notifications for user
export const getAllNotificationsForUser = async (req, res) => {
    try {
        const { userId } = req.body;

        const notifications = await getAllNotificationsForUserService(userId);

        return res.status(200).json({
            message: "notifications fetched successfully",
            payload: notifications
        })
    } catch (error) {
        return res.status(500).json({ message: "problem retrieving notifications", error: error.message });
    }
}

// delete notification - mark it as read
export const deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;

        await deleteNotificationService(notificationId);

        return res.status(200).json({
            message: "notification deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({ message: "problem deleting notification", error: error.message });
    }
}


// delete all notifications - mark all as read
export const deleteAllNotification = async (req, res) => {
    try {
        const { userId } = req.params;

        await deleteAllNotificationsService(userId);

        return res.status(200).json({
            message: "notifications deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({ message: "problem deleting notifications", error: error.message });
    }
}