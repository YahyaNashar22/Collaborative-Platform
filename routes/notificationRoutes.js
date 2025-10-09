import express from "express";
import { deleteAllNotification, deleteNotification, getAllNotificationsForUser } from "../controllers/notificationController.js";

const notificationRoutes = express.Router();


notificationRoutes.post("/", getAllNotificationsForUser);
notificationRoutes.delete("/all/:userId", deleteAllNotification);
notificationRoutes.delete("/:notificationId", deleteNotification);

export default notificationRoutes;