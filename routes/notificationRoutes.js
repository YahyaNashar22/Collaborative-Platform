import express from "express";
import { deleteNotification, getAllNotificationsForUser } from "../controllers/notificationController.js";
import { deleteAllNotificationsService } from "../services/notificationServices";

const notificationRoutes = express.Router();


notificationRoutes.post("/", getAllNotificationsForUser);
notificationRoutes.delete("/:notificationId", deleteNotification);
notificationRoutes.delete("/all/:userId", deleteAllNotificationsService);

export default notificationRoutes;