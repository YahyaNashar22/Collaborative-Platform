import express from "express";
import { ticketTemplate } from "../utils/emailTemplates.js";
import User from "../models/userModel.js";



const ticketRoutes = express.Router();

ticketRoutes.post('/send-ticket', async (req, res) => {
    const {
        senderId,
        projectId,
        clientId,
        providerId,
        message
    } = req.body;

    const client = await User.findById(clientId);
    const provider = await User.findById(providerId);

    try {
        ticketTemplate(senderId,
            projectId,
            clientId,
            providerId,
            message);
        res.status(201).json({ message: "Email Sent Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
}
);



export default ticketRoutes;